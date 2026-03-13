import bioCover from "@/assets/bio-cover.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import performanceImg from "@/assets/performance.jpg";

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  cover_image: string | null;
  published_at: string;
}

const journalPosts: JournalPost[] = [
  {
    id: "building-made",
    title: "Building MADE",
    slug: "building-made",
    body:
      "MADE started as a way to make room around the work. Instead of treating the website like a static archive, the structure here is meant to hold active series, install views, and notes from the studio.\n\nThis first pass keeps the layout spare and grid-led so the artwork can stay primary.",
    cover_image: heroBg,
    published_at: "2026-02-22T10:00:00.000Z",
  },
  {
    id: "open-studio-notes",
    title: "Open Studio Notes",
    slug: "open-studio-notes",
    body:
      "Recent studio viewings made it clear that process material matters. Test tiles, annotated photos, and install mockups often explain the final work better than polished captions.\n\nThe process section in this template is there to give those fragments a proper place.",
    cover_image: performanceImg,
    published_at: "2026-01-14T10:00:00.000Z",
  },
  {
    id: "why-the-work-stays-monochrome",
    title: "Why the Work Stays Monochrome",
    slug: "why-the-work-stays-monochrome",
    body:
      "Limiting the palette keeps attention on surface and edge. It also makes small differences in firing, residue, and reflection easier to notice.\n\nThat same constraint shaped the website: black, white, grey, and texture first.",
    cover_image: bioCover,
    published_at: "2025-12-03T10:00:00.000Z",
  },
];

export default journalPosts;
