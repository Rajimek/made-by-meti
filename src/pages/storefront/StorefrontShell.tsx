import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

type StorefrontShellProps = {
  title: string;
  intro: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
};

export function StorefrontShell({
  title,
  intro,
  eyebrow = "Storefront",
  backHref = "/shop",
  backLabel = "Back to shop",
  children,
}: StorefrontShellProps) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bg-background p-10 md:p-12">
            <div className="mb-10 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground md:text-4xl">{title}</h1>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">{intro}</p>
                </div>
                <Link
                  to={backHref}
                  className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
                >
                  {backLabel}
                </Link>
              </div>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
