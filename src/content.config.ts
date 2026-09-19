// מבנה תוכן — תואם למבנה הקבצים שהוגדר בסעיף 3 באפיון (/content/training-plans, /content/groups, /content/blog...).
// שדות ה-SEO (title/description/focusKeyword) תואמים לעמודות ב-decisions/enduro-content-audit.csv
// כדי שנוכל להזין אותם ישירות מהנתונים שכבר נאספו מה-XML של וורדפרס.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoFields = {
  title: z.string(),
  description: z.string(),
  focusKeyword: z.string().optional(),
  ogImage: z.string().optional(),
  draft: z.boolean().default(false),
};

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({ ...seoFields }),
});

// תוכניות האימון (5 עמודים) מנוהלות כנתון מובנה ב-src/data/training-plans.ts ולא כקולקציה,
// כי חלקים מרכזיים בעמוד (שלבים, FAQ, קדם-דרישה) הם נתונים מובנים ולא פרוזה חופשית.

const groups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/groups" }),
  schema: z.object({ ...seoFields }),
});

const kidsCoaching = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/kids-coaching" }),
  schema: z.object({ ...seoFields, city: z.string().optional() }),
});

const personalCoaching = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/personal-coaching" }),
  schema: z.object({ ...seoFields, city: z.string().optional() }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({ ...seoFields, publishDate: z.coerce.date() }),
});

export const collections = {
  pages,
  groups,
  kidsCoaching,
  personalCoaching,
  blog,
};
