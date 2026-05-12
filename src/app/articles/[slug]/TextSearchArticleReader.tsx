"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import DetailSearchAnimation, {
  hasDetailSearchAnimation,
} from "./DetailSearchAnimation";
import IntroMismatchIllustration from "./IntroMismatchIllustration";
import SectionSearchAnimation, {
  hasSectionSearchAnimation,
} from "./SectionSearchAnimation";
import TextSearchIllustration from "./TextSearchIllustration";

const INTRO_MISMATCH_MARKER = "<!-- intro-mismatch-illustration -->";
const SECTION_HEADING_PATTERN = /<h2>(\d+)\.\s*([\s\S]*?)<\/h2>/g;
const INLINE_CONTENT_PATTERN =
  /<!-- intro-mismatch-illustration -->|<!-- detail-animation-(\d+) -->/g;

type ArticleSection = {
  bodyHtml: string;
  id: string;
  number: number;
  title: string;
};

type ParsedArticle = {
  introHtml: string;
  sections: ArticleSection[];
};

type TextSearchArticleReaderProps = {
  content: string;
};

export default function TextSearchArticleReader({
  content,
}: TextSearchArticleReaderProps) {
  const { introHtml, sections } = useMemo(() => parseArticle(content), [content]);
  const [closedSections, setClosedSections] = useState<Record<number, boolean>>({});

  function toggleSection(sectionNumber: number) {
    setClosedSections((current) => ({
      ...current,
      [sectionNumber]: !current[sectionNumber],
    }));
  }

  function openSection(sectionNumber: number) {
    setClosedSections((current) => ({
      ...current,
      [sectionNumber]: false,
    }));
  }

  return (
    <div className="text-search-reader">
      <aside aria-label="Article outline" className="article-outline">
        <div className="article-outline-inner">
          <p>Outline</p>
          <nav>
            {sections.map((section) => (
              <a
                className="article-outline-link"
                href={`#${section.id}`}
                key={section.id}
                onClick={() => openSection(section.number)}
              >
                <span>{section.number}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <article className="text-search-reader-main">
        <TextSearchIllustration />
        {renderInlineContent(introHtml, "intro")}
        {sections.map((section) => {
          const isClosed = Boolean(closedSections[section.number]);

          return (
            <section className="article-collapsible-section" key={section.id}>
              <div className="article-section-heading" id={section.id}>
                <button
                  aria-controls={`${section.id}-body`}
                  aria-expanded={!isClosed}
                  aria-label={`${isClosed ? "Open" : "Close"} ${section.title}`}
                  className={`article-section-toggle ${isClosed ? "" : "is-open"}`}
                  onClick={() => toggleSection(section.number)}
                  type="button"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
                <h2>
                  {section.number}. {section.title}
                </h2>
              </div>

              <div hidden={isClosed} id={`${section.id}-body`}>
                {hasSectionSearchAnimation(section.number) && (
                  <SectionSearchAnimation section={section.number} />
                )}
                {renderInlineContent(section.bodyHtml, section.id)}
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
}

function parseArticle(content: string): ParsedArticle {
  const sections: ArticleSection[] = [];
  const matches = [...content.matchAll(SECTION_HEADING_PATTERN)];

  if (matches.length === 0) {
    return { introHtml: content, sections };
  }

  const introHtml = content.slice(0, matches[0].index);

  matches.forEach((match, index) => {
    const [headingHtml, sectionNumber, titleHtml] = match;
    const headingIndex = match.index ?? 0;
    const bodyStart = headingIndex + headingHtml.length;
    const nextMatch = matches[index + 1];
    const bodyEnd = nextMatch?.index ?? content.length;
    const number = Number(sectionNumber);
    const title = cleanTitle(titleHtml);

    sections.push({
      bodyHtml: content.slice(bodyStart, bodyEnd),
      id: `section-${number}`,
      number,
      title,
    });
  });

  return { introHtml, sections };
}

function renderInlineContent(html: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  INLINE_CONTENT_PATTERN.lastIndex = 0;

  while ((match = INLINE_CONTENT_PATTERN.exec(html)) !== null) {
    const [matchedText, detailSectionNumber] = match;
    const before = html.slice(cursor, match.index);
    const beforeNode = renderArticleHtml(before, `${keyPrefix}-html-${cursor}`);

    if (beforeNode) nodes.push(beforeNode);

    if (matchedText === INTRO_MISMATCH_MARKER) {
      nodes.push(<IntroMismatchIllustration key={`${keyPrefix}-intro-mismatch`} />);
    } else if (detailSectionNumber) {
      const section = Number(detailSectionNumber);

      if (hasDetailSearchAnimation(section)) {
        nodes.push(
          <DetailSearchAnimation
            key={`${keyPrefix}-detail-animation-${section}`}
            section={section}
          />,
        );
      }
    }

    cursor = match.index + matchedText.length;
  }

  const restNode = renderArticleHtml(html.slice(cursor), `${keyPrefix}-html-${cursor}`);
  if (restNode) nodes.push(restNode);

  return nodes;
}

function renderArticleHtml(html: string, key: string) {
  if (!html.trim()) return null;

  return (
    <div
      className="prose-article"
      dangerouslySetInnerHTML={{ __html: html }}
      key={key}
    />
  );
}

function cleanTitle(titleHtml: string) {
  return titleHtml
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
