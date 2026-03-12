import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos, type Video } from "@/data/videos";
import videoBg from "@/assets/video-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const thumbnails = [videoBg, performanceImg, heroBg];

const categoryLabel: Record<Video["category"], string> = {
  live: "Live Set",
  studio: "Studio",
  documentary: "Documentary",
  aftermovie: "Aftermovie",
  choreography: "Choreography",
};

const Videos = () => (
  <main className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="relative h-[40vh] overflow-hidden">
      <img src={videoBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Videos</h1>
        <p className="text-white/60 mt-2">Live sets, studio sessions & documentaries</p>
      </div>
    </section>

    {/* Featured */}
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link to={`/videos/${videos[0].id}`} className="block group">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img src={videoBg} alt={videos[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-white ml-1" size={40} fill="white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs uppercase tracking-wider text-white/60 mb-1 block">{categoryLabel[videos[0].category]} · {videos[0].duration}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{videos[0].title}</h2>
              <p className="text-white/60 text-sm mt-1">{videos[0].date} · {videos[0].location}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>

    {/* Grid */}
    <section className="pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(1).map((v, i) => (
            <Link key={v.id} to={`/videos/${v.id}`} className="group">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-3">
                <img
                  src={thumbnails[i % thumbnails.length]}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center">
                    <Play className="text-white ml-0.5" size={22} fill="white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    {categoryLabel[v.category]}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm">{v.duration}</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-sm group-hover:underline leading-snug">{v.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{v.date} · {v.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default Videos;
