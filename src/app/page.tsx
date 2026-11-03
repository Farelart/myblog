import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { GiGuitar, GiPianoKeys, GiSaxophone } from "react-icons/gi";

export default function Home() {
  return (
    <main className="page-shell px-6 pb-10 pt-8 text-[15px] sm:px-10 lg:px-16 lg:pt-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-190 flex-col">

        {/* ── Header ── */}
        <header className="mb-14 flex items-center gap-6">
          <Link
            href="/"
            className="text-[18px] font-semibold tracking-[-0.02em]"
          >
            Farel Ganlaky
          </Link>
        </header>

        {/* ── Bio + Photo ── */}
        <section className="flex flex-1 flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="max-w-[470px] flex-1">
            <div className="bio-copy space-y-4 text-[16px] leading-[1.65] tracking-[-0.02em] text-foreground">
              <p>
                Hi, I&apos;m Farel. I&apos;m an AI engineer at{" "}
                <a href="https://tamebi.ai/" target="_blank" rel="noreferrer">
                  Tamebi AI
                </a>
                , where I work on{" "}
                <span className="bio-highlight">enterprise search</span>, getting
                AI to find the right answer in everything a company knows, and{" "}
                <span className="bio-highlight">LLM inference</span>, making
                open-source models run fast, reliably and affordably on real
                hardware.
              </p>
              <p>
                When I&apos;m not building, I&apos;m reading papers on{" "}
                <span className="bio-highlight">
                  agentic retrieval, memory and continual learning
                </span>
                , or playing the piano, the guitar or the saxophone
                <span
                  aria-label="Piano, guitar, and saxophone"
                  className="ml-1.5 inline-flex flex-row items-center gap-1 align-[-0.12em] text-(--muted)"
                >
                  <GiPianoKeys aria-hidden="true" className="h-[1em] w-[1em]" />
                  <GiGuitar aria-hidden="true" className="h-[1em] w-[1em]" />
                  <GiSaxophone aria-hidden="true" className="h-[1em] w-[1em]" />
                </span>
                .
              </p>
            </div>
          </div>

          <aside className="w-full lg:max-w-55 lg:pt-2">
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

            <div className="mt-6 space-y-3 text-[14px] text-(--muted)">
              <a
                href="https://www.linkedin.com/in/farel-ganlaky-395293252/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Farelart"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:farelganlaky@gmail.com"
                className="flex items-center gap-3 text-[14px] text-(--muted) transition-colors hover:text-foreground"
              >
                <FaEnvelope className="h-4 w-4" aria-hidden="true" />
                <span>farelganlaky@gmail.com</span>
              </a>
              <a
                href="https://x.com/farelmanifold"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <FaXTwitter className="h-4 w-4" aria-hidden="true" />
                <span>X</span>
              </a>
            </div>
          </aside>
        </section>

        {/* ── Footer ── */}
        <footer className="footer-rule mt-14 flex flex-col gap-5 pt-6 text-[11px] uppercase tracking-[0.2em] text-(--muted) sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Farel Ganlaky</span>
            <span className="text-(--accent)">•</span>
            <span>Building...</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[13px] normal-case tracking-normal text-(--muted)">
            <a
              href="https://www.linkedin.com/in/farel-ganlaky-395293252/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-foreground"
            >
              <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/Farelart"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:farelganlaky@gmail.com"
              aria-label="Email"
              className="transition-colors hover:text-foreground"
            >
              <FaEnvelope className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/farelmanifold"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-foreground"
            >
              <FaXTwitter className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}
