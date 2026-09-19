#!/usr/bin/env node
// סוכן לוח תחרויות (סעיף 6, סוכן א' באפיון).
//
// מקורות פעילים (כולם נבדקו ידנית שהם באמת מחזירים HTML/פיד תקין לפני שהוטמעו כאן):
//   - realtiming.co.il/events   — טבלת HTML נקייה, שרת-מרונדרת. מרוצים בישראל, כולל אזור.
//   - runpanel.co.il/run-races-list/ — רשימת <p> עקבית עם קישור אמיתי לכל מרוץ. מרוצים בישראל
//     (חופף חלקית ל-realtiming; יש דה-דופליקציה לפי תאריך+שם+קישור). לא מספק אזור מיקום
//     (הטקסט אחרי המקף הוא מרחק המקצה, לא מיקום) — האזור מושלם ע"י inferRegionFromName.
//   - marathonisrael.co.il/event_location/israel/ — כרטיסי אירוע מבוססי-תמונה; שם המרוץ
//     נשלף מ-alt של תמונת הכיסוי, התאריך מ-<p class="blog_item__date">. נבדק מחדש
//     ואומת שהוא כן חושף שם+תאריך+קישור אמינים (בניגוד להערכה קודמת). מרוצים בישראל.
//   - 3plus.co.il (עמוד הבית) — כרטיסי "thumbnail has-logo" בכל האתר (כולל ארכיון עבר);
//     מסוננים לפי תאריך עתידי בלבד וסינון מילות מפתח טריאתלון/דואתלון/סוים-ראן.
//   - aims-worldrunning.org/events.ics — פיד iCalendar רשמי של איגוד המרתונים הבינלאומי.
//     מרתונים/חצאי מרתון בעולם. מסונן ל-12 חודשים קדימה (לא הגבלת ספירה שרירותית).
//   - utmb.world/utmb-world-series-events — עמוד Next.js שמטמיע JSON מלא (__NEXT_DATA__)
//     עם לוח מרוצי סבב ה-UTMB. המקור חושף רק את 20 המרוצים הקרובים ביותר (nbHits מדווח
//     261 סה"כ, אך offset/page בכתובת לא משפיעים על ה-SSR ולא אותר endpoint API נגיש
//     לדפדוף אמיתי) — מגבלה ידועה של המקור, לא של הקוד. אם יימצא endpoint פנימי (למשל
//     דרך בדיקת בקשות רשת בדפדפן אמיתי בזמן לחיצה על "טען עוד" באתר) אפשר להרחיב.
//
// מקורות שנבדקו ולא שולבו (לתיעוד, כדי שלא ייבדקו שוב לחינם):
//   - event.shvoong.co.il/categories/run/ — הרשימה נטענת ב-AJAX (jet-engine + ele-custom-skin)
//     בלי endpoint פשוט וללא nonce; מסוכן לגריפה יציבה. הקודים הציבוריים של Shvoong כבר
//     מכוסים בטבלת קודי ההנחה בעמוד.
//   - sovev-emek.org — אתר של מרוץ בודד (HOKA Ultra Marathon Sovev Emek), לא רשימה. התאריך
//     המדויק לא חשוף כטקסט סטטי (רק טיימר ספירה לאחור מבוסס-JS, ~47 ימים מהיום שנבדק
//     כלומר בסביבות 04.11.2026) — לא נוסף אוטומטית כדי לא לנחש תאריך; לבדוק ידנית מול המארגן.
//   - target-market.co.il (מרוץ הלילה של פתח תקווה) — עמוד שיווקי של מפיק האירוע, בלי תאריך
//     עתידי מפורסם בעמוד שנבדק. לא נוסף עד שיתפרסם תאריך רשמי.
//
// לפי רמת המעורבות הבינונית שנקבעה באפיון: זו רק טיוטת עדכון (מסמן isNew על אירועים
// חדשים), לא מתפרסם לבד — יש להריץ ולבדוק את src/data/races.json לפני build.
//
// הרצה: node scripts/update-races.mjs   (או: npm run update-races)
// הרצה מתוזמנת: GitHub Actions על cron, לאחר שהריפו יעלה לגיטהאב (ראו סעיף 3 באפיון).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "src", "data", "races.json");
const today = new Date().toISOString().slice(0, 10);

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// מרוצים ידועים שמופיעים בניסוחים שונים מהותית בין מקורות (שם ספונסר, "Winner",
// "הבינלאומי", תוספת "ישראל!" וכו') - לצורכי דה-דופליקציה בלבד, ממופים לכינוי אחיד
// לפני הנרמול הרגיל. נבדק ידנית מול הנתונים החיים (ראו השוואת 09/10, 23/10, 27/11).
const KNOWN_DUPLICATE_NAMES = [
  { test: /מרוץ הסרגל/, canonical: "מרוץ הסרגל" },
  { test: /הבוז.ולה/, canonical: "מרוץ הבוזולה" },
  { test: /מרתון.*מדברי.*אילת|מרתון.*אילת.*מדברי/, canonical: "מרתון מדברי אילת" },
  { test: /מרוץ אייל/, canonical: "מרוץ אייל רמת השרון" },
];

// לצורכי דה-דופליקציה בלבד: מסיר שנה (המקורות לא עקביים אם היא מופיעה בשם),
// כל תו שאינו אות/ספרה, ורווחים - כדי ששני שמות "אותו מרוץ" ממקורות שונים יתלכדו.
function normalizeName(name) {
  const known = KNOWN_DUPLICATE_NAMES.find((rule) => rule.test.test(name));
  const base = known ? known.canonical : name;
  return base
    .toLowerCase()
    .replace(/\b20(2[5-9]|3[0-5])\b/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .trim();
}

// ---------- השלמת אזור לפי שם המרוץ ----------
// מופעל רק כשהמקור לא סיפק אזור בעצמו (בעיקר runpanel). מיפוי ערים/יישובים ידועים
// לאזור, באותו אוצר מילים ש-realtiming.co.il עצמו משתמש בו (נבדק ישירות מהטבלה החיה).
// שם שלא מזוהה בוודאות סבירה נשאר ריק במתכוון — לא מנחשים אזור על עמוד שהדיוק בו קריטי.
const PLACE_TO_REGION = [
  { pattern: /קרית אתא|קריית אתא|נשר|חדרה|חיפה/, region: "חיפה והסביבה" },
  { pattern: /ירושלים/, region: "ירושלים והסביבה" },
  { pattern: /כפר סבא|נתניה|כוכב יאיר|צור יגאל|קיסריה|רמה"ש|רמת השרון/, region: "השרון" },
  { pattern: /תל אביב|יפו/, region: "תל אביב והסביבה" },
  { pattern: /אור יהודה|קריית אונו|קרית אונו|גני תקווה|סביון/, region: "בקעת אונו" },
  { pattern: /שדרות|נתיבות|דימונה|אילת|עוטף/, region: "דרום" },
  { pattern: /מצפה רמון|ערבה/, region: "הנגב והערבה" },
  { pattern: /טבריה|התבור|עמק המעיינות|עיר ועמק|כנרת/, region: "צפון" },
  { pattern: /חורפיש/, region: "הגליל" },
  { pattern: /ראש העין|באר יעקב|לוד(?!ז)|מזכרת בתיה/, region: "מרכז" },
];

function inferRegionFromName(name) {
  const hit = PLACE_TO_REGION.find((rule) => rule.pattern.test(name));
  return hit ? hit.region : "";
}

// ---------- מקור 1: realtiming.co.il (ישראל) ----------

const RUNNING_CATEGORIES = new Set(["ריצה", "ריצה עממית", "ריצה ודואתלון", "ריצה ואופניים", "צעדה"]);

function parseDdMmYyyy(str, yearDigits = 4) {
  const re = yearDigits === 2 ? /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/ : /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const m = str.trim().match(re);
  if (!m) return null;
  let [, dd, mm, yyyy] = m;
  if (yearDigits === 2) yyyy = `20${yyyy}`;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

async function fetchRealtiming() {
  const res = await fetch("https://www.realtiming.co.il/events");
  if (!res.ok) throw new Error(`realtiming.co.il responded ${res.status}`);
  const html = await res.text();

  const rowRe = /<tr class="events_list_row"[^>]*><td class="name"><a href="([^"]+)">([^<]+)<\/a><\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><td>([^<]*)<\/td><\/tr>/g;
  const events = [];
  let m;
  while ((m = rowRe.exec(html))) {
    const [, href, name, category, region, dateStr] = m;
    const date = parseDdMmYyyy(dateStr);
    if (!date || !RUNNING_CATEGORIES.has(category.trim())) continue;
    events.push({
      name: decodeEntities(name),
      region: decodeEntities(region),
      date,
      link: new URL(href, "https://www.realtiming.co.il").toString(),
      source: "realtiming.co.il",
    });
  }
  return events;
}

// ---------- מקור 2: runpanel.co.il (ישראל) ----------

// runpanel הוא המקור היחיד מבין מקורות ישראל שחושף מרחקי מקצים בטקסט חופשי אחרי שם
// המרוץ, לדוגמה: "מרוץ קרית אתא – 2, 5, 10 ק"מ." לפעמים יש קישור פרסומי נוסף אחרי שם
// המרוץ (למשל "למאמן אישי ותוכנית - לחצו פה") - הוא מוסר לפני חיפוש המרחקים כדי שלא
// יפריע להתאמה. נבדק ידנית מול עשרות שורות מהמקור החי (כולל מקרי קצה: רווח לפני
// הפסיק, "ק״מ" עם גרש כפול שונה, ופסקה בלי תגית <a> שממילא לא נתפסת ע"י ה-regex).
function extractDistanceLabel(tailHtml) {
  const withoutLinks = tailHtml.replace(/<a[^>]*>[\s\S]*?<\/a>/g, " ");
  const decoded = decodeEntities(withoutLinks.replace(/<[^>]+>/g, " "));
  const m = decoded.match(/[–-]\s*([\d][\d.,\s]*?)\s*ק["״]מ/);
  if (!m) return null;
  const nums = m[1].split(",").map((s) => s.trim()).filter(Boolean);
  if (!nums.length) return null;
  return `${nums.join(", ")} ק"מ`;
}

async function fetchRunpanel() {
  const res = await fetch("https://runpanel.co.il/run-races-list/", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`runpanel.co.il responded ${res.status}`);
  const html = await res.text();

  const DASH = "(?:–|-|&#8211;|&ndash;)";
  // ה-([\s\S]*?)</p> (במקום ([^<]*?)</p> הישן) מוכרח כדי לא לפספס בשקט שורות שיש בהן
  // קישור נוסף אחרי שם המרוץ (למשל "למאמן אישי ותוכנית - לחצו פה") - זה גרם לירידת
  // מרוצים אמיתיים (כמו מרתון חיפה) מהרשימה בלי אזהרה. אומת מול המקור החי. הקבוצה
  // הנוספת (tail) נשמרת כדי לשלוף ממנה את מרחקי המקצים.
  const rowRe = new RegExp(
    `<p><strong>(\\d{1,2})/(\\d{1,2})/(\\d{2})\\s*${DASH}\\s*</strong>\\s*<a href="([^"]+)"[^>]*>([^<]+)</a>([\\s\\S]*?)</p>`,
    "g"
  );
  const events = [];
  let m;
  while ((m = rowRe.exec(html))) {
    const [, dd, mm, yy, href, name, tail] = m;
    const date = parseDdMmYyyy(`${dd}/${mm}/${yy}`, 2);
    if (!date) continue;
    const decodedName = decodeEntities(name);
    events.push({
      name: decodedName,
      region: inferRegionFromName(decodedName),
      date,
      link: href,
      source: "runpanel.co.il",
      distanceLabel: extractDistanceLabel(tail),
    });
  }
  return events;
}

// ---------- מקור 3: marathonisrael.co.il (ישראל) ----------

async function fetchMarathonIsrael() {
  const res = await fetch("https://www.marathonisrael.co.il/event_location/israel/", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`marathonisrael.co.il responded ${res.status}`);
  const html = await res.text();

  // כל כרטיס אירוע: קישור+alt של תמונת הכיסוי (שם המרוץ) ואחריו <p class="blog_item__date">.
  const cardRe =
    /<div class="event_image">\s*<a href="([^"]+)"[^>]*>\s*<img[^>]*alt="([^"]+)"\/>\s*<\/a>\s*<div class="event_details[^"]*">[\s\S]*?<p class="blog_item__date">\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*<\/p>/g;
  const events = [];
  let m;
  while ((m = cardRe.exec(html))) {
    const [, href, name, dd, mm, yyyy] = m;
    const date = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    const decodedName = decodeEntities(name);
    events.push({
      name: decodedName,
      region: inferRegionFromName(decodedName),
      date,
      link: href,
      source: "marathonisrael.co.il",
    });
  }
  return events;
}

// ---------- מקור 4: 3plus.co.il (ישראל) ----------

const NON_RUNNING_KEYWORDS = /טריאתלון|דואתלון|SwimRun|Swim ?Run|שחייה/i;

async function fetchThreePlus() {
  const res = await fetch("https://www.3plus.co.il/", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`3plus.co.il responded ${res.status}`);
  const html = await res.text();

  // "thumbnail has-logo" בשימוש בכל כרטיסי המרוצים באתר (כולל ארכיון עבר) - מסננים
  // לפי תאריך עתידי בלבד למטה, ולפי מילות מפתח שאינן ריצה טהורה.
  const cardRe =
    /<a href="([^"]+)"\s*class="thumbnail has-logo">[\s\S]*?<h3 class="thumb-title">([^<]+)<\/h3>[\s\S]*?<span class="fomo[^"]*">(\d{1,2})\.(\d{1,2})\.(\d{4})<\/span>/g;
  const events = [];
  let m;
  while ((m = cardRe.exec(html))) {
    const [, href, name, dd, mm, yyyy] = m;
    const decodedName = decodeEntities(name);
    if (NON_RUNNING_KEYWORDS.test(decodedName)) continue;
    const date = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    events.push({
      name: decodedName,
      region: inferRegionFromName(decodedName),
      date,
      link: href,
      source: "3plus.co.il",
    });
  }
  return events.filter((e) => e.date >= today);
}

function mergeIsraelEvents(primary, secondary) {
  const seen = new Map();
  for (const e of primary) seen.set(`${e.date}|${normalizeName(e.name)}`, e);

  const linkKey = (url) => {
    try {
      const u = new URL(url);
      return `${u.hostname}${u.pathname}`.replace(/\/$/, "");
    } catch {
      return url;
    }
  };
  const linksSeen = new Map(primary.map((e) => [`${e.date}|${linkKey(e.link)}`, e]));

  const merged = [...primary];
  for (const e of secondary) {
    const nameKey = `${e.date}|${normalizeName(e.name)}`;
    const lKey = `${e.date}|${linkKey(e.link)}`;
    const existingByName = seen.get(nameKey);
    const existingByLink = linksSeen.get(lKey);
    const existing = existingByName ?? existingByLink;
    // כפילות של מרוץ שכבר קיים ממקור אחר: לא מוסיפים שורה נוספת, אבל אם המקור
    // השני (למשל runpanel) חושף מרחקי מקצים שהראשון לא סיפק, משלימים אותם
    // לרשומה הקיימת במקום לאבד את המידע.
    if (existing) {
      if (!existing.distanceLabel && e.distanceLabel) {
        existing.distanceLabel = e.distanceLabel;
      }
      continue;
    }
    seen.set(nameKey, e);
    linksSeen.set(lKey, e);
    merged.push(e);
  }
  return merged;
}

// ---------- מקור 3: AIMS World Running (בינלאומי, ICS) ----------

function unfoldIcs(text) {
  return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}

function icsUnescape(str) {
  return str.replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\n/gi, " ");
}

async function fetchAims() {
  const res = await fetch("https://aims-worldrunning.org/events.ics");
  if (!res.ok) throw new Error(`aims-worldrunning.org responded ${res.status}`);
  const raw = unfoldIcs(await res.text());

  const events = [];
  const blocks = raw.split("BEGIN:VEVENT").slice(1);
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`^${key}[^:]*:(.*)$`, "m"));
      return m ? m[1].trim() : null;
    };
    const summary = get("SUMMARY");
    const dtstart = get("DTSTART");
    const location = get("LOCATION");
    const url = get("URL");
    if (!summary || !dtstart) continue;
    if (!/marathon/i.test(summary)) continue; // מרתון / חצי מרתון בלבד
    const date = `${dtstart.slice(0, 4)}-${dtstart.slice(4, 6)}-${dtstart.slice(6, 8)}`;
    events.push({
      name: decodeEntities(icsUnescape(summary)),
      region: location ? decodeEntities(icsUnescape(location)) : "",
      date,
      link: url ? (url.startsWith("http") ? url : `https://${url}`) : null,
      source: "aims-worldrunning.org",
    });
  }
  const oneYearAhead = new Date();
  oneYearAhead.setFullYear(oneYearAhead.getFullYear() + 1);
  const oneYearAheadStr = oneYearAhead.toISOString().slice(0, 10);

  return events
    .filter((e) => e.date >= today && e.date <= oneYearAheadStr)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- מקור 4: UTMB World Series (טריילים בעולם) ----------

async function fetchUtmbSeries() {
  const res = await fetch("https://utmb.world/utmb-world-series-events", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`utmb.world responded ${res.status}`);
  const html = await res.text();

  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("utmb.world: __NEXT_DATA__ not found (page structure may have changed)");
  const data = JSON.parse(m[1]);
  const slice = data.props?.pageProps?.slices?.find((s) => s.type === "eventsWorldSeriesRaceList");
  const races = slice?.data?.searchRaceResultView?.races ?? [];

  return races.map((r) => {
    const distanceKm = r.details?.statsUp?.find((s) => s.name === "distance")?.value;
    return {
      name: r.name,
      region: r.startLocation ?? "",
      date: parseUtmbDate(r.startDate),
      link: r.slug ?? null,
      source: "utmb.world",
      distanceKm: distanceKm ?? null,
    };
  }).filter((e) => e.date);
}

function parseUtmbDate(str) {
  // "18th September 2026" -> 2026-09-18
  const m = str.match(/(\d{1,2})\w*\s+([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  const monthIdx = months.indexOf(m[2].toLowerCase());
  if (monthIdx === -1) return null;
  return `${m[3]}-${String(monthIdx + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

// ---------- קודי הנחה ידועים (סעיף 6 באפיון, טבלת המארגנים שנמסרה במיילים) ----------
// התאמה אוטומטית לפי שם המרוץ. אם מארגן מתחדש קוד משנה לשנה, יש לעדכן כאן ידנית.
const KNOWN_DISCOUNT_CODES = [
  { pattern: /מרוץ הסרגל/, code: "enduro26", organizer: "3plus" },
  { pattern: /אולטרה עוטף/, code: "enduro26", organizer: "3plus" },
  { pattern: /מרתון תל אביב/, code: "785859", organizer: "Kapaim Active" },
  { pattern: /מרוץ הלילה של תל אביב/, code: "348200", organizer: "Kapaim Active" },
  { pattern: /בשביל הבנים/, code: "480944", organizer: "Kapaim Active" },
  { pattern: /מרתון (ה)?ירושלים/, code: "f3a48", organizer: "מרתון ווינר ירושלים" },
  { pattern: /מרתון חיפה/, code: "HMRTN26", organizer: "Shvoong" },
  { pattern: /כפר סבא/, code: "KFRSB26", organizer: "Shvoong" },
  { pattern: /מרוץ מדבר(?!י)/, code: "DRMR26", organizer: "Shvoong" },
  { pattern: /עיר ועמק|עמק המעיינות/, code: "EMEK26", organizer: "Shvoong" },
  { pattern: /DMR|דימונה/, code: "dmr27_enduro", organizer: "DMR דימונה צ'לנג'" },
];

function matchKnownDiscountCode(name) {
  const hit = KNOWN_DISCOUNT_CODES.find((rule) => rule.pattern.test(name));
  return hit ? { code: hit.code, organizer: hit.organizer } : null;
}

// ---------- מיזוג + כתיבה ----------

function tagNewAndKeepAnnotations(fresh, existing) {
  const key = (e) => `${e.date}|${normalizeName(e.name)}`;
  const existingByKey = new Map(existing.map((e) => [key(e), e]));
  return fresh.map((e) => {
    const prev = existingByKey.get(key(e));
    const known = matchKnownDiscountCode(e.name);
    return {
      ...e,
      isNew: !prev,
      discountCode: prev?.discountCode ?? known?.code ?? null,
      discountOrganizer: prev?.discountOrganizer ?? known?.organizer ?? null,
    };
  });
}

async function loadExisting() {
  try {
    return JSON.parse(await fs.readFile(DATA_PATH, "utf-8"));
  } catch {
    return { israel: [], international: [], utmbSeries: [] };
  }
}

async function main() {
  const existing = await loadExisting();

  const results = await Promise.allSettled([
    fetchRealtiming(),
    fetchRunpanel(),
    fetchMarathonIsrael(),
    fetchThreePlus(),
    fetchAims(),
    fetchUtmbSeries(),
  ]);

  const [realtimingRes, runpanelRes, marathonIsraelRes, threePlusRes, aimsRes, utmbRes] = results;
  for (const [i, name] of ["realtiming", "runpanel", "marathonisrael", "3plus", "aims", "utmb"].entries()) {
    if (results[i].status === "rejected") {
      console.warn(`⚠️  מקור ${name} נכשל: ${results[i].reason.message}`);
    }
  }

  const realtimingEvents = realtimingRes.status === "fulfilled" ? realtimingRes.value : [];
  const runpanelEvents = runpanelRes.status === "fulfilled" ? runpanelRes.value : [];
  const marathonIsraelEvents = marathonIsraelRes.status === "fulfilled" ? marathonIsraelRes.value : [];
  const threePlusEvents = threePlusRes.status === "fulfilled" ? threePlusRes.value : [];

  let israelMerged = mergeIsraelEvents(realtimingEvents, runpanelEvents);
  israelMerged = mergeIsraelEvents(israelMerged, marathonIsraelEvents);
  israelMerged = mergeIsraelEvents(israelMerged, threePlusEvents);
  israelMerged = israelMerged.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  const international = aimsRes.status === "fulfilled" ? aimsRes.value : [];
  const utmbSeries = utmbRes.status === "fulfilled" ? utmbRes.value : [];

  const israel = tagNewAndKeepAnnotations(israelMerged, existing.israel ?? []);
  const internationalTagged = tagNewAndKeepAnnotations(international, existing.international ?? []);
  const utmbTagged = tagNewAndKeepAnnotations(utmbSeries, existing.utmbSeries ?? []);

  const output = {
    generatedAt: new Date().toISOString(),
    sources: {
      israel: ["realtiming.co.il", "runpanel.co.il", "marathonisrael.co.il", "3plus.co.il"],
      international: ["aims-worldrunning.org"],
      utmbSeries: ["utmb.world"],
    },
    israel,
    international: internationalTagged,
    utmbSeries: utmbTagged,
  };

  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(output, null, 2) + "\n", "utf-8");

  const newCount = (arr) => arr.filter((e) => e.isNew).length;
  console.log(
    `לוח תחרויות עודכן: ${israel.length} בישראל (${newCount(israel)} חדשים), ` +
    `${internationalTagged.length} בעולם (${newCount(internationalTagged)} חדשים), ` +
    `${utmbTagged.length} UTMB (${newCount(utmbTagged)} חדשים).`
  );
}

main().catch((err) => {
  console.error("סוכן לוח התחרויות נכשל:", err);
  process.exitCode = 1;
});
