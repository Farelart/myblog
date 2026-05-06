import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { articles, getArticle, formatDate } from "@/lib/articles";

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
    title: `${article.title} – Farel Ganlaky`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className="px-6 pb-20 pt-8 text-[15px] sm:px-10 lg:px-16 lg:pt-10">
      <div className="mx-auto max-w-[760px]">

        {/* ── Header ── */}
        <header className="mb-14 flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-[-0.02em]"
          >
            Farel Ganlaky
          </Link>
          <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <Link
              href="/articles"
              className="relative text-[var(--accent)]"
            >
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

        {/* ── Back link ── */}
        <Link
          href="/articles"
          className="mb-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
          All Articles
        </Link>

        {/* ── Article header ── */}
        <div className="mb-10 border-b border-[var(--border)] pb-10">
          <time
            dateTime={article.date}
            className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
          >
            {formatDate(article.date)}
          </time>
          <h1 className="mt-3 text-[32px] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--foreground)] sm:text-[38px]">
            {article.title}
          </h1>
          <p className="mt-4 text-[18px] leading-[1.65] text-[var(--muted)]">
            {article.excerpt}
          </p>
        </div>

        {/* ── Article body ── */}
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </div>
    </main>
  );
}
