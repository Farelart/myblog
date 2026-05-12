import Link from "next/link";
import { articles, formatDate } from "@/lib/articles";

export const metadata = {
  title: "Articles – Farel Ganlaky",
  description: "Writing on software, AI, and the systems we build around them.",
};

export default function ArticlesPage() {
  return (
    <main className="px-6 pb-10 pt-8 sm:px-10 lg:px-16 lg:pt-10">
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

        {/* ── Title ── */}
        <section className="mb-9 max-w-[560px]">
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            Articles
          </h1>
          <p className="mt-3 text-[17px] leading-7 text-[var(--muted)]">
            Writing on software, AI, and the systems we build around them.
          </p>
        </section>

        {/* ── Article List ── */}
        <div className="divide-y divide-[var(--border)]">
          {articles.map((article, i) => (
            <article key={article.slug} className="py-7 first:pt-0">
              <time
                dateTime={article.date}
                className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
              >
                {formatDate(article.date)}
              </time>
              <h2
                className={`mt-3 text-[22px] font-semibold tracking-[-0.025em] ${
                  i === 0
                    ? "text-[var(--accent)]"
                    : "text-[var(--foreground)]"
                }`}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="hover:underline underline-offset-4 decoration-[var(--accent-decoration)]"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[var(--muted)]">
                {article.excerpt}
              </p>
              <Link
                href={`/articles/${article.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent)] transition-opacity hover:opacity-70"
              >
                Read Article
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
