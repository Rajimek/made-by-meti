import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { videos } from "@/data/videos";
import videoBg from "@/assets/video-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const thumbnails = [videoBg, performanceImg, heroBg];

const VideosList = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="video-grid">
          {videos.map((v, i) => (
            <Link key={v.id} to={`/videos/${v.id}`} className="video-tile group">
              <div className="video-tile-inner">
                <img
                  src={thumbnails[i % thumbnails.length]}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="video-tile-overlay">
                  <Play size={32} className="fill-white text-white mb-2" strokeWidth={1.5} />
                  <span className="listing-tile-title">{v.title}</span>
                  <span className="listing-tile-sub">{v.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideosList;
