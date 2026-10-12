// עמוד Palo Alto Runners: הכנה למרוץ הלילה (נבנה לפי התוכנית שתומר הדביק ב-12.10.2026).
// מה שעדיין חסר ומוסתר באתר כשהוא ריק: צ׳קליסט (checklist), קישור לקבוצת הסטרבה (stravaGroupUrl) ומזהי סרטוני יוטיוב.

export const race = {
  name: "מרוץ הלילה תל אביב",
  date: "2026-10-28", // מ-src/data/races.json
  distances: "5, 10 ו-15 ק״מ",
  link: "https://www.tlvnightrun.co.il/MenuDefault.aspx?Id=9254",
};

export const plans = [
  { label: "מתחילים", href: "/groups/palo-alto-runners/beginners/" },
  { label: "בינוניים", href: "/groups/palo-alto-runners/intermediate/" },
  { label: "מתקדמים", href: "/groups/palo-alto-runners/advanced/" },
];

export const stravaGroupUrl: string | null = "https://www.strava.com/clubs/2359265";

export interface ChecklistSection {
  title: string;
  items: string[];
}
// הצ׳קליסט נמצא במסמך של תומר ועדיין לא הודבק. כשהמערך לא ריק, הסעיף מוצג בעמוד.
export const checklist: ChecklistSection[] = [];

export const techniqueVideos: { title: string; youtubeId: string | null }[] = [
  { title: "יציבה", youtubeId: null },
  { title: "קצב צעדים", youtubeId: null },
  { title: "ידיים", youtubeId: null },
];
