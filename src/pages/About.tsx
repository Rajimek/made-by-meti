import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import portraitImg from "@/assets/portrait.jpg";
import performanceImg from "@/assets/performance.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const milestones = [
  { year: "2010", text: "First DJ set at a local Metro City club night, playing a mix of deep house and progressive." },
  { year: "2012", text: "Launched TIDESHIFT — a monthly radio show and event series that quickly gained a cult following." },
  { year: "2014", text: "First international booking at a festival in Barcelona. Began to develop a signature melodic progressive style." },
  { year: "2016", text: "Signed to Afterglow Records. Released debut EP 'Submerge' to critical acclaim in the underground scene." },
  { year: "2018", text: "Headlined stages at major European festivals. TIDESHIFT radio show surpassed 1 million streams." },
  { year: "2020", text: "Pivoted to livestreaming during lockdowns, building a global online community. Studio sessions led to prolific output." },
  { year: "2023", text: "Released 'Weightless' on Natura Sonoris — their most streamed single to date with over 5 million plays." },
  { year: "2025", text: "Released debut album 'Lucid Architecture' on Midnight Structures. Launched TIDESHIFT BEACH outdoor series." },
  { year: "2026", text: "Currently touring worldwide with new EP 'Infinite Drift' and expanding the Tideshift brand." },
];

const About = () => (
  <main className="min-h-screen bg-background">
    <Header />

    {/* Hero */}
    <section className="relative h-[50vh] overflow-hidden">
      <img src={heroBg} alt="Ocean" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">About Ocean</h1>
      </div>
    </section>

    {/* Bio */}
    <section className="py-20 px-6">
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">The Artist</h2>
          <p className="text-foreground/80 leading-relaxed mb-5">
            Metro City based Ocean has been absorbing the essence behind genres such as deep progressive techno and twisting them into a melodic confection that is both fresh, timeless and completely their own.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-5">
            Growing up surrounded by a diverse musical landscape — from their family's vinyl collection of 70s electronic pioneers to the warehouse raves of their teenage years — Ocean developed an ear for the transcendent moments in music. The moments where rhythm, melody and atmosphere converge to create something greater than the sum of their parts.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-5">
            In 2012 they started their monthly radio show and event called <span className="font-semibold">TIDESHIFT</span>. What began as a small gathering in an abandoned textile factory has grown into a globally recognised brand, with events spanning multiple continents and a radio show broadcast on several stations worldwide.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-5">
            Their DJ sets are known for their emotional arc — beginning with deep, introspective textures before gradually building to euphoric, driving peaks. They have a gift for reading a room and adapting in real-time, making each performance a unique, unrepeatable experience.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            With releases on renowned labels such as Afterglow Records, Colorize, Balance Music, Natura Sonoris, and Midnight Structures, they have played high profile dates in Australia, North and South America, Asia and Europe.
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={portraitImg} alt="Ocean portrait" className="w-full h-auto" loading="lazy" />
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img src={performanceImg} alt="Ocean performing" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* Tideshift */}
    <section className="bg-[hsl(250,40%,25%)] py-20 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">Tideshift</h2>
        <p className="text-white/80 leading-relaxed mb-5">
          TIDESHIFT is more than a radio show — it's a philosophy of sound. Each monthly episode is a carefully curated journey through the deeper end of electronic music, blending unreleased exclusives, emerging artists, and classic cuts into a cohesive two-hour narrative.
        </p>
        <p className="text-white/80 leading-relaxed mb-5">
          The live events bring that same ethos to the dancefloor. Intimate venues, world-class sound systems, and a loyal community of music lovers create an atmosphere unlike anything else. From the flagship nights at The Spectrum in Metro City to the annual Tideshift Beach open-air festival, each event is designed to be an immersive experience.
        </p>
        <p className="text-white/60 text-sm tracking-wider uppercase mt-8">
          Over 200 episodes · Broadcast in 15+ countries · 50+ live events
        </p>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12 tracking-tight text-center">Timeline</h2>
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6 items-start">
              <span className="text-2xl font-bold text-muted-foreground min-w-[5rem] text-right">{m.year}</span>
              <div className="w-px bg-border self-stretch" />
              <p className="text-foreground/80 leading-relaxed pt-1">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-6 text-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/releases" className="px-8 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-all uppercase tracking-wider text-sm font-semibold">
          Discography
        </Link>
        <Link to="/contact" className="px-8 py-3 border border-foreground text-foreground rounded-full hover:bg-foreground hover:text-background transition-all uppercase tracking-wider text-sm font-semibold">
          Get in Touch
        </Link>
      </div>
    </section>

    <Footer />
  </main>
);

export default About;
