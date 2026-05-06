import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { articles, formatDate } from "@/lib/articles";

const RECENT_COUNT = 3;

export default function Home() {
  const recent = articles.slice(0, RECENT_COUNT);

  return (
    <main className="page-shell px-6 pb-10 pt-8 text-[15px] sm:px-10 lg:px-16 lg:pt-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[760px] flex-col">

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
              className="transition-colors hover:text-[var(--foreground)]"
            >
              Articles
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

        {/* ── Bio + Photo ── */}
        <section className="flex flex-1 flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="max-w-[470px] flex-1">
            <h1 className="mb-10 text-[18px] font-semibold tracking-[-0.02em] lg:hidden">
              Farel Ganlaky
            </h1>
            <div className="space-y-8 text-[18px] leading-[1.65] tracking-[-0.02em] text-[var(--foreground)]">
              <p>
                I&apos;m the founder and CEO of{" "}
                <a
                  href="https://agno.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] underline decoration-[rgba(163,58,50,0.35)] underline-offset-3"
                >
                  Agno
                </a>
                , a technology company building large scale multi-agent systems.
              </p>
              <p>
                A software engineer by trade, I&apos;ve been building software,
                ML and data infrastructure for over 15 years. My career includes
                stints at Airbnb, Facebook, Instagram and Cisco, where I built
                systems for solving the toughest technical problems.
              </p>
              <p>
                Today, I partner with the top companies to launch AI products
                that push boundaries, whether it&apos;s multi-agent systems,
                advanced research programs, or workflows powered by language
                models.
              </p>
            </div>
          </div>

          <aside className="w-full max-w-[220px] lg:pt-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-md border border-black/5 bg-[#e9e3dc]">
              <Image
                src="/farel.jpg"
                alt="Portrait"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 220px"
              />
            </div>

            <div className="mt-8 space-y-4 text-[14px] text-[var(--muted)]">
              <a
                href="https://x.com/ashpreetbedi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaXTwitter className="h-4 w-4" aria-hidden="true" />
                <span>X</span>
              </a>
              <a
                href="https://github.com/agno-agi/agno"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ashpreetbedi/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:hi@farelganlaky.com"
                className="flex items-center gap-3 text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                <span>hi@farelganlaky.com</span>
              </a>
            </div>
          </aside>
        </section>

        {/* ── Recent Articles ── */}
        <section className="mt-20 sm:mt-28">
          <div className="space-y-0 divide-y divide-[var(--border)]">
            {recent.map((article, i) => (
              <article key={article.slug} className="py-10 first:pt-0">
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
                    className="hover:underline underline-offset-4 decoration-[rgba(163,58,50,0.4)]"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[16px] leading-[1.7] text-[var(--muted)]">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent)] transition-opacity hover:opacity-70"
                >
                  Read Article
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>

          {/* All Writing link */}
          <div className="mt-6 border-t border-[var(--border)] pt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              All Writing
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="mt-16 rounded-lg border border-[var(--border)] p-8 sm:p-10">
          <div className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Stay up to date</span>
          </div>
          <p className="mt-3 text-[15px] text-[var(--muted)]">
            Get notified when I publish something new.
          </p>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              id="newsletter-email"
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              required
              className="h-11 flex-1 rounded-md border border-[var(--border)] bg-transparent px-4 text-[14px] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              className="h-11 rounded-md bg-[var(--foreground)] px-6 text-[13px] font-medium text-[var(--background)] transition-opacity hover:opacity-80"
            >
              Join
            </button>
          </form>
        </section>

        {/* ── Footer ── */}
        <footer className="footer-rule mt-20 flex flex-col gap-6 pt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Farel Ganlaky</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Building...</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[13px] normal-case tracking-normal text-[var(--muted)]">
            <a
              href="mailto:hi@farelganlaky.com"
              aria-label="Email"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaEnvelope className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/ashpreetbedi"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaXTwitter className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/agno-agi/agno"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/ashpreetbedi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}
