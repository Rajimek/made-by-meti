import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ResetPassword = () => {
  const { user } = useAuth();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bg-background p-10 md:p-12 max-w-md">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-4">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              The local backend supports sign in, registration, logout, and account profile updates, but it does not
              expose a password reset endpoint yet.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              If you need to continue, sign in with your current password or create a new account.{" "}
              {user
                ? "Your profile page can update your contact details and shipping address."
                : "If you already have an account, use the login page."}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="text-xs uppercase tracking-widest">
                <Link to="/login">{user ? "Back to login" : "Go to login"}</Link>
              </Button>
              {user ? (
                <Button asChild variant="outline" className="text-xs uppercase tracking-widest">
                  <Link to="/account">Open account</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
