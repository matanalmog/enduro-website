// מדריך "ההתחלה שלך": שלבי ההצטרפות של מתאמן חדש.
// כל שלב מוצג באתר רק כש-ready הוא true, כדי שלא יוצג שלב בלי הסבר ובלי תמונות אמיתיות.
// תמונות וסרטונים: public/images/onboarding/ (קבצים ששלח תומר), ומוסיפים אותם ל-media של השלב.
// מקורות לשלב 1: מרכז העזרה של Final Surge, ״Connecting with your Coach״.

export interface OnboardingMedia {
  type: "image" | "video";
  src: string;
  alt: string; // לתמונה: מה רואים. לסרטון: על מה הסרטון
  caption?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  intro?: string;
  items: string[];
  note?: string;
  media: OnboardingMedia[];
  ready: boolean;
}

// הקישור הציבורי לפרופיל Garmin Connect של תומר. יתווסף כשתומר ישלח אותו.
export const GARMIN_PROFILE_URL: string | null = null;

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "finalsurge",
    title: "מקבלים את ההזמנה ב-Final Surge",
    intro: "Final Surge היא המערכת שבה תראה את האימונים שלך ותדווח עליהם.",
    items: [
      "אחרי שסגרנו שמתחילים, אשלח הזמנה לכתובת המייל שמילאת בשאלון. ההזמנה מגיעה מ-Final Surge.",
      "לוחצים על הקישור במייל ופותחים חשבון ב-Final Surge. חשוב להשתמש באותה כתובת מייל שאליה נשלחה ההזמנה. אם כבר יש לך חשבון, מתחברים אליו.",
      "אחרי ההתחברות מופיע פס כחול עם קישור להזמנה. לוחצים עליו ומאשרים את ההזמנה.",
      "כדי לוודא שהחיבור הצליח, נכנסים להגדרות. בחלק Coaches אמור להופיע שמי עם הסימון Accepted.",
    ],
    note: "לא הגיע מייל? בדוק בספאם או בקידומי מכירות, ואם הוא לא שם, כתוב לי בוואטסאפ ואשלח שוב.",
    media: [],
    ready: true,
  },
  {
    id: "devices",
    title: "מחברים את השעון והאפליקציות",
    intro: "כדי שהאימונים שביצעת יגיעו אליי, צריך לחבר את השעון או את האפליקציה שבה אתה מתעד.",
    items: [],
    media: [],
    ready: false,
  },
  {
    id: "garmin",
    title: "מתחברים אליי ב-Garmin Connect",
    intro: "כך אוכל לראות את הפעילות שלך ולהתאים את האימונים.",
    items: [],
    media: [],
    ready: false,
  },
];
