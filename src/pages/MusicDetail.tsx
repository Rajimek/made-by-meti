import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import releases from "@/data/releases";
import { ArrowLeft, Circle } from "lucide-react";

const MusicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const release = releases.find((r) => r.slug === slug);

  if (!release) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <div className="bg-background p-10 md:p-12">
              <p className="text-muted-foreground">Artwork not found.</p>
              <Link to="/artworks" className="text-foreground underline mt-4 inline-block">Back to artworks</Link>
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
          <div className="flex flex-col md:flex-row" style={{ gap: 6 }}>
            {/* Left – info pane */}
            <div className="w-full md:w-1/2 bg-background p-10 md:p-12 flex flex-col">
              <Link
                to="/artworks"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                Back
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground mb-2">
                {release.title}
              </h1>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                {release.type} · {release.year}
                {release.duration && <span> · {release.duration}</span>}
              </p>

              <p className="text-sm text-foreground/80 leading-relaxed mb-10">
                {release.description}
              </p>

              {/* Resource links */}
              <div className="mb-10">
                {release.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="flex items-center justify-between py-3 border-b border-border text-sm text-foreground hover:text-foreground/70 transition-colors"
                  >
                    <span>{link.platform}</span>
                    <Circle size={8} className="fill-current" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right – cover art */}
            <div className="w-full md:w-1/2 bg-muted min-h-[400px] md:min-h-[700px] relative order-first md:order-last">
              <img
                src={release.coverImage}
                alt={release.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MusicDetail;
