export interface TourDate {
  date: string;
  venue: string;
  ticketLink?: string;
}

export const tourDates: TourDate[] = [
  { date: "APR 04 – MAY 01", venue: "Material Echoes · Civic Gallery · Portland", ticketLink: "#" },
  { date: "MAY 16 – JUN 07", venue: "Open Studio Viewing Room · MADE · Seattle" },
  { date: "JUN 21 – JUL 19", venue: "Kiln Studies · Clay House · Los Angeles", ticketLink: "#" },
  { date: "AUG 08 – SEP 14", venue: "Soft Bodies · Warehouse Annex · New York" },
  { date: "OCT 03 – NOV 02", venue: "After Glaze Archive · Project Space · Chicago", ticketLink: "#" },
  { date: "NOV 21 – DEC 14", venue: "Winter Viewing Appointments · MADE · Seattle" },
];

export const recordings = [
  "MADE ° Open Studio Notes ° 2026",
  "Meti ° Material Echoes Walkthrough ° 2025",
  "MADE ° Kiln Study Diary ° 2025",
  "Meti ° After Glaze Archive Talk ° 2024",
];
