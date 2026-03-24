import { Link } from "react-router-dom";
import { StorefrontShell } from "./StorefrontShell";

export default function Contact() {
  return (
    <StorefrontShell
      title="Contact"
      intro="This route is reserved for customer support and wholesale inquiries."
      backHref="/shipping-returns"
      backLabel="Back to support"
    >
      <div className="space-y-0">
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Email</span>
          <a className="text-xs uppercase tracking-widest text-foreground" href="mailto:studio@madeceramics.com">
            studio@madeceramics.com
          </a>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Wholesale</span>
          <span className="text-sm text-muted-foreground">By inquiry</span>
        </div>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Back to FAQ</span>
          <Link to="/faq" className="text-xs uppercase tracking-widest text-foreground">
            Open FAQ
          </Link>
        </div>
      </div>
    </StorefrontShell>
  );
}
