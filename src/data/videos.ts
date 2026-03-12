export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  duration: string;
  thumbnail: string;
  category: "live" | "studio" | "documentary" | "aftermovie" | "choreography";
}

export const videos: Video[] = [
  {
    id: "choreography-session",
    title: "Ocean — Choreography Session",
    description: "An electrifying choreography session captured in studio, showcasing Ocean's movement artistry and creative expression through dance. Raw energy meets precision in this visually stunning performance piece.",
    date: "February 2026",
    location: "Dance Studio, Metro City",
    duration: "3:28",
    thumbnail: "",
    category: "choreography",
  },
  {
    id: "tideshift-metro-city-2026",
    title: "Ocean — Tideshift Live at Metro City",
    description: "A full 2-hour recording from the sold-out Tideshift night at The Spectrum, Metro City. Deep progressive textures layered over pulsing basslines as Ocean takes the crowd on a hypnotic journey through the night. Features exclusive unreleased tracks from the upcoming 'Infinite Drift' EP.",
    date: "January 2026",
    location: "The Spectrum, Metro City",
    duration: "2:14:30",
    thumbnail: "",
    category: "live",
  },
  {
    id: "yearmix-2025",
    title: "Ocean — YEARMIX 2025",
    description: "The definitive collection of Ocean's favourite tracks from 2025, blended into a seamless 90-minute mix. From the melancholic opening chords to the euphoric closing moments, this mix captures the evolution of Ocean's sound over the past year.",
    date: "December 2025",
    location: "Studio Session",
    duration: "1:32:15",
    thumbnail: "",
    category: "studio",
  },
  {
    id: "frequency-ade-2024",
    title: "Ocean — Live at Frequency ADE",
    description: "Amsterdam Dance Event 2024. Ocean's closing set at the legendary Frequency showcase, broadcast live to over 50,000 viewers. The intimate warehouse setting and world-class sound system made this one of the most talked-about sets of the entire ADE week.",
    date: "October 2024",
    location: "Warehouse, Amsterdam (NL)",
    duration: "1:45:00",
    thumbnail: "",
    category: "live",
  },
  {
    id: "midnight-club-berlin",
    title: "Ocean — Live at Midnight Club Berlin",
    description: "A raw, unfiltered recording from Berlin's iconic Midnight Club. Six hours of pure, uncompromising progressive techno captured in the club's legendary Vault room. This set pushed boundaries and showcased Ocean's ability to read a crowd and build tension over extended periods.",
    date: "March 2024",
    location: "Midnight Club, Berlin (DE)",
    duration: "1:58:42",
    thumbnail: "",
    category: "live",
  },
  {
    id: "making-of-lucid-architecture",
    title: "The Making of Lucid Architecture",
    description: "Go behind the scenes of Ocean's debut album 'Lucid Architecture'. This mini-documentary follows the creative process from initial sketches in their Metro City studio to the final mastering sessions. Features interviews with collaborators and a glimpse into the sound design techniques that define their unique aesthetic.",
    date: "September 2025",
    location: "Various Studios",
    duration: "24:18",
    thumbnail: "",
    category: "documentary",
  },
  {
    id: "tideshift-beach-2025",
    title: "Tideshift Beach 2025 — Aftermovie",
    description: "Relive the magic of Tideshift Beach, Ocean's signature all-day outdoor event at Sunset Charlie. From sunrise ambient sets to the peak-time headliner slot, this aftermovie captures the energy of 3,000 people dancing under open skies.",
    date: "July 2025",
    location: "Sunset Charlie, Beachfront",
    duration: "8:45",
    thumbnail: "",
    category: "aftermovie",
  },
  {
    id: "harmony-festival-2025",
    title: "Ocean — Harmony Festival Highlights",
    description: "Highlights from Ocean's sunset slot at Harmony Festival on the Croatian coast. Breathtaking scenery meets immersive sound in this beautifully shot recap of one of the summer's most memorable performances.",
    date: "August 2025",
    location: "The Garden Resort, Coastal Region (HRV)",
    duration: "12:30",
    thumbnail: "",
    category: "aftermovie",
  },
  {
    id: "studio-session-ep-preview",
    title: "Studio Session — Infinite Drift EP Preview",
    description: "An exclusive studio walkthrough where Ocean previews tracks from the upcoming 'Infinite Drift' EP. Watch them break down the production of 'Solar Flare' and explain the creative vision behind each track on the release.",
    date: "November 2025",
    location: "Ocean Studio, Metro City",
    duration: "18:22",
    thumbnail: "",
    category: "studio",
  },
];
