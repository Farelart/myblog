import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBoxesStacked,
  FaBrain,
  FaClipboardCheck,
  FaComments,
  FaDatabase,
  FaFilter,
  FaLayerGroup,
  FaMagnifyingGlass,
  FaNetworkWired,
  FaRankingStar,
  FaRobot,
  FaSliders,
  FaTableList,
  FaVectorSquare,
} from "react-icons/fa6";

type SectionAnimation = {
  eyebrow: string;
  title: string;
  icon: IconType;
  inputTitle: string;
  inputItems: string[];
  processTitle: string;
  processItems: string[];
  outputTitle: string;
  outputItems: string[];
  note: string;
  accent: "blue" | "yellow" | "green";
};

const sectionAnimations: Record<number, SectionAnimation> = {
  0: {
    eyebrow: "Platform shape",
    title: "Two interfaces, one retrieval core",
    icon: FaLayerGroup,
    inputTitle: "Surfaces",
    inputItems: ["Search bar", "Chat interface", "Product pages"],
    processTitle: "Shared search layer",
    processItems: ["Parse intent", "Retrieve evidence", "Rank candidates"],
    outputTitle: "User value",
    outputItems: ["Ranked results", "Guided answers", "Product comparisons"],
    note: "The interface changes, but both paths need the same reliable retrieval foundation.",
    accent: "blue",
  },
  1: {
    eyebrow: "Exact matching",
    title: "The first search engine is just a loop",
    icon: FaMagnifyingGlass,
    inputTitle: "Query",
    inputItems: ["shoes", "rainy", "days"],
    processTitle: "Scan every product",
    processItems: ["contains shoes?", "contains rainy?", "contains days?"],
    outputTitle: "Returned",
    outputItems: ["products with shoes", "exact SKU matches", "missed synonyms"],
    note: "Exact matching is precise for codes and names, but it misses intent when vocabulary changes.",
    accent: "yellow",
  },
  2: {
    eyebrow: "Indexing",
    title: "The inverted index stops reading the whole catalog",
    icon: FaDatabase,
    inputTitle: "Terms",
    inputItems: ["shoes", "waterproof", "trail"],
    processTitle: "Posting lists",
    processItems: ["shoes -> p1, p8", "waterproof -> p2, p8", "trail -> p5, p8"],
    outputTitle: "Fast lookup",
    outputItems: ["intersect lists", "merge candidates", "skip full scan"],
    note: "Search becomes a prepared memory of where words appear.",
    accent: "blue",
  },
  3: {
    eyebrow: "Analysis",
    title: "Raw product text becomes searchable terms",
    icon: FaTableList,
    inputTitle: "Raw title",
    inputItems: ["Nike Pegasus Trail", "GORE-TEX", "Waterproof Shoes"],
    processTitle: "Analyzer pipeline",
    processItems: ["character filters", "tokenizer", "token filters"],
    outputTitle: "Terms",
    outputItems: ["nike", "pegasus", "trail", "waterproof"],
    note: "If analysis loses the signal, ranking cannot recover it later.",
    accent: "green",
  },
  4: {
    eyebrow: "Ranking",
    title: "BM25 turns matches into an ordered list",
    icon: FaRankingStar,
    inputTitle: "Candidates",
    inputItems: ["p8: waterproof shoes", "p2: trail sneaker", "p4: shoe care"],
    processTitle: "Scoring signals",
    processItems: ["rare terms", "field boosts", "length normalization"],
    outputTitle: "Top results",
    outputItems: ["p8 score 9.8", "p2 score 7.1", "p4 score 3.2"],
    note: "Matching finds candidates. Ranking decides what deserves attention first.",
    accent: "yellow",
  },
  5: {
    eyebrow: "Query forgiveness",
    title: "Close words, typos, and domain language all help recall",
    icon: FaNetworkWired,
    inputTitle: "Messy query",
    inputItems: ["rainy shoes", "nik shooes", "wet streets"],
    processTitle: "Forgiveness layer",
    processItems: ["phrase proximity", "edit distance", "domain synonyms"],
    outputTitle: "Expanded candidates",
    outputItems: ["waterproof sneakers", "Nike shoes", "water-resistant trainers"],
    note: "Forgiveness should recover intent without making every product match every query.",
    accent: "blue",
  },
  6: {
    eyebrow: "Facets and filters",
    title: "Constraints should be enforced, not guessed",
    icon: FaFilter,
    inputTitle: "Constraints",
    inputItems: ["under $120", "size 42", "in stock"],
    processTitle: "Structured filters",
    processItems: ["price <= 120", "variant has size 42", "inventory > 0"],
    outputTitle: "Valid candidates",
    outputItems: ["relevant", "available", "buyable"],
    note: "Ranking should not be asked to fix constraints that filters can enforce.",
    accent: "blue",
  },
  7: {
    eyebrow: "Semantic search",
    title: "Meaning can be modeled in more than one way",
    icon: FaBrain,
    inputTitle: "Natural language",
    inputItems: ["shoes that will not get soaked", "walking in wet streets"],
    processTitle: "Meaning models",
    processItems: ["knowledge graph", "ontology", "embeddings"],
    outputTitle: "Intent matches",
    outputItems: ["waterproof sneakers", "city walking trainers", "rain-ready shoes"],
    note: "Semantic search is the goal; vectors are the most common modern implementation.",
    accent: "yellow",
  },
  8: {
    eyebrow: "Vector index",
    title: "Approximate nearest neighbors make meaning search fast",
    icon: FaVectorSquare,
    inputTitle: "Embedding",
    inputItems: ["query vector", "product vectors", "metadata"],
    processTitle: "ANN graph",
    processItems: ["shortcuts", "neighbor hops", "candidate recall"],
    outputTitle: "Fast semantic pool",
    outputItems: ["top 100 vectors", "low latency", "tunable recall"],
    note: "Vector search is also a systems problem: memory, latency, updates, and recall.",
    accent: "blue",
  },
  9: {
    eyebrow: "Hybrid retrieval",
    title: "Lexical precision plus semantic flexibility",
    icon: FaBoxesStacked,
    inputTitle: "Mixed query",
    inputItems: ["waterproof", "Nike", "trail", "under $120"],
    processTitle: "Parallel retrievers",
    processItems: ["BM25 candidates", "vector candidates", "filters"],
    outputTitle: "Merged pool",
    outputItems: ["exact brand kept", "intent recovered", "constraints respected"],
    note: "Hybrid search works because lexical and semantic retrieval fail differently.",
    accent: "green",
  },
  10: {
    eyebrow: "Reranking",
    title: "Retrieve broadly, then think carefully",
    icon: FaSliders,
    inputTitle: "Candidate pool",
    inputItems: ["top 200 products", "mixed signals", "rough order"],
    processTitle: "Second pass",
    processItems: ["query + product", "relevance model", "reorder top K"],
    outputTitle: "Sharper top results",
    outputItems: ["best match #1", "near miss demoted", "accessory removed"],
    note: "Rerankers improve the top of the list, but only if retrieval found the right candidates.",
    accent: "yellow",
  },
  11: {
    eyebrow: "AI interface",
    title: "Chat, RAG, and agents still depend on retrieval",
    icon: FaComments,
    inputTitle: "User says",
    inputItems: ["rainy city walking", "not hiking", "not too expensive"],
    processTitle: "Search tools",
    processItems: ["retrieve evidence", "apply filters", "compare candidates"],
    outputTitle: "Grounded answer",
    outputItems: ["recommendations", "trade-offs", "follow-up if unclear"],
    note: "The model can narrate the answer, but search has to supply trustworthy evidence.",
    accent: "green",
  },
  12: {
    eyebrow: "Operations",
    title: "Measure, trace, and build in the right order",
    icon: FaClipboardCheck,
    inputTitle: "Query set",
    inputItems: ["head queries", "typos", "intent queries", "chat queries"],
    processTitle: "Operating loop",
    processItems: ["measure quality", "trace failures", "ship next layer"],
    outputTitle: "Search platform",
    outputItems: ["better ranking", "fewer dead ends", "grounded chat"],
    note: "Evaluation and debugging are what turn a demo into a search system.",
    accent: "green",
  },
  13: {
    eyebrow: "Mental model",
    title: "Each layer translates one kind of mismatch",
    icon: FaRobot,
    inputTitle: "User intent",
    inputItems: ["words", "constraints", "meaning", "goals"],
    processTitle: "Search stack",
    processItems: ["lexical", "structured", "semantic", "conversational"],
    outputTitle: "Useful evidence",
    outputItems: ["right candidates", "right order", "grounded answer"],
    note: "Do not ask whether a technique is the future. Ask which failure mode it solves.",
    accent: "yellow",
  },
};

export function hasSectionSearchAnimation(section: number) {
  return section in sectionAnimations;
}

export default function SectionSearchAnimation({
  section,
}: {
  section: number;
}) {
  const animation = sectionAnimations[section];

  if (!animation) return null;

  const Icon = animation.icon;

  return (
    <section
      aria-label={`Animation for section ${section}: ${animation.title}`}
      className={`article-animation section-search-animation section-search-animation-${animation.accent}`}
    >
      <div className="section-animation-heading">
        <div className="section-animation-icon">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <p className="section-animation-eyebrow">{animation.eyebrow}</p>
          <p className="section-animation-title">{animation.title}</p>
        </div>
      </div>

      <div className="section-animation-flow">
        <AnimationPanel
          delay={0}
          title={animation.inputTitle}
          items={animation.inputItems}
        />
        <FlowArrow delay={1} />
        <AnimationPanel
          delay={2}
          title={animation.processTitle}
          items={animation.processItems}
          emphasized
        />
        <FlowArrow delay={3} />
        <AnimationPanel
          delay={4}
          title={animation.outputTitle}
          items={animation.outputItems}
        />
      </div>

      <div className="section-animation-note">
        <span className="section-animation-note-dot" />
        <p>{animation.note}</p>
      </div>
    </section>
  );
}

function AnimationPanel({
  title,
  items,
  delay,
  emphasized = false,
}: {
  title: string;
  items: string[];
  delay: number;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`section-animation-panel ${
        emphasized ? "section-animation-panel-emphasized" : ""
      }`}
      style={{ animationDelay: `${delay * 110}ms` }}
    >
      <p className="section-animation-panel-title">{title}</p>
      <div className="section-animation-items">
        {items.map((item, index) => (
          <span
            key={item}
            className="section-animation-chip"
            style={{ animationDelay: `${delay * 110 + index * 150}ms` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlowArrow({ delay }: { delay: number }) {
  return (
    <div
      className="section-animation-arrow"
      style={{ animationDelay: `${delay * 110}ms` }}
      aria-hidden="true"
    >
      <FaArrowRight className="h-3.5 w-3.5" />
    </div>
  );
}
