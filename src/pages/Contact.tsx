import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

const Contact = () => (
  <main className="min-h-screen bg-background">
    <Header />

    <div className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 tracking-tight text-foreground">Contact</h1>
        <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
          For bookings, press inquiries, or general questions — reach out through any of the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Booking */}
          <div className="bg-[hsl(250,40%,25%)] rounded-2xl p-8 text-white">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-white/60 mb-4">Booking & Management</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-white/60" />
                <div>
                  <p className="font-medium">General Bookings</p>
                  <a href="mailto:bookings@ocean.live" className="text-white/70 hover:text-white transition-colors text-sm">
                    bookings@ocean.live
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-white/60" />
                <div>
                  <p className="font-medium">Press & Media</p>
                  <a href="mailto:press@ocean.live" className="text-white/70 hover:text-white transition-colors text-sm">
                    press@ocean.live
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-white/60" />
                <div>
                  <p className="font-medium">Tideshift Events</p>
                  <a href="mailto:events@tideshift.live" className="text-white/70 hover:text-white transition-colors text-sm">
                    events@tideshift.live
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-white/60" />
                <div>
                  <p className="font-medium">Based in</p>
                  <p className="text-white/70 text-sm">Metro City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Links */}
          <div className="space-y-8">
            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">Follow Ocean</h2>
              <div className="space-y-3">
                {[
                  { icon: Instagram, label: "Instagram", handle: "@ocean", url: "#" },
                  { icon: Youtube, label: "YouTube", handle: "Ocean Music", url: "#" },
                  { icon: Facebook, label: "Facebook", handle: "oceanmusic", url: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.url} className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors group">
                    <s.icon size={18} />
                    <div>
                      <p className="text-sm font-medium group-hover:underline">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <a href="#" className="block text-sm text-foreground/70 hover:text-foreground transition-colors">Spotify →</a>
                <a href="#" className="block text-sm text-foreground/70 hover:text-foreground transition-colors">Soundcloud →</a>
                <a href="#" className="block text-sm text-foreground/70 hover:text-foreground transition-colors">Beatport →</a>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">Follow Tideshift</h2>
              <div className="space-y-3">
                {[
                  { icon: Instagram, label: "Instagram", handle: "@tideshift.live", url: "#" },
                  { icon: Youtube, label: "YouTube", handle: "Tideshift", url: "#" },
                  { icon: Facebook, label: "Facebook", handle: "tideshiftlive", url: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.url} className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors group">
                    <s.icon size={18} />
                    <div>
                      <p className="text-sm font-medium group-hover:underline">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight text-center">Frequently Asked</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "What is your typical set length?", a: "Standard sets are 2 hours, but I love extended 4-6 hour sessions for the right event. Open-to-close sets are available for select venues." },
              { q: "Do you play at private events?", a: "Yes, selectively. Please reach out to the booking email with details about your event, date, and vision." },
              { q: "What are your technical requirements?", a: "A detailed tech rider is available upon request. Minimum requirements include a Pioneer CDJ-3000/DJM-V10 setup or equivalent." },
              { q: "How can I submit a demo for Tideshift?", a: "Send a private SoundCloud or Dropbox link to events@tideshift.live with 'Demo Submission' in the subject line." },
            ].map((faq, i) => (
              <div key={i} className="border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>

    <Footer />
  </main>
);

export default Contact;
