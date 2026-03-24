import { Link } from "react-router-dom";
import { StorefrontShell } from "./StorefrontShell";

export default function FAQ() {
  return (
    <StorefrontShell
      title="FAQ"
      intro="Frequently asked questions live here once the commerce copy is finalized."
      backHref="/shipping-returns"
      backLabel="Back to support"
    >
      <div className="space-y-0">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">How long does shipping take?</span>
          <span className="text-sm text-muted-foreground">3 to 5 business days</span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Can I return a piece?</span>
          <span className="text-sm text-muted-foreground">Yes, within 14 days</span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Need a custom answer?</span>
          <Link to="/contact" className="text-xs uppercase tracking-widest text-foreground">
            Contact us
          </Link>
        </div>
      </div>
    </StorefrontShell>
  );
}
