import bioCover from "@/assets/bio-cover.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import portraitImg from "@/assets/portrait.jpg";
import referenceImg from "@/assets/reference.png";
import videoBg from "@/assets/video-bg.jpg";

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
    id: "studio-walkthrough-salt-memory",
    title: "Studio Walkthrough: Salt Memory",
    description: "A short walkthrough of the Salt Memory wall reliefs before firing, including pinning decisions, edge treatment, and how the surfaces change once light rakes across them.",
    date: "February 2026",
    location: "MADE Studio",
    duration: "3:28",
    thumbnail: videoBg,
    category: "choreography",
  },
  {
    id: "installing-tactile-echoes",
    title: "Installing Tactile Echoes",
    description: "A behind-the-scenes film documenting how a recent exhibition was laid out on site, from spacing tests and mockups to final wall labels and lighting adjustments.",
    date: "January 2026",
    location: "Warehouse Viewing Room",
    duration: "9:14",
    thumbnail: performanceImg,
    category: "live",
  },
  {
    id: "glaze-tests-and-material-swatches",
    title: "Glaze Tests and Material Swatches",
    description: "A studio note on test tiles, grog density, and surface variation. The clip compares small glaze shifts that become significant when scaled up into wall-based work.",
    date: "December 2025",
    location: "Material Lab",
    duration: "6:42",
    thumbnail: referenceImg,
    category: "studio",
  },
  {
    id: "open-studio-documentary",
    title: "Open Studio Documentary",
    description: "A longer documentary edit about how MADE came together as a space for viewing artwork. It follows the progression from test shelf to finished room.",
    date: "October 2025",
    location: "MADE Studio",
    duration: "14:08",
    thumbnail: bioCover,
    category: "documentary",
  },
  {
    id: "material-echoes-reel",
    title: "Material Echoes Exhibition Reel",
    description: "A concise exhibition reel cut from the Material Echoes install, focusing on movement through the room and the way the ceramic pieces collect shadow.",
    date: "July 2025",
    location: "Civic Gallery",
    duration: "4:36",
    thumbnail: heroBg,
    category: "aftermovie",
  },
  {
    id: "meti-in-conversation",
    title: "Meti in Conversation",
    description: "A recorded conversation about material memory, pacing a room, and why the MADE project centers slow looking instead of constant visual turnover.",
    date: "May 2025",
    location: "Viewing Room",
    duration: "11:20",
    thumbnail: portraitImg,
    category: "studio",
  },
];
