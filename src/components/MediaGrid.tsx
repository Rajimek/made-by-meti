import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Isotope from "isotope-layout";
import bioCover from "@/assets/bio-cover.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import performanceImg from "@/assets/performance.jpg";
import portraitImg from "@/assets/portrait.jpg";
import referenceImg from "@/assets/reference.png";
import videoBg from "@/assets/video-bg.jpg";

interface GridTileProps {
  type: string;
  title: string;
  timestamp: string;
  image: string;
  href: string;
  variant: "square" | "wide" | "tall" | "large";
  grayscale?: boolean;
}

const createShimSrc = (width: number, height: number) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"></svg>`
  )}`;

const shimSrc = {
  square: createShimSrc(100, 100),
  wide: createShimSrc(200, 100),
  tall: createShimSrc(100, 200),
  large: createShimSrc(200, 200),
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
        <Link to={href}>
          <div className="overview">
            <h3 className="title">{title}</h3>
            <p className="timestamp">{type} · {timestamp}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const tiles: GridTileProps[] = [
  {
    type: "ARTWORK",
    title: "Salt Memory",
    timestamp: "Series",
    image: heroBg,
    href: "/artworks/salt-memory",
    variant: "large",
  },
  {
    type: "PROCESS",
    title: "Studio Walkthrough",
    timestamp: "Film",
    image: videoBg,
    href: "/process/studio-walkthrough-salt-memory",
    variant: "wide",
  },
  {
    type: "ARTWORK",
    title: "Kiln Study 03",
    timestamp: "Object",
    image: portraitImg,
    href: "/artworks/kiln-study-03",
    variant: "tall",
  },
  {
    type: "ARTWORK",
    title: "Museum Light",
    timestamp: "Installation",
    image: referenceImg,
    href: "/artworks/museum-light",
    variant: "square",
  },
  {
    type: "JOURNAL",
    title: "Building MADE",
    timestamp: "Entry",
    image: bioCover,
    href: "/journal/building-made",
    variant: "square",
  },
  {
    type: "EXHIBITION",
    title: "Material Echoes",
    timestamp: "Upcoming",
    image: performanceImg,
    href: "/exhibitions",
    variant: "square",
  },
  {
    type: "ARTWORK",
    title: "Cinder Atlas",
    timestamp: "Relief",
    image: heroBg,
    href: "/artworks/cinder-atlas",
    variant: "square",
  },
  {
    type: "PROCESS",
    title: "Glaze Tests",
    timestamp: "Studio Note",
    image: portraitImg,
    href: "/process/glaze-tests-and-material-swatches",
    variant: "square",
  },
  {
    type: "ARTWORK",
    title: "Soft Bodies",
    timestamp: "Wall Work",
    image: bioCover,
    href: "/artworks/soft-bodies",
    variant: "square",
  },
  {
    type: "JOURNAL",
    title: "Open Studio Notes",
    timestamp: "Entry",
    image: videoBg,
    href: "/journal/open-studio-notes",
    variant: "square",
  },
  {
    type: "ARTWORK",
    title: "After Glaze",
    timestamp: "Series",
    image: referenceImg,
    href: "/artworks/after-glaze",
    variant: "square",
  },
  {
    type: "PROCESS",
    title: "Installing Tactile Echoes",
    timestamp: "Film",
    image: performanceImg,
    href: "/process/installing-tactile-echoes",
    variant: "square",
  },
  {
    type: "EXHIBITION",
    title: "Warehouse Viewing Room",
    timestamp: "Archive",
    image: heroBg,
    href: "/exhibitions",
    variant: "wide",
  },
  {
    type: "ABOUT",
    title: "Meti / Practice",
    timestamp: "Profile",
    image: bioCover,
    href: "/about",
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
