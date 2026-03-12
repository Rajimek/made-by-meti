import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Facebook, Instagram, Youtube, Music } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tourDates } from "@/data/tourDates";

const spacedDate = (d: string) => d.split("").join(" ").replace(/  /g, "   ");

const Calendar = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* 1. Compact dark hero banner */}
      <section className="bg-gradient-to-r from-[hsl(180,20%,12%)] to-[hsl(220,20%,10%)] pt-24 pb-8 text-center">
        <h1
          className="text-sm font-semibold text-white tracking-[0.35em] uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ocean On Tour
        </h1>
        <p className="text-white/50 text-lg font-light mt-1 tracking-[0.2em]">2026</p>
      </section>

      {/* Date list */}
      <div className="flex-1 py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          {tourDates.map((d, i) => (
            <div key={i} className="mb-8">
              <h3
                className="text-sm font-bold tracking-[0.35em] uppercase text-foreground"
                style={{ fontFamily: "'Space Grotesk', monospace" }}
              >
                {spacedDate(d.date)}
              </h3>
              <p className="text-muted-foreground/70 text-xs mt-1.5 leading-relaxed">{d.venue}</p>
              {d.ticketLink && (
                <a href={d.ticketLink} className="text-[10px] italic text-muted-foreground/50 hover:text-foreground transition-colors mt-1 inline-block">
                  * click for tickets *
                </a>
              )}
            </div>
          ))}

          {/* 6. Ellipsis */}
          <p className="text-lg text-muted-foreground/30 tracking-widest my-6">· · ·</p>
        </div>
      </div>

      {/* 7. Contact CTA gradient banner */}
      <Link to="/contact">
        <section className="bg-gradient-to-r from-[hsl(250,40%,30%)] via-[hsl(280,40%,40%)] to-[hsl(310,50%,55%)] py-16 text-center cursor-pointer hover:opacity-95 transition-opacity">
          <h2
            className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Contact for<br />Bookings
          </h2>
        </section>
      </Link>

      {/* 8. Simple social strip */}
      <section className="py-10 px-6">
        <div className="max-w-md mx-auto text-center">
          <h4 className="text-xs font-medium tracking-[0.3em] uppercase text-foreground/50 mb-5">Follow Me</h4>
          <div className="flex justify-center gap-5">
            <a href="#" aria-label="Facebook" className="text-muted-foreground/40 hover:text-foreground transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground/40 hover:text-foreground transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Spotify" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors"><Music size={14} /></a>
            <a href="#" aria-label="Soundcloud" className="text-muted-foreground/40 hover:text-foreground transition-colors"><Youtube size={18} /></a>
          </div>
        </div>
      </section>

      <Footer />

      {/* 9. Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center hover:opacity-80 transition-all shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </main>
  );
};

export default Calendar;
