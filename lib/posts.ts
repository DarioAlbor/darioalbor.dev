import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/content/i18n";

const postsDir = (locale: Locale) => path.join(process.cwd(), "content", "posts", locale);

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
};

function readPost(locale: Locale, file: string) {
  const raw = fs.readFileSync(path.join(postsDir(locale), file), "utf8");
  const { data, content } = matter(raw);
  const post: Post = {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft),
  };
  return { post, content };
}

const showDrafts = process.env.NODE_ENV !== "production";

export function getPosts(locale: Locale): Post[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPost(locale, f).post)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(locale: Locale, slug: string) {
  const { post, content } = readPost(locale, `${slug}.md`);
  return { ...post, html: await marked.parse(content) };
}
