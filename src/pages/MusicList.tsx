import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import releases from "@/data/releases";

const MusicList = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="listing-grid">
          {releases.map((r) => (
            <Link key={r.slug} to={`/music/${r.slug}`} className="listing-tile group">
              <div className="listing-tile-inner">
                <img
                  src={r.coverImage}
                  alt={r.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="listing-tile-overlay">
                  <span className="listing-tile-title">{r.title}</span>
                  <span className="listing-tile-sub">{r.type} · {r.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MusicList;
