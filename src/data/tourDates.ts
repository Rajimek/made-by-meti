export interface TourDate {
  date: string;
  venue: string;
  ticketLink?: string;
}

export const tourDates: TourDate[] = [
  { date: "JAN 30", venue: "The Spectrum · Afterglow · Metro City" },
  { date: "FEB 14", venue: "The Underground · Harbor District" },
  { date: "FEB 28", venue: "Seven Frequencies · Westside · Metro City" },
  { date: "MARCH 13", venue: "The Crossing · Metro City" },
  { date: "MARCH 16 – APR 02", venue: "Time Off" },
  { date: "APR 04", venue: "Echo Chamber · Northshore" },
  { date: "APR 10", venue: "Nebula Sound · Industrial Quarter · Basel (CH)" },
  { date: "APR 26", venue: "Spring Night w/ Guest Artist All Nighter · The Jewel Box · Metro City" },
  { date: "MAY 17", venue: "Garden Sessions · Abbey Gardens (BE)" },
  { date: "MAY 23", venue: "Urban Pulse Festival · West Gardens · Metro City" },
  { date: "JUN 06", venue: "Open Mind Festival · Riverside City" },
  { date: "JUN 25", venue: "Sky Festival · Airfield District (DE)" },
  { date: "JUN 27", venue: "Beachside Events w/ Guest Artist · Beach Club 69 · Coastal Town" },
  { date: "JUL 25", venue: "TIDESHIFT BEACH — All Day Long · Sunset Charlie · Beachfront", ticketLink: "#" },
  { date: "AUG 07", venue: "Harmony Festival · The Garden Resort · Coastal Region (HRV)" },
  { date: "AUG 08", venue: "Frequency Festival · Metro City" },
];

export const recordings = [
  "Ocean ° Tideshift ° Jan 2026",
  "Ocean ° YEARMIX ° 2025",
  "Ocean ° Tideshift 159 ° Dec 2025",
  "Ocean ° Tideshift 158 ° Nov 2025",
  "Ocean ° Live Tideshift Recording ° July 2025",
  "Ocean ° Live at Frequency ADE ° Oct 2024",
  "Ocean ° Live at Midnight Club Berlin ° March 2024",
];
