import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Booking = () => (
  <main className="min-h-screen bg-background flex flex-col">
    <Header />

    <div className="flex-1 pt-32 pb-20 px-6">
      <div className="grid lg:grid-cols-[1fr_280px] gap-0 max-w-6xl mx-auto">

        {/* Main content — intentionally minimal */}
        <div className="pr-0 lg:pr-12 pb-12">
          <h1 className="text-3xl font-semibold text-foreground mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Booking
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For all booking inquiries, please contact{" "}
            <a href="mailto:bookings@ocean.live" className="text-foreground/70 underline underline-offset-2 hover:text-foreground transition-colors">
              bookings@ocean.live
            </a>
          </p>
        </div>

        {/* Sidebar — flat, divider only */}
        <aside className="border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-10 space-y-7">

          {/* Search */}
          <div>
            <div className="flex">
              <input
                type="search"
                className="flex-1 px-3 py-1.5 border border-border text-sm text-foreground bg-background outline-none focus:border-foreground/40 transition-colors"
                placeholder=""
              />
              <button className="px-4 py-1.5 bg-secondary border border-l-0 border-border text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/80 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Recent Posts</h3>
            <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">
              Hello world!
            </a>
          </div>

          {/* Archives */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Archives</h3>
            <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">
              December 2020
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Categories</h3>
            <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">
              Uncategorized
            </a>
          </div>

          {/* Meta */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Meta</h3>
            <div className="space-y-0.5">
              <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">Log in</a>
              <Link to="/feed" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">Entries feed</Link>
              <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">Comments feed</a>
              <a href="#" className="text-muted-foreground/80 hover:text-foreground text-sm block py-0.5 hover:underline transition-colors">WordPress.org</a>
            </div>
          </div>

        </aside>
      </div>
    </div>

    <Footer />
  </main>
);

export default Booking;
