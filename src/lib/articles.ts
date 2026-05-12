import { fromKeywordsToMeaningTextSearch } from "@/content/articles/from-keywords-to-meaning-text-search";

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export const articles: Article[] = [fromKeywordsToMeaningTextSearch];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}
