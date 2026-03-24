import { Link } from "react-router-dom";
import { StorefrontShell } from "./StorefrontShell";

export default function ShippingReturns() {
  return (
    <StorefrontShell
      title="Support"
      intro="Shipping, returns, FAQ, contact, and tracking live under this support hub while the existing shell stays intact."
      backHref="/shop"
      backLabel="Back to shop"
    >
      <div className="space-y-0">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Shipping windows</span>
          <span className="text-sm text-muted-foreground">3 to 5 business days</span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Returns</span>
          <span className="text-sm text-muted-foreground">14 days</span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Need help?</span>
          <Link to="/contact" className="text-xs uppercase tracking-widest text-foreground">
            Contact
          </Link>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">FAQs</span>
          <Link to="/faq" className="text-xs uppercase tracking-widest text-foreground">
            Open FAQ
          </Link>
        </div>
      </div>
    </StorefrontShell>
  );
}
