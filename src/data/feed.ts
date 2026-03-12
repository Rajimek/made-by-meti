export interface FeedItem {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  category: string;
  description: string;
  content: string;
}

export const feedChannel = {
  title: "Ocean",
  link: "https://www.ocean.live",
  feedUrl: "https://www.ocean.live/feed/",
  description: "News, tour updates, and new music from Ocean",
  lastBuildDate: "Mon, 27 Jan 2026 10:15:00 +0000",
  language: "en",
  updatePeriod: "weekly",
  updateFrequency: 1,
  generator: "Ocean CMS v2.1",
  image: {
    url: "/favicon.ico",
    title: "Ocean",
    link: "https://www.ocean.live",
    width: 32,
    height: 32,
  },
};

export const feedItems: FeedItem[] = [
  {
    title: "Infinite Drift EP — Out Now",
    link: "https://www.ocean.live/blog/2026/01/infinite-drift-ep-out-now/",
    author: "Ocean",
    pubDate: "Mon, 27 Jan 2026 10:00:00 +0000",
    category: "Releases",
    description:
      "The long-awaited 'Infinite Drift' EP is finally here. Four tracks of deep progressive techno exploring themes of movement, weightlessness, and the spaces between sound. Available now on all platforms via Afterglow Records.",
    content:
      "<p>The long-awaited 'Infinite Drift' EP is finally here. Four tracks of deep progressive techno exploring themes of movement, weightlessness, and the spaces between sound.</p><p>Tracklist: 1. Infinite Drift 2. Solar Flare 3. Underneath the Surface 4. Pulse Width</p><p>Available now on all platforms via Afterglow Records.</p>",
  },
  {
    title: "2026 Tour Dates Announced",
    link: "https://www.ocean.live/blog/2025/12/2026-tour-dates/",
    author: "Ocean",
    pubDate: "Fri, 19 Dec 2025 14:30:00 +0000",
    category: "Tour",
    description:
      "Excited to announce the first wave of 2026 tour dates! From Metro City residencies to festivals across Europe, this year is shaping up to be the biggest yet. Tickets for Tideshift Beach are on sale now.",
    content:
      "<p>Excited to announce the first wave of 2026 tour dates! From Metro City residencies to festivals across Europe, this year is shaping up to be the biggest yet.</p><p>Highlights include the return of Tideshift Beach at Sunset Charlie, a debut at Sky Festival in Germany, and multiple dates at The Spectrum.</p><p>Tickets for Tideshift Beach are on sale now.</p>",
  },
  {
    title: "YEARMIX 2025 — Listen Now",
    link: "https://www.ocean.live/blog/2025/12/yearmix-2025/",
    author: "Ocean",
    pubDate: "Wed, 31 Dec 2025 00:00:00 +0000",
    category: "Recordings",
    description:
      "My annual YEARMIX is here — 90 minutes of the tracks that defined 2025 for me, blended into one continuous journey. From the melancholic opening to the euphoric finale, this mix captures the evolution of my sound over the past year.",
    content:
      "<p>My annual YEARMIX is here — 90 minutes of the tracks that defined 2025 for me, blended into one continuous journey.</p><p>Stream it now on Soundcloud, YouTube, and all major platforms. Thank you for an incredible year.</p>",
  },
];

export const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
>
  <channel>
    <title>${feedChannel.title}</title>
    <atom:link href="${feedChannel.feedUrl}" rel="self" type="application/rss+xml" />
    <link>${feedChannel.link}</link>
    <description>${feedChannel.description}</description>
    <lastBuildDate>${feedChannel.lastBuildDate}</lastBuildDate>
    <language>${feedChannel.language}</language>
    <sy:updatePeriod>${feedChannel.updatePeriod}</sy:updatePeriod>
    <sy:updateFrequency>${feedChannel.updateFrequency}</sy:updateFrequency>
    <generator>${feedChannel.generator}</generator>
    <image>
      <url>${feedChannel.image.url}</url>
      <title>${feedChannel.image.title}</title>
      <link>${feedChannel.image.link}</link>
      <width>${feedChannel.image.width}</width>
      <height>${feedChannel.image.height}</height>
    </image>
${feedItems
  .map(
    (item) => `    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <dc:creator><![CDATA[${item.author}]]></dc:creator>
      <pubDate>${item.pubDate}</pubDate>
      <category><![CDATA[${item.category}]]></category>
      <description><![CDATA[${item.description}]]></description>
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;
