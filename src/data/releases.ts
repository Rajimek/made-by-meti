export interface Release {
  slug: string;
  title: string;
  label: string;
  year: string;
  type: string;
  coverImage: string;
  description: string;
  duration?: string;
  tracks: string[];
  links: { platform: string; url: string }[];
}

const releases: Release[] = [
  {
    slug: "infinite-drift",
    title: "Infinite Drift",
    label: "Afterglow Records",
    year: "2026",
    type: "EP",
    coverImage: "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=1200&q=80&auto=format&fit=crop",
    description: "A four-track journey through weightless textures and pulsing sub-bass. Infinite Drift draws on deep space imagery and late-night studio sessions, blending organic synthesis with field recordings captured across Northern Europe.",
    duration: "24:30",
    tracks: ["Infinite Drift", "Solar Flare", "Underneath the Surface", "Pulse Width"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    slug: "tideshift-sessions-vol-3",
    title: "Tideshift Sessions Vol. 3",
    label: "Self-released",
    year: "2025",
    type: "Compilation",
    coverImage: "https://images.unsplash.com/photo-1761930293133-b216e52c1686?w=1200&q=80&auto=format&fit=crop",
    description: "The third volume in an ongoing mix series exploring the intersection of melodic techno, progressive house, and ambient electronica. Recorded live in a single take.",
    duration: "1:12:00",
    tracks: [
      "Opening Ceremony (Ocean Edit)",
      "Tidal Lock",
      "Refraction feat. Aura",
      "Night Protocol",
      "Ghost Signal",
      "Zenith",
    ],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    slug: "lucid-architecture",
    title: "Lucid Architecture",
    label: "Midnight Structures",
    year: "2025",
    type: "Album",
    coverImage: "https://images.unsplash.com/photo-1761930293047-50eadfc3bdcc?w=1200&q=80&auto=format&fit=crop",
    description: "A full-length debut album spanning nine tracks of intricate, emotive electronic music. Lucid Architecture explores themes of memory, place, and the structures we build around ourselves — both physical and psychological.",
    duration: "58:14",
    tracks: [
      "Arrival",
      "Deep Corridor",
      "Luminance",
      "Between Worlds",
      "Strata",
      "Dissolve",
      "Lucid Architecture",
      "Event Horizon",
      "Aftermath",
    ],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Apple Music", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    slug: "fade-to-signal",
    title: "Fade to Signal",
    label: "Colorize",
    year: "2024",
    type: "Single",
    coverImage: "https://images.unsplash.com/photo-1761882132468-c7035c9aff26?w=1200&q=80&auto=format&fit=crop",
    description: "A driving single that marries melodic hooks with a relentless low-end. Released on Colorize with an extended mix for the clubs.",
    duration: "6:42",
    tracks: ["Fade to Signal", "Fade to Signal (Extended Mix)"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
    ],
  },
  {
    slug: "night-garden",
    title: "Night Garden",
    label: "Balance Music",
    year: "2024",
    type: "EP",
    coverImage: "https://images.unsplash.com/photo-1761882717631-824133aedc0e?w=1200&q=80&auto=format&fit=crop",
    description: "Three tracks inspired by nocturnal landscapes and bioluminescent imagery. Night Garden sits in the space between deep house and downtempo, built for headphones and afterhours.",
    duration: "18:55",
    tracks: ["Night Garden", "Soft Machine", "Murmur"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
      { platform: "Soundcloud", url: "#" },
    ],
  },
  {
    slug: "weightless",
    title: "Weightless",
    label: "Natura Sonoris",
    year: "2023",
    type: "Single",
    coverImage: "https://images.unsplash.com/photo-1761882298487-582160fdcd4c?w=1200&q=80&auto=format&fit=crop",
    description: "A meditative single exploring suspension and stillness. The ambient rework strips everything back to pure texture and space.",
    duration: "7:18",
    tracks: ["Weightless", "Weightless (Ambient Rework)"],
    links: [
      { platform: "Spotify", url: "#" },
      { platform: "Beatport", url: "#" },
    ],
  },
];

export default releases;
