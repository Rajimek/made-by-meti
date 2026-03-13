import Sidebar from "@/components/Sidebar";
import bioCover from "@/assets/bio-cover.jpg";

const coverImage = bioCover;

const Bio = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          {/* Cover image — full width, 2 grid rows tall */}
          <div className="bio-cover">
            <img
              src={coverImage}
              alt="MADE by Meti"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Bio text */}
          <div className="bio-text">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground mb-6">
              MADE by Meti
            </h1>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              MADE is a viewing space and web project built around Meti's ceramic, installation, and image-based practice. The work leans toward surfaces that hold evidence of pressure, firing, and repeated handling rather than polished finish.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              This template has been reshaped from its original artist-site starter into a gallery-first structure: artworks, process films, exhibitions, and a journal can all live side by side without forcing the project into a music-tour model.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              Meti's current focus is translating studio material into a clean online viewing experience that still preserves texture, scale, and installation context. The fallback content in this repo is meant to be swapped with real work as the site evolves.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Supabase remains available for journal publishing, comments, and sign-in flows, but the browsing experience now works locally even without a configured backend.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bio;
