import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import releases from "@/data/releases";

const typeColors: Record<string, string> = {
  Album: "bg-accent text-accent-foreground",
  EP: "bg-foreground text-background",
  Single: "bg-muted text-muted-foreground",
  Compilation: "bg-[hsl(250,40%,30%)] text-white",
};

const Releases = () => (
  <main className="min-h-screen bg-background">
    <Header />
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 tracking-tight text-foreground">Releases</h1>
        <p className="text-center text-muted-foreground mb-16">Discography & streaming links</p>

        <div className="space-y-12">
          {releases.map((r, i) => (
            <article key={i} className="border-b border-border pb-10">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <Link to={`/music/${r.slug}`} className="text-2xl font-bold text-foreground tracking-tight hover:underline">{r.title}</Link>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeColors[r.type] || "bg-muted text-muted-foreground"}`}>
                  {r.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {r.label} · {r.year}
              </p>

              <ol className="list-decimal list-inside space-y-1 mb-6 text-foreground/80 text-sm">
                {r.tracks.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-3">
                {r.links.map((l, j) => (
                  <a
                    key={j}
                    href={l.url}
                    className="inline-flex items-center gap-1.5 text-sm px-4 py-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-all"
                  >
                    {l.platform}
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </main>
);

export default Releases;
