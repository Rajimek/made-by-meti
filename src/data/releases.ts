import bioCover from "@/assets/bio-cover.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import portraitImg from "@/assets/portrait.jpg";
import referenceImg from "@/assets/reference.png";
import videoBg from "@/assets/video-bg.jpg";

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
    slug: "salt-memory",
    title: "Salt Memory",
    label: "Ceramic wall relief",
    year: "2026",
    type: "Series",
    coverImage: heroBg,
    description: "A suite of high-fire ceramic wall works tracing salt bloom, erosion, and the residue left behind by repeated handling. Each panel leans into surface variation rather than polished uniformity.",
    duration: "5 works",
    tracks: ["Panel I", "Panel II", "Panel III", "Panel IV", "Panel V"],
    links: [
      { platform: "Inquiry", url: "#" },
      { platform: "Installation Notes", url: "#" },
      { platform: "Catalogue PDF", url: "#" },
    ],
  },
  {
    slug: "kiln-study-03",
    title: "Kiln Study 03",
    label: "Stoneware and iron wash",
    year: "2025",
    type: "Object",
    coverImage: portraitImg,
    description: "Part of an ongoing object study focused on vessels that read as architectural fragments. The work emphasizes an uneven rim, ash deposits, and a deliberate sense of pressure in the form.",
    duration: "Unique",
    tracks: [
      "Thrown form",
      "Cut seam",
      "Iron wash",
      "Reduction firing",
    ],
    links: [
      { platform: "Inquiry", url: "#" },
      { platform: "Material Sheet", url: "#" },
    ],
  },
  {
    slug: "museum-light",
    title: "Museum Light",
    label: "Photographic reference and glaze test",
    year: "2025",
    type: "Installation",
    coverImage: referenceImg,
    description: "A wall-based installation pairing still image references with reflective ceramic samples. The piece studies how gallery light changes a surface over the course of a day.",
    duration: "Site responsive",
    tracks: [
      "North wall",
      "Window reflection",
      "Evening cast",
      "Surface sample",
    ],
    links: [
      { platform: "Installation Notes", url: "#" },
      { platform: "Inquiry", url: "#" },
      { platform: "View Reference Set", url: "#" },
    ],
  },
  {
    slug: "cinder-atlas",
    title: "Cinder Atlas",
    label: "Pigmented clay and grog",
    year: "2024",
    type: "Relief",
    coverImage: performanceImg,
    description: "Layered fragments assembled into a dense relief panel. The surface is intentionally scorched and chipped to preserve the memory of the firing process.",
    duration: "180 x 120 cm",
    tracks: ["Base slab", "Pinned fragments", "Smoke wash"],
    links: [
      { platform: "Inquiry", url: "#" },
      { platform: "Exhibition History", url: "#" },
    ],
  },
  {
    slug: "soft-bodies",
    title: "Soft Bodies",
    label: "Glazed ceramic wall work",
    year: "2024",
    type: "Wall Work",
    coverImage: bioCover,
    description: "A quieter series of rounded forms glazed in low-contrast neutrals. The work is about restraint, softness, and the instability between object and shadow.",
    duration: "4 works",
    tracks: ["Fold", "Lean", "Hold", "Drift"],
    links: [
      { platform: "Inquiry", url: "#" },
      { platform: "Series Notes", url: "#" },
      { platform: "Catalogue PDF", url: "#" },
    ],
  },
  {
    slug: "after-glaze",
    title: "After Glaze",
    label: "Mixed media archive",
    year: "2023",
    type: "Series",
    coverImage: videoBg,
    description: "An archive project combining firing notes, test tiles, photography, and fragments that were previously left out of exhibitions. The series treats process material as finished work.",
    duration: "Archive selection",
    tracks: ["Test tile wall", "Annotated Polaroids", "Discard shelf"],
    links: [
      { platform: "Inquiry", url: "#" },
      { platform: "Archive Notes", url: "#" },
    ],
  },
];

export default releases;
