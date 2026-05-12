"use client";

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type ModeId =
  | "exact"
  | "fulltext"
  | "fuzzy"
  | "filters"
  | "vector"
  | "hybrid"
  | "rerank";

type Mode = {
  id: ModeId;
  label: string;
  query: string;
  badge: string;
  note: string;
};

const modes: Mode[] = [
  {
    id: "exact",
    label: "Exact keyword",
    query: "shoes for rainy days",
    badge: "Literal match",
    note: "Exact keyword search checks whether the words appear as written. It is great for IDs and known items, but it misses products when the catalog uses different words.",
  },
  {
    id: "fulltext",
    label: "Full-text",
    query: "running shoes for rain",
    badge: "Lexical ranking",
    note: "Full-text search analyzes documents into terms, keeps a lexical index, then ranks matches with signals like term rarity, field boosts, and BM25.",
  },
  {
    id: "fuzzy",
    label: "Fuzzy",
    query: "nik waterproof shooes",
    badge: "Typo tolerance",
    note: "Fuzzy search repairs spelling distance. It fixes approximate words, but it does not understand intent, so it needs tight limits around brands, SKUs, and short terms.",
  },
  {
    id: "filters",
    label: "Filters",
    query: "waterproof shoes under $120 size 42",
    badge: "Structured constraint",
    note: "Filters enforce facts before ranking. Price, size, stock, location, and availability should be treated as constraints, not as vibes.",
  },
  {
    id: "vector",
    label: "Vector",
    query: "shoes that will not get soaked",
    badge: "Geometry of meaning",
    note: "Vector search is one common way to implement semantic retrieval: embed the query and catalog, then compare them with cosine similarity or another distance metric.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    query: "waterproof Nike trail shoes under $120",
    badge: "Practical default",
    note: "Hybrid search mixes lexical precision, semantic recall, and structured filters. It is often the production answer because real queries contain all three.",
  },
  {
    id: "rerank",
    label: "Rerank",
    query: "best shoe for wet city walks",
    badge: "Careful ordering",
    note: "A reranker is a second pass. It reads a smaller candidate set more carefully and reorders it with a more expensive relevance model.",
  },
];

export default function TextSearchIllustration() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modes[activeIndex];

  return (
    <section
      aria-label="Interactive map of text search techniques"
      className="article-animation article-animation-search-modes search-lab"
    >
      <div className="search-lab-heading">
        <div>
          <p>Search map</p>
          <h3>One problem, different tools</h3>
        </div>
        <span>
          {activeIndex + 1} / {modes.length}
        </span>
      </div>

      <div aria-label="Search technique tabs" className="search-lab-tabs">
        {modes.map((mode, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              aria-pressed={isActive}
              className={`search-lab-tab ${isActive ? "is-active" : ""}`}
              key={mode.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{mode.label}</strong>
            </button>
          );
        })}
      </div>

      <div className={`search-lab-stage search-lab-stage-${active.id}`}>
        <div className="search-lab-query-card">
          <span className="search-lab-query-icon">
            <FaMagnifyingGlass aria-hidden="true" />
          </span>
          <span className="search-lab-query-text">{active.query}</span>
          <span className="search-lab-query-badge">{active.badge}</span>
        </div>

        <div className="search-lab-scene">{renderLayerVisual(active.id)}</div>
      </div>

      <p className="search-lab-note">
        <strong>{active.badge}</strong>
        {active.note}
      </p>
    </section>
  );
}

function renderLayerVisual(id: ModeId) {
  switch (id) {
    case "exact":
      return <ExactKeywordVisual />;
    case "fulltext":
      return <FullTextVisual />;
    case "fuzzy":
      return <FuzzyVisual />;
    case "filters":
      return <FilterVisual />;
    case "vector":
      return <VectorVisual />;
    case "hybrid":
      return <HybridVisual />;
    case "rerank":
      return <RerankVisual />;
  }
}

function ExactKeywordVisual() {
  return (
    <div className="search-lab-exact">
      <div className="literal-token-board" aria-label="Query tokens">
        <span>shoes</span>
        <span>rainy</span>
        <span>days</span>
      </div>

      <div className="literal-result-shelf">
        <article className="literal-product is-found">
          <small>literal token found</small>
          <strong>Trail shoes</strong>
          <p>
            Lightweight trail <mark>shoes</mark> with storm-ready traction.
          </p>
        </article>

        <article className="literal-product is-missed">
          <small>good product, wrong words</small>
          <strong>Waterproof sneakers</strong>
          <p>Sealed mesh upper, dry feet, grippy sole.</p>
        </article>

        <article className="literal-product is-missed">
          <small>good product, wrong words</small>
          <strong>Water-resistant trainers</strong>
          <p>Built for wet pavement and everyday walking.</p>
        </article>
      </div>
    </div>
  );
}

function FullTextVisual() {
  return (
    <div className="search-lab-fulltext">
      <div className="analyzer-strip">
        <TextChip title="Raw text" value="Running shoes for rain" />
        <span className="search-lab-arrow">{"->"}</span>
        <TextChip title="Analyzer" value="running | shoe | rain" />
      </div>

      <div className="fulltext-workbench">
        <div className="mini-index">
          <span className="mini-title">term index</span>
          <IndexRow postings="P03 P12 P44" term="rain" />
          <IndexRow postings="P03 P19 P33" term="shoe" />
          <IndexRow postings="P03 P51" term="running" />
        </div>

        <div className="lexical-scoreboard">
          <span className="mini-title">lexical rank</span>
          <MetricBar label="Waterproof running shoes" value="94%" />
          <MetricBar label="Running shoe guide" value="66%" />
          <MetricBar label="Rain jacket" value="38%" />
        </div>
      </div>
    </div>
  );
}

function FuzzyVisual() {
  return (
    <div className="search-lab-fuzzy">
      <CorrectionRow
        after={["n", "i", "k", "e"]}
        before={["n", "i", "k"]}
        operation="+ e"
        wordAfter="nike"
        wordBefore="nik"
      />
      <CorrectionRow
        after={["s", "h", "o", "e", "s"]}
        before={["s", "h", "o", "o", "e", "s"]}
        operation="- o"
        wordAfter="shoes"
        wordBefore="shooes"
      />
      <CorrectionRow
        after={["w", "a", "t", "e", "r", "p", "r", "o", "o", "f"]}
        before={["w", "a", "t", "e", "r", "p", "r", "o", "f"]}
        operation="+ o"
        wordAfter="waterproof"
        wordBefore="waterprof"
      />
    </div>
  );
}

function FilterVisual() {
  const gates = [
    ["all candidates", "2,400"],
    ["waterproof = true", "420"],
    ["size = 42", "86"],
    ["price <= $120", "31"],
    ["in stock", "18"],
  ];

  return (
    <div className="search-lab-filter">
      {gates.map(([label, count], index) => (
        <div className={`filter-gate gate-${index}`} key={label}>
          <span>{label}</span>
          <strong>{count}</strong>
        </div>
      ))}
      <div className="filter-final">
        <small>rank only these</small>
        <strong>18 products</strong>
      </div>
    </div>
  );
}

function VectorVisual() {
  return (
    <div className="search-lab-vector">
      <div className="embedding-card">
        <small>embed query</small>
        <strong>shoes that will not get soaked</strong>
        <code>[0.21, -0.18, 0.64, ...]</code>
      </div>

      <div className="vector-plane">
        <span className="vector-axis x-axis" />
        <span className="vector-axis y-axis" />
        <span className="vector-dot query">query</span>
        <span className="vector-dot near">waterproof sneakers</span>
        <span className="vector-dot mid">trail shoes</span>
        <span className="vector-dot far">umbrella</span>
      </div>

      <div className="vector-scores">
        <span className="mini-title">cosine similarity</span>
        <MetricBar label="waterproof sneakers" value="91%" />
        <MetricBar label="trail shoes" value="82%" />
        <MetricBar label="umbrella" value="34%" />
      </div>
    </div>
  );
}

function HybridVisual() {
  return (
    <div className="search-lab-hybrid">
      <div className="hybrid-signal-board">
        <HybridSignalCard
          className="lexical"
          items={["Nike", "trail", "shoes"]}
          title="lexical lane"
        />
        <HybridSignalCard
          className="semantic"
          items={["wet pavement", "dry feet", "grip"]}
          title="semantic lane"
        />
        <HybridSignalCard
          className="filters"
          items={["under $120", "size 42", "in stock"]}
          title="filter gate"
        />
      </div>

      <div className="hybrid-fusion-board">
        <small>normalize + fuse</small>
        <div className="hybrid-score-row is-header">
          <span>candidate</span>
          <span>BM25</span>
          <span>vector</span>
          <span>filter</span>
          <span>final</span>
        </div>
        <HybridScoreRow
          candidate="Nike wet-grip trail shoe"
          final="0.92"
          filter="pass"
          lexical="0.88"
          semantic="0.84"
          winner
        />
        <HybridScoreRow
          candidate="Waterproof city sneaker"
          final="0.86"
          filter="pass"
          lexical="0.52"
          semantic="0.91"
        />
        <HybridScoreRow
          candidate="Nike summer trainer"
          final="0.41"
          filter="fail"
          lexical="0.81"
          semantic="0.22"
        />
      </div>
    </div>
  );
}

function HybridSignalCard({
  className,
  items,
  title,
}: {
  className: string;
  items: string[];
  title: string;
}) {
  return (
    <div className={`hybrid-signal-card ${className}`}>
      <small>{title}</small>
      <div>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function HybridScoreRow({
  candidate,
  final,
  filter,
  lexical,
  semantic,
  winner = false,
}: {
  candidate: string;
  final: string;
  filter: string;
  lexical: string;
  semantic: string;
  winner?: boolean;
}) {
  return (
    <div className={`hybrid-score-row ${winner ? "is-winner" : ""}`}>
      <strong>{candidate}</strong>
      <span>{lexical}</span>
      <span>{semantic}</span>
      <span>{filter}</span>
      <b>{final}</b>
    </div>
  );
}

function RerankVisual() {
  return (
    <div className="search-lab-rerank">
      <RankList
        items={[
          ["1", "Popular running shoe", "rough #1"],
          ["2", "Wet-grip city shoe", "rough #2"],
          ["3", "Trail hiking boot", "rough #3"],
        ]}
        title="Retrieved"
      />

      <div className="rerank-lens">
        <small>second pass</small>
        <strong>query + product read together</strong>
      </div>

      <RankList
        emphasized
        items={[
          ["1", "Wet-grip city shoe", "best fit"],
          ["2", "Popular running shoe", "less waterproof"],
          ["3", "Trail hiking boot", "too heavy"],
        ]}
        title="Reranked"
      />
    </div>
  );
}

function TextChip({ title, value }: { title: string; value: string }) {
  return (
    <div className="text-chip">
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}

function IndexRow({ postings, term }: { postings: string; term: string }) {
  return (
    <div className="index-row">
      <strong>{term}</strong>
      <span>{postings}</span>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-bar">
      <span>{label}</span>
      <i>
        <b style={{ width: value }} />
      </i>
    </div>
  );
}

function CorrectionRow({
  after,
  before,
  operation,
  wordAfter,
  wordBefore,
}: {
  after: string[];
  before: string[];
  operation: string;
  wordAfter: string;
  wordBefore: string;
}) {
  return (
    <div className="correction-row">
      <div>
        <small>{wordBefore}</small>
        <LetterRow letters={before} state="wrong" />
      </div>
      <span>{operation}</span>
      <div>
        <small>{wordAfter}</small>
        <LetterRow letters={after} state="right" />
      </div>
    </div>
  );
}

function LetterRow({ letters, state }: { letters: string[]; state: "wrong" | "right" }) {
  return (
    <div className={`letter-row is-${state}`}>
      {letters.map((letter, index) => (
        <i key={`${letter}-${index}`}>{letter}</i>
      ))}
    </div>
  );
}

function RankList({
  emphasized = false,
  items,
  title,
}: {
  emphasized?: boolean;
  items: [string, string, string][];
  title: string;
}) {
  return (
    <div className={`rank-list ${emphasized ? "is-emphasized" : ""}`}>
      <span className="mini-title">{title}</span>
      {items.map(([rank, name, reason]) => (
        <div className="rank-item" key={`${rank}-${name}`}>
          <b>{rank}</b>
          <strong>{name}</strong>
          <span>{reason}</span>
        </div>
      ))}
    </div>
  );
}
