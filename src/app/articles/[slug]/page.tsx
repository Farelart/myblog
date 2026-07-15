import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { articles, getArticle, formatDate } from "@/lib/articles";
import NewsletterSignup from "@/components/NewsletterSignup";
import TextSearchArticleReader from "./TextSearchArticleReader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const title = `${article.title} - Farel Ganlaky`;

  return {
    title,
    description: article.excerpt,
    openGraph: {
      title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const isTextSearchArticle = slug === "from-keywords-to-meaning-text-search";

  return (
    <main className="px-6 pb-14 pt-8 text-[15px] sm:px-10 lg:px-16 lg:pt-10">
      <div className="mx-auto max-w-280">
        <header className="article-page-inner mb-14 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-[-0.02em]"
          >
            Farel Ganlaky
          </Link>
          <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)">
            <Link href="/articles" className="relative text-(--accent)">
              Articles
              <span className="absolute -top-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-(--accent)" />
            </Link>
            <div className="relative hidden sm:block">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="h-8 w-38 rounded-md border border-(--border) bg-transparent px-3 pr-14 text-[11px] tracking-[0.04em] normal-case text-foreground outline-none transition-colors placeholder:text-(--muted) focus:border-(--accent)"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-(--border) px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-(--muted)">
                Ctrl K
              </span>
            </div>
          </div>
        </header>

        <div className="article-page-inner mb-7">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted) transition-colors hover:text-foreground"
          >
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
            All Articles
          </Link>
        </div>

        <div className="article-page-inner mb-7">
          <time
            dateTime={article.date}
            className="block text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)"
          >
            {formatDate(article.date)}
          </time>
          <h1 className="mt-3 text-[32px] font-semibold leading-[1.25] tracking-[-0.03em] text-foreground sm:text-[38px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[18px] leading-[1.55] text-(--muted)">
            {article.excerpt}
          </p>
        </div>

        {isTextSearchArticle ? (
          <TextSearchArticleReader content={article.content} />
        ) : (
          <div className="article-page-inner">
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        )}

        <div className="article-page-inner">
          <NewsletterSignup className="article-newsletter" source="article" />
        </div>
      </div>
    </main>
  );
}
