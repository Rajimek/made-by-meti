import Sidebar from "@/components/Sidebar";
import { tourDates } from "@/data/tourDates";

const TourList = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ padding: 6 }}>
          <div className="bg-background p-10 md:p-12">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground mb-8">
              Tour Dates
            </h1>
            <div className="space-y-0">
              {tourDates.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-foreground min-w-[140px]">
                      {d.date}
                    </span>
                    <span className="text-sm text-muted-foreground">{d.venue}</span>
                  </div>
                  {d.ticketLink && (
                    <a
                      href={d.ticketLink}
                      className="text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors border border-border px-3 py-1.5 shrink-0 min-w-fit"
                    >
                      Tickets
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourList;
