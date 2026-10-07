// מדריך "ההתחלה שלך": שלבי ההצטרפות של מתאמן חדש.
// כל שלב מוצג באתר רק כש-ready הוא true, כדי שלא יוצג שלב בלי הסבר ובלי תמונות אמיתיות.
// תמונות וסרטונים: public/images/onboarding/ (קבצים ששלח תומר), ומוסיפים אותם ל-media של השלב.
// שלב 1 נכתב לפי הקלטת מסך אמיתית של תהליך ההרשמה (צילומי המסך מטושטשים משם ומכתובות מייל).

export interface OnboardingMedia {
  type: "image" | "video";
  src: string;
  alt: string; // לתמונה: מה רואים. לסרטון: על מה הסרטון
  caption?: string;
}

export interface OnboardingItem {
  text: string;
  image?: { src: string; alt: string };
}

export interface OnboardingStep {
  id: string;
  title: string;
  intro?: string;
  items: OnboardingItem[];
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
      {
        text: "מקבלים מייל מ-Final Surge בשם Coaching Invitation, ופותחים אותו.",
        image: { src: "/images/onboarding/finalsurge-01.jpg", alt: "המייל Coaching Invitation בתיבת הדואר, הנושא מסומן באדום" },
      },
      {
        text: "לוחצים על הכפתור האדום View Coach Invitation.",
        image: { src: "/images/onboarding/finalsurge-02.jpg", alt: "גוף המייל עם הכפתור האדום View Coach Invitation מסומן" },
      },
      {
        text: "בדף שנפתח, מי שעדיין אין לו חשבון לוחץ על Create Account. מי שכבר רשום ב-Final Surge לוחץ על Log In ומתחבר.",
        image: { src: "/images/onboarding/finalsurge-03.jpg", alt: "דף ההזמנה, הכפתור Create Account מסומן באדום והכפתור Log In בכחול" },
      },
      {
        text: "ממלאים שם פרטי, שם משפחה, כתובת מייל וסיסמה. חשוב להשתמש באותה כתובת מייל שאליה נשלחה ההזמנה.",
        image: { src: "/images/onboarding/finalsurge-04.jpg", alt: "טופס Create my Account, שדות השם, המייל והסיסמה ממוספרים" },
      },
      {
        text: "הסיסמה צריכה להיות באורך 7 עד 15 תווים, ולכלול אות גדולה באנגלית, אות קטנה באנגלית ומספר. אם היא לא עומדת בזה, תופיע הודעה אדומה.",
        image: { src: "/images/onboarding/finalsurge-05.jpg", alt: "שדה הסיסמה עם הודעת השגיאה האדומה על דרישות הסיסמה" },
      },
      {
        text: "בוחרים אזור זמן ויחידות מרחק. ברירת המחדל ליחידות היא Miles, ורצוי לבחור Kilometers. אחר כך לוחצים Sign Up.",
        image: { src: "/images/onboarding/finalsurge-06.jpg", alt: "בחירת Timezone ו-Units, וכפתור Sign Up מסומן" },
      },
      {
        text: "מופיעה הודעה שהחשבון נוצר. בדף ההזמנה לוחצים על Accept. אם הדפדפן מציע לשמור את הסיסמה, אפשר לבחור לפי ההעדפה שלך.",
        image: { src: "/images/onboarding/finalsurge-07.jpg", alt: "הכפתור האדום Accept בדף ההזמנה מסומן" },
      },
      {
        text: "מופיע המסך Congratulations. לוחצים על View My Training Calendar.",
        image: { src: "/images/onboarding/finalsurge-08.jpg", alt: "מסך Congratulations, הכפתור View My Training Calendar מסומן" },
      },
      {
        text: "בוחרים Continue with Web App. אפשר להשאיר את הסימון Remember my selection.",
        image: { src: "/images/onboarding/finalsurge-09.jpg", alt: "מסך Select Platform, הקישור Continue with Web App מסומן" },
      },
      {
        text: "זה יומן האימונים שלך. כאן יופיעו האימונים שאכתוב לך.",
        image: { src: "/images/onboarding/finalsurge-10.jpg", alt: "יומן האימונים ב-Final Surge" },
      },
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
