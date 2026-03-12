import { useState, useEffect, useRef } from "react";
import Isotope from "isotope-layout";

interface GridTileProps {
  type: string;
  title: string;
  timestamp: string;
  image: string;
  href: string;
  variant: "square" | "wide" | "tall" | "large";
  grayscale?: boolean;
}

const shimSrc = {
  square: "https://www.rihannanow.com/wp-content/themes/rihannanow2014/images/media-grid-shim-square.png",
  wide: "https://www.rihannanow.com/wp-content/themes/rihannanow2014/images/media-grid-shim-wide.png",
  tall: "https://www.rihannanow.com/wp-content/themes/rihannanow2014/images/media-grid-shim-tall.png",
  large: "https://www.rihannanow.com/wp-content/themes/rihannanow2014/images/media-grid-shim-large.png",
};

const GridTile = ({
  type,
  title,
  timestamp,
  image,
  href,
  variant,
  grayscale = true,
}: GridTileProps) => {
  const [touchActive, setTouchActive] = useState(false);

  const itemClass = [
    "grid-item",
    `grid-item--${variant}`,
    touchActive ? "touch-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const innerClass = ["inner", grayscale ? "grayscale" : ""]
    .filter(Boolean)
    .join(" ");

  const handleTouchStart = () => setTouchActive(true);
  const handleTouchEnd = () => setTimeout(() => setTouchActive(false), 600);

  return (
    <div
      className={itemClass}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        className="shim"
        src={shimSrc[variant]}
        width="100%"
        alt=""
        aria-hidden="true"
      />
      <div
        className={innerClass}
        style={{ backgroundImage: `url(${image})` }}
      >
        <a href={href}>
          <div className="overview">
            <h3 className="title">{title}</h3>
            <p className="timestamp">{type} · {timestamp}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

// Using actual rihannanow.com images
const tiles: GridTileProps[] = [
  {
    type: "MUSIC",
    title: "Neon Portraits",
    timestamp: "Feb 22, 2026",
    image: "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=1200&q=80&auto=format&fit=crop",
    href: "/music/infinite-drift",
    variant: "large",
  },
  {
    type: "VIDEO",
    title: "Choreography Session",
    timestamp: "Feb 22, 2026",
    image: "https://img.youtube.com/vi/C6Al-tkTJbk/hqdefault.jpg",
    href: "/videos/choreography-session",
    variant: "wide",
  },
  {
    type: "MUSIC",
    title: "Sunglasses Session",
    timestamp: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1761930293133-b216e52c1686?w=640&q=80&auto=format&fit=crop",
    href: "/music/tideshift-sessions-vol-3",
    variant: "tall",
  },
  {
    type: "MUSIC",
    title: "Motion Blur",
    timestamp: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1761930293047-50eadfc3bdcc?w=640&q=80&auto=format&fit=crop",
    href: "/music/lucid-architecture",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Tank Top Portrait",
    timestamp: "Feb 5, 2026",
    image: "https://images.unsplash.com/photo-1761882132468-c7035c9aff26?w=640&q=80&auto=format&fit=crop",
    href: "/music/fade-to-signal",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Neon Lights",
    timestamp: "Jan 28, 2026",
    image: "https://images.unsplash.com/photo-1761882717631-824133aedc0e?w=640&q=80&auto=format&fit=crop",
    href: "/music/night-garden",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Peace Sign",
    timestamp: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1761882298487-582160fdcd4c?w=640&q=80&auto=format&fit=crop",
    href: "/music/weightless",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Orange Profile",
    timestamp: "Jan 12, 2026",
    image: "https://images.unsplash.com/photo-1761882738571-6cf4f77f9b65?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Blurred Shades",
    timestamp: "Jan 5, 2026",
    image: "https://images.unsplash.com/photo-1761882344736-060c1109ff26?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Chin Thoughts",
    timestamp: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1761882335412-b9ff106e8766?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Hands Over Face",
    timestamp: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1761882057299-b06c9eb7561b?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Tattoo Portrait",
    timestamp: "Dec 12, 2025",
    image: "https://images.unsplash.com/photo-1761792008900-8cd5994ac601?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
  {
    type: "MUSIC",
    title: "Cheek Pull",
    timestamp: "Dec 5, 2025",
    image: "https://images.unsplash.com/photo-1761792444425-1bae3ba0c86b?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "wide",
  },
  {
    type: "MUSIC",
    title: "Looking Up",
    timestamp: "Nov 28, 2025",
    image: "https://images.unsplash.com/photo-1761791942939-ee8f3c5c717c?w=640&q=80&auto=format&fit=crop",
    href: "#",
    variant: "square",
  },
];

const MediaGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<Isotope | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Wait for shim images to load before initializing Isotope
    const images = gridRef.current.querySelectorAll("img.shim");
    let loadedCount = 0;

    const initIsotope = () => {
      isoRef.current = new Isotope(gridRef.current!, {
        itemSelector: ".grid-item",
        layoutMode: "masonry",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item--square",
        },
      });
    };

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        initIsotope();
      }
    };

    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
      }
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      if (!isoRef.current) initIsotope();
    }, 1000);

    const handleResize = () => {
      isoRef.current?.layout();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      isoRef.current?.destroy();
    };
  }, []);

  return (
    <div className="media-grid">
      <div className="grid-container" ref={gridRef}>
        {tiles.map((tile, i) => (
          <GridTile key={i} {...tile} />
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
