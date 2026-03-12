import Sidebar from "@/components/Sidebar";

const coverImage = "https://images.unsplash.com/photo-1761792444425-1bae3ba0c86b?w=1600&q=80&auto=format&fit=crop";

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
              alt="Ocean"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>

          {/* Bio text */}
          <div className="bio-text">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground mb-6">
              Ocean
            </h1>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              Ocean is a Metro City-based electronic music artist, DJ, and movement artist whose sound sits at the intersection of melodic techno, progressive house, and ambient electronica. Known for immersive, emotionally charged sets that blend deep textures with driving rhythms, Ocean has built a devoted following through relentless touring and a commitment to sonic exploration.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              Since emerging in 2021, Ocean has performed at some of the world's most respected electronic music events — from Amsterdam Dance Event and Harmony Festival to intimate warehouse sessions in Berlin. Their signature Tideshift events have become a cornerstone of Metro City's underground scene, drawing thousands for all-day experiences that blur the line between DJ set and art installation.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              Their debut album <em>Lucid Architecture</em> (2025, Midnight Structures) received widespread acclaim for its intricate production and emotional depth. The follow-up EP <em>Infinite Drift</em> continues to push boundaries with weightless textures and pulsing sub-bass drawn from field recordings captured across Northern Europe.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Beyond the decks, Ocean is an accomplished choreographer and dancer, integrating movement into their creative practice and live performances. They currently reside in Metro City, where they run their studio and host the monthly Tideshift radio show.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bio;
