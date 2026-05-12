type DetailSearchAnimationProps = {
  section: number;
};

const detailTitles: Record<number, string> = {
  0: "One retrieval core behind two interfaces",
  1: "Exact matching literally asks: does the string appear?",
  2: "An inverted index flips products into term lookups",
  3: "Analysis decides what the engine is allowed to find",
  4: "BM25 balances rarity, repetition, and document length",
  5: "Positions let the engine understand closeness",
  6: "Edit distance measures how far a typo moved",
  7: "Synonyms are a domain graph, not a thesaurus dump",
  8: "Filters enforce constraints before ranking",
  9: "Autocomplete is a tiny predictive search system",
  10: "Semantic search is broader than vectors",
  11: "Vector search embeds text, then compares geometry",
  12: "Hybrid retrieval merges different evidence streams",
  13: "A reranker reads query and product together",
  14: "Learning to rank turns signals into an ordering model",
  15: "A chatbot extracts slots before it searches",
  16: "RAG grounds generation in retrieved evidence",
  17: "Agents turn goals into tool sequences",
  18: "Evaluation converts relevance into measurable feedback",
  19: "Debugging follows the failed result through the pipeline",
};

export function hasDetailSearchAnimation(section: number) {
  return section >= 0 && section <= 19;
}

export default function DetailSearchAnimation({
  section,
}: DetailSearchAnimationProps) {
  return (
    <section
      aria-label={`Detailed animation for section ${section}: ${detailTitles[section]}`}
      className={`article-animation detail-animation detail-animation-${section}`}
    >
      <p className="detail-animation-label">Deep dive</p>
      <h3>{detailTitles[section]}</h3>
      {renderDetail(section)}
    </section>
  );
}

function renderDetail(section: number) {
  switch (section) {
    case 0:
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
    case 1:
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
    case 2:
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
    case 3:
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
    case 4:
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
    case 5:
      return (
        <div className="detail-proximity">
          {["waterproof", "running", "shoes", "for", "wet", "streets"].map((word, index) => (
            <span key={word} className={index < 3 ? "is-close" : ""}>
              {word}
            </span>
          ))}
        </div>
      );
    case 6:
      return (
        <div className="detail-fuzzy">
          {[
            ["shooes", "shoes", "delete o"],
            ["snikers", "sneakers", "insert e,a"],
            ["nik", "nike", "insert e"],
          ].map(([bad, good, edit]) => (
            <div key={bad}>
              <span>{bad}</span>
              <strong>{good}</strong>
              <em>{edit}</em>
            </div>
          ))}
        </div>
      );
    case 7:
      return (
        <div className="detail-synonym-graph">
          {["shoes", "sneakers", "trainers", "waterproof", "rainy", "water-resistant"].map((node) => (
            <span key={node}>{node}</span>
          ))}
        </div>
      );
    case 8:
      return (
        <div className="detail-funnel">
          {["all shoes", "waterproof", "size 42", "under $120", "in stock"].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      );
    case 9:
      return (
        <div className="detail-autocomplete">
          <strong>rai</strong>
          {["rain shoes", "rain boots", "rainy day sneakers", "waterproof trainers"].map((suggestion) => (
            <span key={suggestion}>{suggestion}</span>
          ))}
        </div>
      );
    case 10:
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
            Vectors are common because they scale well, work with natural language,
            and can retrieve paraphrases without hand-writing every rule.
          </p>
        </div>
      );
    case 11:
      return (
        <div className="detail-vector">
          <div className="detail-vector-formula">
            cos(q, p) = q · p / ||q||||p||
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
    case 12:
      return (
        <div className="detail-hybrid">
          <div>BM25: Nike, trail, shoes</div>
          <div>Vector: rainy-day intent</div>
          <strong>RRF merge</strong>
          <div>Hybrid top results</div>
        </div>
      );
    case 13:
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
    case 14:
      return (
        <div className="detail-ltr">
          {["BM25", "vector", "clicks", "stock", "margin"].map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
          <strong>ranking model</strong>
        </div>
      );
    case 15:
      return (
        <div className="detail-chat-slots">
          {[
            ["product_type", "shoes"],
            ["weather", "rainy"],
            ["terrain", "city"],
            ["negative", "not hiking"],
            ["budget", "not expensive"],
          ].map(([slot, value]) => (
            <div key={slot}>
              <span>{slot}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      );
    case 16:
      return (
        <div className="detail-rag">
          <span>question</span>
          <span>retrieve products</span>
          <span>retrieve specs</span>
          <span>generate grounded answer</span>
        </div>
      );
    case 17:
      return (
        <div className="detail-agent">
          {["plan", "search", "filter", "compare", "ask", "recommend"].map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      );
    case 18:
      return (
        <div className="detail-eval">
          {[
            ["Recall@10", "94%"],
            ["NDCG", "0.81"],
            ["Zero-result", "2.7%"],
            ["P95 latency", "128ms"],
          ].map(([metric, value]) => (
            <div key={metric}>
              <span>{metric}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      );
    case 19:
      return (
        <div className="detail-debug">
          {["ingest", "analyze", "retrieve", "filter", "score", "rerank", "render"].map((stage, index) => (
            <span key={stage} className={index === 3 ? "is-failing" : ""}>
              {stage}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}
