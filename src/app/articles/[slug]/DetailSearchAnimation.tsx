type DetailSearchAnimationProps = {
  animationId: string;
};

const detailTitles: Record<string, string> = {
  platform: "One retrieval core behind two interfaces",
  exact: "Exact matching literally asks: does the string appear?",
  "inverted-index": "An inverted index flips products into term lookups",
  analysis: "Analysis decides what the engine is allowed to find",
  ranking: "BM25 balances rarity, repetition, and document length",
  "query-forgiveness":
    "Query forgiveness combines closeness, typos, and domain language",
  filters: "Filters enforce constraints before ranking",
  semantic: "Semantic search is broader than vectors",
  "vector-index": "Vector search embeds text, then compares geometry",
  hybrid: "Hybrid retrieval merges different evidence streams",
  reranking: "A reranker reads query and product together",
  "ai-interface": "Chat, RAG, and agents are interfaces over retrieval",
  operating: "Evaluation, debugging, and build order form one loop",
  "mental-model": "Every layer solves one failure mode",
};

export function hasDetailSearchAnimation(animationId: string) {
  return animationId in detailTitles;
}

export default function DetailSearchAnimation({
  animationId,
}: DetailSearchAnimationProps) {
  return (
    <section
      aria-label={`Detailed animation: ${detailTitles[animationId]}`}
      className={`article-animation detail-animation detail-animation-${animationId}`}
    >
      <p className="detail-animation-label">Deep dive</p>
      <h3>{detailTitles[animationId]}</h3>
      {renderDetail(animationId)}
    </section>
  );
}

function renderDetail(animationId: string) {
  switch (animationId) {
    case "platform":
      return (
        <div className="detail-interfaces">
          <div className="detail-phone">
            <span>Search bar</span>
            <strong>shoes for rain</strong>
          </div>
          <div className="detail-core-stack">
            <span>intent</span>
            <span>retrieval</span>
            <span>ranking</span>
          </div>
          <div className="detail-phone">
            <span>Chat</span>
            <strong>find me rain shoes</strong>
          </div>
        </div>
      );
    case "exact":
      return (
        <div className="detail-loop">
          {["waterproof sneakers", "city shoes", "trail shoes", "rain jacket"].map((item) => (
            <div key={item} className={item.includes("shoes") ? "is-hit" : ""}>
              <code>product.text.includes(&quot;shoes&quot;)</code>
              <span>{item}</span>
            </div>
          ))}
        </div>
      );
    case "inverted-index":
      return (
        <div className="detail-index">
          {[
            ["shoes", "p1 p3 p8"],
            ["waterproof", "p2 p8"],
            ["trail", "p5 p8"],
            ["nike", "p3 p9"],
          ].map(([term, postings]) => (
            <div key={term}>
              <strong>{term}</strong>
              <span>{postings}</span>
            </div>
          ))}
        </div>
      );
    case "analysis":
      return (
        <div className="detail-analyzer">
          {["Raw title", "Tokenizer", "Lowercase", "Synonyms", "Index terms"].map((step, index) => (
            <div key={step} style={{ animationDelay: `${index * 140}ms` }}>
              <span>{step}</span>
              <strong>
                {["GORE-TEX Shoes", "GORE | TEX | Shoes", "gore | tex | shoes", "waterproof | shoes", "waterproof shoes"][index]}
              </strong>
            </div>
          ))}
        </div>
      );
    case "ranking":
      return (
        <div className="detail-bm25">
          {[
            ["rare term", "waterproof", "92%"],
            ["term freq", "2 mentions", "68%"],
            ["length norm", "short title", "80%"],
          ].map(([label, value, width]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <i style={{ width }} />
            </div>
          ))}
        </div>
      );
    case "query-forgiveness":
      return (
        <div className="detail-hybrid">
          <div>Phrase: waterproof shoes stay together</div>
          <div>Typo: shooes becomes shoes</div>
          <strong>Forgiven query</strong>
          <div>Synonym: rainy maps to waterproof</div>
          <div>Autocomplete: rain suggests waterproof sneakers</div>
        </div>
      );
    case "filters":
      return (
        <div className="detail-funnel">
          {["all shoes", "waterproof", "size 42", "under $120", "in stock"].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      );
    case "semantic":
      return (
        <div className="detail-semantic">
          <div>
            <strong>Knowledge graph</strong>
            <span>rain {"->"} weather {"->"} waterproof</span>
          </div>
          <div>
            <strong>Ontology</strong>
            <span>trail shoe is-a shoe</span>
          </div>
          <div>
            <strong>Embeddings</strong>
            <span>meaning as geometry</span>
          </div>
          <p>
            Semantic search is the goal. Vectors are one implementation, not the
            definition.
          </p>
        </div>
      );
    case "vector-index":
      return (
        <div className="detail-vector">
          <div className="detail-vector-formula">
            cos(q, p) = q * p / ||q||||p||
          </div>
          {[
            ["query", "[0.12, 0.83, 0.44]"],
            ["waterproof sneakers", "0.91"],
            ["trail shoes", "0.84"],
            ["umbrella", "0.38"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      );
    case "hybrid":
      return (
        <div className="detail-hybrid">
          <div>BM25: Nike, trail, shoes</div>
          <div>Vector: rainy-day intent</div>
          <strong>RRF merge</strong>
          <div>Filters: under $120, in stock</div>
          <div>Hybrid top results</div>
        </div>
      );
    case "reranking":
      return (
        <div className="detail-rerank">
          {["candidate #8", "candidate #2", "candidate #14"].map((candidate, index) => (
            <div key={candidate} className={index === 1 ? "is-winner" : ""}>
              <span>{candidate}</span>
              <strong>{index === 1 ? "rerank #1" : `rerank #${index + 2}`}</strong>
            </div>
          ))}
        </div>
      );
    case "ai-interface":
      return (
        <div className="detail-rag">
          <span>parse request</span>
          <span>retrieve products</span>
          <span>apply constraints</span>
          <span>generate grounded answer</span>
          <span>plan another step</span>
        </div>
      );
    case "operating":
      return (
        <div className="detail-debug">
          {["query set", "metrics", "trace", "fix layer", "ship", "monitor"].map((stage, index) => (
            <span key={stage} className={index === 3 ? "is-failing" : ""}>
              {stage}
            </span>
          ))}
        </div>
      );
    case "mental-model":
      return (
        <div className="detail-agent">
          {["characters", "terms", "ranking", "constraints", "meaning", "answers"].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      );
    default:
      return null;
  }
}
