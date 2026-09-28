// רשימת כל הסרטונים מערוץ היוטיוב של תומר אלמוג (ENDURO RUNNING TEAM)
// נשלף מ-youtube.com/@tomeralmog/videos לצורך גלריית טיוטה (עמוד draft, לא מקושר, noindex).
export type YouTubeCategory =
  | "הכנה לריצה"
  | "טכניקת ריצה"
  | "פליאומטרי"
  | "המלצות"
  | "פציעות"
  | "תרגילי כח";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  category: YouTubeCategory;
}

// סדר הצגת הקטגוריות בגלריה
export const categoryOrder: YouTubeCategory[] = [
  "הכנה לריצה",
  "טכניקת ריצה",
  "פליאומטרי",
  "המלצות",
  "פציעות",
  "תרגילי כח",
];

export const youtubeVideos: YouTubeVideo[] = [
  // תרגילי כח
  { videoId: "_nAgyjPzGdg", title: "פרוטוקול זהב לכף הרגל: 19 תרגילים לדורבן, אכילס וחיזוק כף הרגל", category: "תרגילי כח" },

  // פליאומטרי
  { videoId: "tvmi0zrnGJ0", title: "ניתורים רציפים הצידה על רגל אחת ליציבות אולטימטיבית - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "GH94eHmNARU", title: "ניתורים מצד לצד על רגל אחת ליציבות ומניעת פציעות - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "npEAjQUGYF0", title: "ניתורים רציפים הצידה בשתי רגליים ליציבות אקסטרים - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "nuSJn9CS9-w", title: "ניתורים מצד לצד בשתי רגליים ליציבות ומניעת פציעות - תרגילי טכניקה בריצה", category: "פליאומטרי" },
  { videoId: "t1dPig3KY_A", title: "ניתור כפול רציף תקיפת קרקע חד-רגלית ופיצוץ למדרגה", category: "פליאומטרי" },
  { videoId: "e4wSgnQ7Npo", title: "ניתור כפול רציף: לקופסה/מדרגה", category: "פליאומטרי" },
  { videoId: "Dm0PWhlqk6k", title: "ניתור חד-רגלי מתפרץ מישיבה עם תקיפת קרקע - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "KW4pELQegkQ", title: "ניתור מתפרץ מישיבה עם לחיצת רגליים", category: "פליאומטרי" },
  { videoId: "NUB95Qt_4f4", title: "החלפות רגליים מהירות על מדרגה לשיפור הקאדנס - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "d_IvnzdSxIM", title: "ניתורים רציפים במדרגות על רגל אחת לכוח דחיפה מקסימלי - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "G8NdU_26VIQ", title: "ניתורים רציפים במדרגות לכוח מתפרץ וקפיציות שיא - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "EpdsoPyDToI", title: "ניתור צידי למדרגה ונחיתה על רגל אחת ליציבות שיא - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "cALCdpxYrmU", title: "ניתור צידי למדרגה גבוהה ליציבות וכוח מתפרץ - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "3Tx8UgpVUIo", title: "ניתור למדרגה גבוהה ונחיתה על רגל אחת - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "BiVtD7t5p0E", title: "ניתור מדרגה גבוהה לשיפור הבלימה והכוח המתפרץ - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "tCBH9OeCACQ", title: "קפיצות סקייטר (ניתורי אלכסון) ליציבות וכוח מתפרץ - תרגילי טכניקה ופליאומטריה", category: "פליאומטרי" },
  { videoId: "zUdRiaITHmw", title: "ניתורי איקס על רגל אחת", category: "פליאומטרי" },
  { videoId: "8oz2ywrCFYM", title: "ניתורים גבוהים על רגל אחת לכוח מתפרץ מקסימלי - תרגילי טכניקה בריצה", category: "פליאומטרי" },
  { videoId: "GFyrJLxPcwQ", title: "ניתורים על רגל אחת ליציבות וקפיציות בקרסול - תרגילי טכניקה בריצה", category: "פליאומטרי" },
  { videoId: "VrPzWkVMVa8", title: "ניתורי פוגו (Pogo Jumps) לקפיציות והחזר אנרגיה - תרגילי טכניקה בריצה", category: "פליאומטרי" },

  // טכניקת ריצה
  { videoId: "K0yD-bzTMRo", title: "סקיפינג נמוך ויציאה לספרינט קצר לשיפור הקאדנס והתאוצה - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "41km1wnh3w4", title: "ריצה לאחור (Retro Running) לחיזוק הברכיים והארבע-ראשי - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "PaY1pGOQHtY", title: "צעד סיכול חילוף (Carioca) לניידות אגן וקואורדינציה - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "mOP37FKDxYA", title: "ריצת מספרת (Straight-Leg Run) לשיפור כוח הדחיפה - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "LJINIis6Iz4", title: "צעדי רדיפה לאורך לחיזוק שרירים מייצבים ומניעת פציעות - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "zHZp3_kTOXU", title: "צעדי איילה (Bounding) לכוח מתפרץ והארכת הצעד - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "QH9bsUoLM9U", title: "דילוגים לגובה לפיתוח כוח מתפרץ ודחיפה עוצמתית - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "4gtjsN7zqf8", title: "סקיפינג נמוך לשיפור עבודת כפות הרגליים - תרגילי טכניקה בריצה", category: "טכניקת ריצה" },
  { videoId: "cW-dxLc1ZlE", title: "סקיפינג פתיחה וסגירת ירך (A-Skip Out/In)", category: "טכניקת ריצה" },
  { videoId: "FlivKrlCTdI", title: "ביצוע Triple A-Skip לזריזות רגליים מקסימלית", category: "טכניקת ריצה" },
  { videoId: "0ulrujfd74Q", title: "איך לבצע A-Skip נכון", category: "טכניקת ריצה" },
  { videoId: "-n0VNKT0gP8", title: "סקיפינג - כל צעד שלישי", category: "טכניקת ריצה" },
  { videoId: "1QmFp7-kipM", title: "סקיפינג גבוה עם רגל אחת לקואורדינציה וכוח מתפרץ", category: "טכניקת ריצה" },
  { videoId: "OVaXMJsAIUY", title: "עקבים לישבן מנח נמוך - תרגילי טכניקה לריצה", category: "טכניקת ריצה" },
  { videoId: "cnkxzX_-MYI", title: "עקבים לישבן (Butt Kicks) - ביצוע נכון, מנח גבוה", category: "טכניקת ריצה" },
  { videoId: "fWRd2Z1Hd_Y", title: "סקיפינג גבוה - איך לבצע הרמות ברכיים גבוהות", category: "טכניקת ריצה" },
  { videoId: "0A8x6tMi5cE", title: "סקיפינג - איך נכון לבצע הרמות ברכיים גבוהות", category: "טכניקת ריצה" },
  { videoId: "SM0v_8yO-7A", title: "חימום דינמי מלא לאימון ריצה", category: "הכנה לריצה" },

  // המלצות
  { videoId: "G_DLQ_eLkpE", title: "תומר אלמוג - מאמן כושר אישי, מאמן ריצה", category: "המלצות" },
  { videoId: "ONClvEF4CHw", title: "השתתפותי אצל פאולה וליאון בפאנל על פעילות גופנית לילדים עם הפרעות קשב וריכוז", category: "המלצות" },
  { videoId: "qnZj0NIhzd4", title: "ממליץ על תומר אלמוג", category: "המלצות" },
];
