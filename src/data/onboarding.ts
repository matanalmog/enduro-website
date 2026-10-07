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
  link?: { href: string; label: string };
  items: OnboardingItem[];
  note?: string;
  media: OnboardingMedia[];
  ready: boolean;
}

// הקישור להזמנה לפרופיל Garmin Connect של תומר (הקישור ש-Garmin מייצרת בכפתור "שתף").
export const GARMIN_PROFILE_URL: string | null = "https://connect.garmin.com/modern/profile/Tomer78";

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "finalsurge",
    title: "מקבלים את ההזמנה ב-Final Surge",
    intro: "Final Surge היא המערכת שבה תראה את האימונים שלך ותדווח עליהם.",
    items: [
      {
        text: "מקבלים מייל בשם Coaching Invitation. השולח הוא Final Surge Notification (מסומן בכחול). פותחים אותו.",
        image: { src: "/images/onboarding/finalsurge-01.jpg", alt: "המייל Coaching Invitation בתיבת הדואר, הנושא מסומן באדום והשולח Final Surge Notification בכחול" },
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
    title: "מחברים את שעון ה-Garmin",
    intro: "כך האימונים שביצעת מגיעים אוטומטית ל-Final Surge, ומשם אליי.",
    items: [
      {
        text: "ב-Final Surge לוחצים על השם שלך בפינה העליונה, ובתפריט שנפתח בוחרים Connected Apps.",
        image: { src: "/images/onboarding/watch-01.jpg", alt: "תפריט המשתמש ב-Final Surge, האפשרות Connected Apps מסומנת" },
      },
      {
        text: "ברשימה מופיעים Garmin, Strava, COROS, Amazfit, Suunto, Zwift, Polar, Wahoo ו-MapMyRun. ליד השעון או האפליקציה שלך לוחצים Connect. כאן הדוגמה היא Garmin.",
        image: { src: "/images/onboarding/watch-02.jpg", alt: "רשימת Connected Apps, הכפתור Connect ליד Garmin מסומן" },
      },
      {
        text: "משאירים מסומן Import last 30 days of workouts with initial sync, כדי שהחודש האחרון יועבר. אחר כך לוחצים Sync Accounts. ייבוא החודש האחרון יכול לקחת עד 24 עד 48 שעות.",
        image: { src: "/images/onboarding/watch-06.jpg", alt: "מסך Garmin Connect, תיבת הסימון של ייבוא 30 הימים וכפתור Sync Accounts מסומנים" },
      },
      {
        text: "יופיע מסך של Garmin בשם Control the information you share. כדי שאוכל לראות את הפעילות שלך, השאר את כל המתגים דולקים (Activities, Daily Health Stats, Historical Data ו-Training), ולחץ Save.",
        image: { src: "/images/onboarding/watch-07.jpg", alt: "מסך ההרשאות של Garmin, המתגים וכפתור Save מסומנים" },
      },
      {
        text: "במסך Connect with Final Surge לוחצים Agree. אפשר לבטל את החיבור בכל רגע בהגדרות של Garmin Connect.",
        image: { src: "/images/onboarding/watch-08.jpg", alt: "מסך האישור של Garmin, הכפתור Agree מסומן" },
      },
    ],
    media: [],
    ready: true,
  },
  {
    id: "other-devices",
    title: "שעון או אפליקציה אחרים",
    intro: "אם אתה לא משתמש ב-Garmin, אפשר לבדוק אם השעון או האפליקציה שלך נתמכים.",
    items: [
      {
        text: "בתחתית רשימת Connected Apps לוחצים View All Connected Apps.",
        image: { src: "/images/onboarding/watch-03.jpg", alt: "תחתית הרשימה, הקישור View All Connected Apps מסומן" },
      },
      {
        text: "בדף שנפתח אפשר לסנן לפי All, iOS או Android ולראות אילו אפליקציות נתמכות.",
        image: { src: "/images/onboarding/watch-04.jpg", alt: "הלשוניות iOS ו-Android בדף Connected Apps & Devices" },
      },
      {
        text: "ליד Apple Health ו-Strava מופיע Apple Watch, כלומר הן מתאימות לשעון של אפל.",
        image: { src: "/images/onboarding/watch-05.jpg", alt: "הרשימה מציגה את Apple Health ו-Strava עם הסימון Apple Watch" },
      },
    ],
    media: [],
    ready: true,
  },
  {
    id: "phone",
    title: "מחברים מהטלפון (אפליקציית Final Surge באנדרואיד)",
    intro: "אפשר לחבר ולנהל את השעון גם מהאפליקציה, בלי המחשב.",
    items: [
      {
        text: "באפליקציית Final Surge לוחצים על More בתחתית המסך, בצד שמאל.",
        image: { src: "/images/onboarding/phone-01.jpg", alt: "אפליקציית Final Surge בטלפון, הלשונית More מסומנת" },
      },
      {
        text: "בתפריט שנפתח בוחרים Connected Apps. מתחת לשם מופיע השירות שכבר מחובר, למשל Garmin Connect.",
        image: { src: "/images/onboarding/phone-02.jpg", alt: "תפריט More, האפשרות Connected Apps מסומנת" },
      },
      {
        text: "ברשימה בוחרים את השעון או השירות שלך: Garmin Connect, Strava, COROS, Amazfit, Suunto, Zwift, Polar Flow, Wahoo Fitness או MapMyRun.",
        image: { src: "/images/onboarding/phone-03.jpg", alt: "רשימת האפליקציות המחוברות, Garmin Connect מסומן" },
      },
      {
        text: "אחרי שחיברת את Garmin Connect, במסך שלו יש Auto Sync, שמעביר אוטומטית לשעון את האימונים המתוכננים ל-4 הימים הקרובים, וכפתור Manual Workout Push שמעביר אותם מיד. הכפתור האדום בתחתית מנתק את החיבור, אז לא לוחצים עליו בטעות.",
        image: { src: "/images/onboarding/phone-04.jpg", alt: "מסך Garmin Connect באפליקציה, Auto Sync ו-Manual Workout Push מסומנים" },
      },
    ],
    note: "הצילומים הם מחשבון שכבר מחובר ל-Garmin Connect, לכן מופיע בהם הסטטוס Connected.",
    media: [],
    ready: true,
  },
  {
    id: "apple-watch",
    title: "Apple Watch",
    intro: "לפי המדריך הרשמי של Final Surge (באנגלית, עם תמונות). נדרשים iPhone עם iOS 17.1 ומעלה, Apple Watch מותאם עם watchOS 10.1 ומעלה, ואפליקציית Final Surge ל-iPhone.",
    link: { href: "https://blog.finalsurge.com/final-surge-x-apple-watch-integration-guide/", label: "המדריך המלא של Final Surge, עם צילומי המסך" },
    items: [
      { text: "באפליקציה פותחים את התפריט, בוחרים Connected Apps ואז Apple Health + Watch." },
      { text: "באישורי Apple Health לוחצים Turn On All. חשוב להשאיר את ההרשאה Workouts דולקת, כי בלעדיה האימונים לא יסתנכרנו." },
      { text: "כדי לקבל את האימונים המתוכננים בשעון, לוחצים Yes, Enable Workout Push ומאשרים. לפי המדריך, האימונים המובנים של 7 הימים הקרובים נשלחים אז לשעון." },
      { text: "שימו לב: רק אימונים שנרשמו באפליקציית Workout של אפל מסתנכרנים ל-Final Surge. אימונים מאפליקציות אחרות בשעון לא." },
    ],
    media: [],
    ready: true,
  },
  {
    id: "garmin",
    title: "הגדרות פרטיות ב-Garmin Connect, כדי שאוכל לראות את האימונים",
    intro: "כדי שנהיה מחוברים ב-Garmin Connect, ואני אראה את האימונים שלך. אם הפעילות שלך מוגדרת כפרטית, אני לא אראה אותה, ואת זה בודקים ומסדרים באפליקציה בעברית.",
    items: [
      {
        text: "קודם כל לוחצים על הכפתור למעלה, הקישור לפרופיל שלי ב-Garmin Connect, כדי להצטרף. כך נוכל לעקוב אחרי הפעילויות זה של זה. בפרופיל שנפתח אמור להופיע השם Tomer almog מאמן ריצה.",
      },
      {
        text: "באפליקציית Garmin Connect לוחצים על עוד, בתחתית המסך.",
        image: { src: "/images/onboarding/garmin-01.jpg", alt: "מסך הבית של Garmin Connect, הלשונית עוד מסומנת" },
      },
      {
        text: "גוללים למטה ובוחרים הגדרות.",
        image: { src: "/images/onboarding/garmin-02.jpg", alt: "תפריט עוד, האפשרות הגדרות מסומנת" },
      },
      {
        text: "בוחרים פרופיל ופרטיות.",
        image: { src: "/images/onboarding/garmin-03.jpg", alt: "רשימת ההגדרות, פרופיל ופרטיות מסומן" },
      },
      {
        text: "בדף הזה מופיעות הגדרות הפרטיות. שלוש מהן חשובות לנו: בקשות עוקבים (1), פרופיל (2) ופעילויות (3).",
        image: { src: "/images/onboarding/garmin-04.jpg", alt: "דף פרופיל ופרטיות, שלוש ההגדרות בקשות עוקבים, פרופיל ופעילויות מסומנות" },
      },
      {
        text: "בקשות עוקבים: כשמסומן ״בדיקת בקשות עוקבים״, אי אפשר לעקוב אחריך בלי שאישרת. כשתגיע בקשה ממני, אשר אותה. אפשר גם לבחור ״אשר עוקבים ללא בדיקה״.",
        image: { src: "/images/onboarding/garmin-05.jpg", alt: "מסך בקשות עוקבים, שתי האפשרויות מסומנות" },
      },
      {
        text: "פעילויות: כאן קובעים מי רואה את האימונים שלך. הבחירה ״רק אני״ חוסמת גם אותי. כדי שאוכל לראות, בוחרים ״העוקבים שלי״ (1) או ״כולם״ (2).",
        image: { src: "/images/onboarding/garmin-06.jpg", alt: "מסך הפעילויות, העוקבים שלי וכולם ועדכון פעילויות קודמות מסומנים" },
      },
      {
        text: "ההגדרה הזו חלה על פעילויות חדשות. כדי לעדכן גם את הישנות, לוחצים על ״עדכון פעילויות קודמות״ (3) ואז על ״כל הפעילויות הקודמות״.",
        image: { src: "/images/onboarding/garmin-07.jpg", alt: "מסך עדכון פעילויות קודמות, כל הפעילויות הקודמות מסומן" },
      },
      {
        text: "בוחרים את אותה רמה, למשל ״העוקבים שלי״ (1), ולוחצים ״עדכן״ (2) בפינה.",
        image: { src: "/images/onboarding/garmin-08.jpg", alt: "בחירת רמת פרטיות לכל הפעילויות הקודמות וכפתור עדכן מסומן" },
      },
    ],
    note: "השמות בצילומים הם מאפליקציית Garmin Connect באנדרואיד, בעברית, באוקטובר 2026. Garmin משנה את הממשק מדי פעם, אז ייתכן שהשמות ישתנו מעט.",
    media: [],
    ready: true,
  },
];

onboardingSteps.push({
  id: "sync",
  title: "אימון לא מופיע? בודקים סנכרון של השעון",
  intro: "לפעמים האימון נגמר, אבל השעון עוד לא העביר אותו לענן של Garmin.",
  link: {
    href: "https://www8.garmin.com/manuals/webhelp/GUID-8674F17E-62B2-48DE-927A-251611664658/EN-US/GUID-5B08E695-21AC-45AF-AA49-64F6C80D37FC.html",
    label: "דוגמה ממדריך רשמי של Garmin לסנכרון (לדגם vívosmart 5)",
  },
  items: [
    { text: "השעון מסתנכרן עם האפליקציה באופן אוטומטי בכל פעם שפותחים את אפליקציית Garmin Connect, וגם מדי פעם ברקע." },
    { text: "אם אימון שסיימת עוד לא מופיע, מקרבים את השעון לטלפון, פותחים את האפליקציה ומחכים שהסנכרון יסתיים." },
    { text: "אפשר גם להפעיל סנכרון ידני מהשעון עצמו, דרך תפריט ה-Bluetooth. הדרך המדויקת תלויה בדגם השעון." },
  ],
  media: [],
  ready: true,
});
