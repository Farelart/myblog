import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import { articles, getArticle, formatDate } from "@/lib/articles";
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
  return {
    title: `${article.title} - Farel Ganlaky`,
    description: article.excerpt,
  };
}

function ArticleNewsletter() {
  return (
    <section className="article-newsletter">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Stay up to date</span>
      </div>
      <p className="mt-4 text-[14px] text-[var(--muted)]">
        Get notified when I publish something new.
      </p>
      <form className="mt-5 flex gap-2">
        <input
          id="article-newsletter-email"
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="h-[42px] min-w-0 flex-1 rounded-md border border-[rgba(41,37,36,0.14)] bg-transparent px-3 text-[14px] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />
        <button
          type="submit"
          className="h-[42px] rounded-md bg-[#171820] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-85"
        >
          Join
        </button>
      </form>
    </section>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const isTextSearchArticle = slug === "from-keywords-to-meaning-text-search";

  return (
    <main className="px-6 pb-14 pt-8 text-[15px] sm:px-10 lg:px-16 lg:pt-10">
      <div className="mx-auto max-w-[1120px]">
        <header className="article-page-inner mb-14 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-[-0.02em]"
          >
            Farel Ganlaky
          </Link>
          <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <Link href="/articles" className="relative text-[var(--accent)]">
              Articles
              <span className="absolute -top-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
            </Link>
            <div className="relative hidden sm:block">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="h-8 w-[152px] rounded-md border border-[var(--border)] bg-transparent px-3 pr-14 text-[11px] tracking-[0.04em] normal-case text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] px-1.5 py-0.5 text-[9px] tracking-[0.16em] text-[var(--muted)]">
                Ctrl K
              </span>
            </div>
          </div>
        </header>

        <div className="article-page-inner mb-7">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
            All Articles
          </Link>
        </div>

        <div className="article-page-inner mb-7">
          <time
            dateTime={article.date}
            className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
          >
            {formatDate(article.date)}
          </time>
          <h1 className="mt-3 text-[32px] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--foreground)] sm:text-[38px]">
            {article.title}
          </h1>
          <p className="mt-3 text-[18px] leading-[1.55] text-[var(--muted)]">
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
          <ArticleNewsletter />
        </div>
      </div>
    </main>
  );
}
