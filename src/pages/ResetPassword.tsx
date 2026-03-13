import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  if (!hasSupabaseConfig) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <div className="bg-background p-10 md:p-12 max-w-md">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-4">
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Password reset is unavailable until Supabase is configured for this project.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bg-background p-10 md:p-12 max-w-md">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-6">
              Set New Password
            </h1>

            {!ready ? (
              <p className="text-sm text-muted-foreground">Invalid or expired reset link.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                {message && <p className="text-sm text-muted-foreground">{message}</p>}
                <Button type="submit" disabled={loading} className="w-full text-xs uppercase tracking-widest">
                  {loading ? "..." : "Update Password"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
