import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { GiGuitar, GiPianoKeys, GiSaxophone } from "react-icons/gi";
import { articles, formatDate } from "@/lib/articles";
import NewsletterSignup from "@/components/NewsletterSignup";

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
            <div className="bio-copy space-y-5 text-[18px] leading-[1.6] tracking-[-0.02em] text-[var(--foreground)]">
              <p>
                I&apos;m Farel Ganlaky, an AI engineer based in Benin{" "}
                <span
                  aria-label="Benin flag"
                  className="inline-flex h-[0.78em] w-[1.15em] overflow-hidden rounded-[2px] border border-black/15 align-[-0.08em] shadow-[0_1px_2px_rgba(41,37,36,0.08)]"
                  title="Benin"
                >
                  <span className="h-full w-[40%] bg-[#008751]" />
                  <span className="flex h-full flex-1 flex-col">
                    <span className="flex-1 bg-[#fcd116]" />
                    <span className="flex-1 bg-[#e8112d]" />
                  </span>
                </span>
                . I work at{" "}
                <a
                  href="https://tamebi.ai/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tamebi AI
                </a>
                , building{" "}
                <span className="bio-highlight">
                  conversational agentic search
                </span>{" "}
                for ecommerce through{" "}
                <a
                  href="https://qualiwo.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Qualiwo
                </a>
                .
              </p>
              <p>
                I also work on{" "}
                <span className="bio-highlight">LLM inference</span>
                : standardizing inference workflows and helping companies adopt{" "}
                open-source models when privacy matters. More of this work lives at{" "}
                <a
                  href="https://lab.tamebi.ai/"
                  target="_blank"
                  rel="noreferrer"
                >
                  lab.tamebi.ai
                </a>
                .
              </p>
              <p>
                Before this, I spent eight years studying and working in Morocco{" "}
                <span
                  aria-label="Morocco flag"
                  className="relative ml-1 inline-flex h-[0.95em] w-[1.4em] items-center justify-center rounded-[2px] border border-black/15 bg-[#c1272d] text-[0.62em] leading-none text-[#006233] align-[-0.12em] shadow-[0_1px_2px_rgba(41,37,36,0.08)]"
                  title="Morocco"
                >
                  ★
                </span>
                . Day to day, I build systems, read papers on{" "}
                <span className="bio-highlight">
                  search, memory, continual learning, and compression
                </span>
                , and stay close to my lifelong passion:{" "}
                <span className="bio-highlight">musical instruments</span>
                <span
                  aria-label="Piano, guitar, and saxophone"
                  className="ml-1.5 inline-flex flex-row items-center gap-1 align-[-0.12em] text-[var(--muted)]"
                >
                  <GiPianoKeys aria-hidden="true" className="h-[1em] w-[1em]" />
                  <GiGuitar aria-hidden="true" className="h-[1em] w-[1em]" />
                  <GiSaxophone aria-hidden="true" className="h-[1em] w-[1em]" />
                </span>
                .
              </p>
            </div>
          </div>

          <aside className="w-full lg:max-w-[220px] lg:pt-2">
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

            <div className="mt-6 space-y-3 text-[14px] text-[var(--muted)]">
              <a
                href="https://www.linkedin.com/in/farel-ganlaky-395293252/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/farelmanifold"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaXTwitter className="h-4 w-4" aria-hidden="true" />
                <span>X</span>
              </a>
              <a
                href="https://github.com/Farelart"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[var(--foreground)]"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:farelganlaky@gmail.com"
                className="flex items-center gap-3 text-[14px] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                <span>farelganlaky@gmail.com</span>
              </a>
            </div>
          </aside>
        </section>

        {/* ── Recent Articles ── */}
        <section className="mt-14 sm:mt-18">
          <div className="space-y-0 divide-y divide-[var(--border)]">
            {recent.map((article, i) => (
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
          <div className="mt-4 border-t border-[var(--border)] pt-6">
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
        <NewsletterSignup className="mt-12" source="home" />

        {/* ── Footer ── */}
        <footer className="footer-rule mt-14 flex flex-col gap-5 pt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Farel Ganlaky</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Building...</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[13px] normal-case tracking-normal text-[var(--muted)]">
            <a
              href="https://www.linkedin.com/in/farel-ganlaky-395293252/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/farelmanifold"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaXTwitter className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Farelart"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:farelganlaky@gmail.com"
              aria-label="Email"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              <FaEnvelope className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}
