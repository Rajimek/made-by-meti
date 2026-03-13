import { useState } from "react";
import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

const NewsletterModal = ({ open, onClose }: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!hasSupabaseConfig) {
      setMessage("Newsletter signup is disabled until Supabase is configured.");
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase
        .from("subscribers")
        .insert({ email: trimmed });

      if (insertError) {
        if (insertError.code === "23505") {
          setMessage("You're already subscribed!");
        } else {
          throw insertError;
        }
      } else {
        setMessage("Subscribed! Thank you.");
        setEmail("");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-background p-10 max-w-sm w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="text-lg font-bold uppercase tracking-tight text-foreground mb-2">
          Newsletter
        </h2>
        <p className="text-xs text-muted-foreground mb-6">
          Get updates on new releases, tour dates, and exclusive content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          {message && <p className="text-xs text-muted-foreground">{message}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-xs uppercase tracking-widest"
          >
            {loading ? "..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterModal;
