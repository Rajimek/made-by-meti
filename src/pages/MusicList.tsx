import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import releases from "@/data/releases";

interface ImageDimensions {
  width: number;
  height: number;
}

type ArtworkItem = (typeof releases)[number] & {
  aspectRatio: number;
};

interface ArtworkRow {
  height: number;
  items: Array<{
    artwork: ArtworkItem;
    width: number;
  }>;
}

const UNIFORM_RATIO_TOLERANCE = 0.08;
const LISTING_GAP = 6;
const MOBILE_BREAKPOINT = 641;
const MOBILE_ROW_HEIGHT = 240;
const DESKTOP_ROW_HEIGHT = 300;
const ROW_FILL_THRESHOLD = 0.72;

const MusicList = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>({});
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    let active = true;

    const loadDimensions = async () => {
      const entries = await Promise.all(
        releases.map(
          (release) =>
            new Promise<[string, ImageDimensions]>((resolve) => {
              const image = new Image();

              image.onload = () => {
                resolve([
                  release.slug,
                  {
                    width: image.naturalWidth || 1,
                    height: image.naturalHeight || 1,
                  },
                ]);
              };

              image.onerror = () => {
                resolve([release.slug, { width: 1, height: 1 }]);
              };

              image.src = release.coverImage;
            })
        )
      );

      if (!active) return;
      setDimensions(Object.fromEntries(entries));
    };

    loadDimensions();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    const updateWidth = () => {
      setGridWidth(gridRef.current?.clientWidth ?? 0);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const allImagesMeasured = releases.every((release) => dimensions[release.slug]);

  const artworkItems = useMemo<ArtworkItem[]>(
    () =>
      releases.map((release) => {
        const imageDimensions = dimensions[release.slug] ?? { width: 1, height: 1 };
        const aspectRatio = imageDimensions.width / imageDimensions.height;

        return {
          ...release,
          aspectRatio,
        };
      }),
    [dimensions]
  );

  const useUniformGrid = useMemo(() => {
    if (!allImagesMeasured || artworkItems.length <= 1) return true;

    const ratios = artworkItems.map((item) => item.aspectRatio);
    const minRatio = Math.min(...ratios);
    const maxRatio = Math.max(...ratios);

    return maxRatio - minRatio <= UNIFORM_RATIO_TOLERANCE;
  }, [allImagesMeasured, artworkItems]);

  const artworkRows = useMemo<ArtworkRow[]>(() => {
    if (!allImagesMeasured || useUniformGrid || !gridWidth) return [];

    const targetHeight = gridWidth < MOBILE_BREAKPOINT ? MOBILE_ROW_HEIGHT : DESKTOP_ROW_HEIGHT;
    const minimumItemsPerRow = gridWidth < MOBILE_BREAKPOINT ? 1 : 2;
    const maximumItemsPerRow = gridWidth < MOBILE_BREAKPOINT ? 2 : 3;
    const rows: ArtworkRow[] = [];

    let pendingItems: ArtworkItem[] = [];
    let pendingRatio = 0;

    const flushRow = (justify: boolean) => {
      if (!pendingItems.length) return;

      const gapWidth = LISTING_GAP * Math.max(pendingItems.length - 1, 0);
      const computedHeight = (gridWidth - gapWidth) / pendingRatio;
      const rowHeight = justify
        ? Math.min(
            Math.max(computedHeight, targetHeight * 0.88),
            targetHeight * 1.28
          )
        : targetHeight;

      rows.push({
        height: rowHeight,
        items: pendingItems.map((artwork) => ({
          artwork,
          width: rowHeight * artwork.aspectRatio,
        })),
      });

      pendingItems = [];
      pendingRatio = 0;
    };

    for (const artwork of artworkItems) {
      pendingItems.push(artwork);
      pendingRatio += artwork.aspectRatio;

      const gapWidth = LISTING_GAP * Math.max(pendingItems.length - 1, 0);
      const projectedWidth = pendingRatio * targetHeight + gapWidth;
      const hasEnoughWidth = projectedWidth >= gridWidth * ROW_FILL_THRESHOLD;

      if (
        pendingItems.length >= minimumItemsPerRow &&
        (hasEnoughWidth || pendingItems.length >= maximumItemsPerRow)
      ) {
        flushRow(true);
      }
    }

    flushRow(false);

    return rows;
  }, [allImagesMeasured, artworkItems, gridWidth, useUniformGrid]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div
          ref={gridRef}
          className={`listing-grid ${
            allImagesMeasured && !useUniformGrid ? "listing-grid--justified" : "listing-grid--uniform"
          }`}
        >
          {allImagesMeasured && !useUniformGrid
            ? artworkRows.map((row, index) => (
                <div key={`row-${index}`} className="listing-row" style={{ height: `${row.height}px` }}>
                  {row.items.map(({ artwork, width }) => (
                    <Link
                      key={artwork.slug}
                      to={`/artworks/${artwork.slug}`}
                      className="listing-tile group"
                      style={{ width: `${width}px` }}
                    >
                      <div className="listing-tile-inner listing-tile-inner--fill">
                        <img
                          src={artwork.coverImage}
                          alt={artwork.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="listing-tile-overlay">
                          <span className="listing-tile-title">{artwork.title}</span>
                          <span className="listing-tile-sub">{artwork.type} · {artwork.year}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))
            : artworkItems.map((r) => (
                <Link
                  key={r.slug}
                  to={`/artworks/${r.slug}`}
                  className="listing-tile group"
                >
                  <div className="listing-tile-inner" style={{ ["--tile-ratio" as const]: String(r.aspectRatio) }}>
                    <img
                      src={r.coverImage}
                      alt={r.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="listing-tile-overlay">
                      <span className="listing-tile-title">{r.title}</span>
                      <span className="listing-tile-sub">{r.type} · {r.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </main>
    </div>
  );
};

export default MusicList;
