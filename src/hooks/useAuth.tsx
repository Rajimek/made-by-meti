import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import {
  clearAuthToken,
  createAddressFallback,
  fetchSession,
  login,
  logout,
  register,
  storeAuthToken,
  updateProfile,
  type StoreSession,
  type StoreUser,
  type UpdateProfileInput,
  type RegisterInput,
} from "@/storefront";

interface AuthContextType {
  user: StoreUser | null;
  session: StoreSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<StoreSession>;
  signUp: (input: RegisterInput) => Promise<StoreSession>;
  signOut: () => Promise<void>;
  updateAccountProfile: (input: UpdateProfileInput) => Promise<StoreUser>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => {
    throw new Error("Auth provider is not ready");
  },
  signUp: async () => {
    throw new Error("Auth provider is not ready");
  },
  signOut: async () => {},
  updateAccountProfile: async () => {
    throw new Error("Auth provider is not ready");
  },
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [session, setSession] = useState<StoreSession | null>(null);
  const [loading, setLoading] = useState(true);

  const applySession = (nextSession: StoreSession | null) => {
    setSession(nextSession);
    setUser(nextSession?.user ?? null);
  };

  const refreshSession = async () => {
    const token = window.localStorage.getItem("made-local-auth-token");
    if (!token) {
      applySession(null);
      return;
    }

    const { user: refreshedUser } = await fetchSession(token);
    applySession({ token, user: refreshedUser });
  };

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const token = window.localStorage.getItem("made-local-auth-token");
      if (!token) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      try {
        const { user: refreshedUser } = await fetchSession(token);
        if (!cancelled) {
          applySession({ token, user: refreshedUser });
        }
      } catch {
        clearAuthToken();
        if (!cancelled) {
          applySession(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const nextSession = await login({ email, password });
    storeAuthToken(nextSession.token);
    applySession(nextSession);
    return nextSession;
  };

  const signUp = async (input: RegisterInput) => {
    const nextSession = await register({
      ...input,
      defaultAddress: input.defaultAddress || createAddressFallback(input.name, input.email),
    });
    storeAuthToken(nextSession.token);
    applySession(nextSession);
    return nextSession;
  };

  const signOut = async () => {
    const token = session?.token || window.localStorage.getItem("made-local-auth-token");
    if (token) {
      try {
        await logout(token);
      } catch {
        // Clear the client state even if the server session is already gone.
      }
    }

    clearAuthToken();
    applySession(null);
  };

  const updateAccountProfile = async (input: UpdateProfileInput) => {
    if (!session?.token) {
      throw new Error("Sign in to update your account");
    }

    const { user: updatedUser } = await updateProfile(session.token, input);
    const nextSession = { token: session.token, user: updatedUser };
    applySession(nextSession);
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        updateAccountProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
