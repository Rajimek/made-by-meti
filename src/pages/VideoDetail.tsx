import { useParams, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { videos } from "@/data/videos";
import { ArrowLeft, Circle } from "lucide-react";

import videoBg from "@/assets/video-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const thumbnails = [videoBg, performanceImg, heroBg];

const categoryLabel: Record<string, string> = {
  live: "Live Set",
  studio: "Studio",
  documentary: "Documentary",
  aftermovie: "Aftermovie",
  choreography: "Choreography",
};

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const video = videos.find((v) => v.id === id);
  const videoIndex = videos.findIndex((v) => v.id === id);

  if (!video) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ padding: 6 }}>
            <div className="bg-background p-10 md:p-12">
              <p className="text-muted-foreground">Video not found.</p>
              <Link to="/videos" className="text-foreground underline mt-4 inline-block">Back to videos</Link>
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
                to="/videos"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                Back
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground mb-2">
                {video.title}
              </h1>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                {categoryLabel[video.category]} · {video.date}
                <span> · {video.duration}</span>
              </p>
              <p className="text-xs text-muted-foreground mb-6">{video.location}</p>

              <p className="text-sm text-foreground/80 leading-relaxed mb-10">
                {video.description}
              </p>

              {/* Watch links */}
              <div className="mb-10">
                {["YouTube", "Soundcloud"].map((platform, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center justify-between py-3 border-b border-border text-sm text-foreground hover:text-foreground/70 transition-colors"
                  >
                    <span>{platform}</span>
                    <Circle size={8} className="fill-current" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right – thumbnail */}
            <div className="w-full md:w-1/2 bg-muted min-h-[400px] md:min-h-[700px] relative order-first md:order-last">
              <img
                src={thumbnails[videoIndex % thumbnails.length]}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoDetail;
