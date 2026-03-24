import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, signIn, signUp, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const resolvedName = name.trim() || email.split("@")[0] || "Studio customer";
        await signUp({
          name: resolvedName,
          email: email.trim(),
          password,
        });
        setMessage("Account created. Redirecting to your account.");
      } else {
        await signIn(email.trim(), password);
        setMessage("Signed in. Redirecting to your account.");
      }

      navigate("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <div className="bg-background p-10 md:p-12 max-w-md">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-4">Account</h1>
              <p className="text-sm text-muted-foreground">Loading local account session...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (user) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <div className="bg-background p-10 md:p-12 max-w-md">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-4">Account</h1>
              <p className="text-sm text-muted-foreground mb-2">Signed in as {user.email}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Your account, order history, and profile updates are connected to the local backend.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => void signOut()}
                  className="text-xs uppercase tracking-widest"
                >
                  Sign Out
                </Button>
                <Button asChild className="text-xs uppercase tracking-widest">
                  <Link to="/account">Go to account</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bg-background p-10 md:p-12 max-w-md">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-6">
              {isSignUp ? "Sign Up" : "Login"}
            </h1>

            <p className="mb-6 text-sm text-muted-foreground">
              Use the local backend for sign in, registration, profile updates, and order history.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={6}
              />

              {error && <p className="text-sm text-destructive">{error}</p>}
              {message && <p className="text-sm text-muted-foreground">{message}</p>}

              <Button type="submit" disabled={loading} className="w-full text-xs uppercase tracking-widest">
                {loading ? "..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <button
                onClick={() => {
                  setIsSignUp((current) => !current);
                  setError("");
                  setMessage("");
                }}
                className="block hover:text-foreground transition-colors"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>
              <Link to="/reset-password" className="block hover:text-foreground transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
