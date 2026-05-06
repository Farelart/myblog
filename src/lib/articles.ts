export type Article = {
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
  content: string; // HTML content
};

export const articles: Article[] = [
  {
    slug: "context-providers",
    title: "Context Providers",
    date: "2026-05-01",
    excerpt:
      "A thin layer between agents and tools that fixes context pollution, scope collisions, and prompt bloat.",
    content: `
      <p>One of the most underrated problems in agentic systems isn't the model — it's the context. As agents grow more capable, the surface area of what they "know" at any given moment explodes. Context providers are my answer to this.</p>
      <p>A context provider is a lightweight abstraction that sits between the agent runtime and the tools it can call. Instead of passing raw state into every tool invocation, the provider resolves only the context that tool actually needs — nothing more, nothing less.</p>
      <p>This solves three concrete problems I've run into building large-scale multi-agent systems:</p>
      <ul>
        <li><strong>Context pollution</strong> — agents inheriting irrelevant state from upstream tasks.</li>
        <li><strong>Scope collisions</strong> — two parallel agents writing to the same context keys.</li>
        <li><strong>Prompt bloat</strong> — the system prompt growing unbounded as context accumulates.</li>
      </ul>
      <p>The implementation is intentionally boring. A context provider is just a function that receives a request and returns a typed dictionary. What makes it powerful is the discipline it enforces: every tool must declare its context dependencies explicitly.</p>
      <p>We've been running this pattern in production at Agno for six months. Token counts dropped 40%. Agent reliability went up. Debugging became tractable again.</p>
      <p>If you're building with agents at scale, the context layer deserves as much attention as the model layer. Start there.</p>
    `,
  },
  {
    slug: "dynamic-software",
    title: "Dynamic Software",
    date: "2026-04-30",
    excerpt:
      "For fifty years, software has been static. Then 2024 happened. The control flow came alive and a new category of software was born.",
    content: `
      <p>Software has always been deterministic. You write instructions, the machine follows them, you get a result. The same inputs produce the same outputs. That's been true since the first punch card.</p>
      <p>2024 changed this. Not incrementally — categorically. When language models became capable enough to make real decisions, the control flow of software stopped being a fixed graph and became a living thing.</p>
      <p>I call this Dynamic Software. Not "AI-powered" (everything is AI-powered now). Not "intelligent" (that's too vague). Dynamic — because the execution path isn't determined at write-time, it's determined at run-time, by reasoning.</p>
      <p>Think about what this means practically. In static software, a bug is a miswritten instruction. In dynamic software, a bug might be a misaligned objective. The failure mode changes. So does the debugging methodology. So does the testing strategy.</p>
      <p>We're still in the early innings of understanding what it means to build Dynamic Software reliably. The frameworks are immature. The mental models are borrowed from old paradigms. The best practices are being written right now, by teams shipping real products.</p>
      <p>What I know for certain: the engineers who internalize this shift earliest will have a compounding advantage over those who treat AI as a feature to bolt on. Dynamic Software isn't a feature. It's a new medium.</p>
    `,
  },
  {
    slug: "scaling-agentic-software",
    title: "Scaling Agentic Software",
    date: "2026-04-16",
    excerpt:
      "What is the simplest architecture for running a multi-agent system at scale?",
    content: `
      <p>Most teams building multi-agent systems make the same mistake: they over-engineer the orchestration layer before they understand the workload.</p>
      <p>I've seen teams build elaborate agent meshes with custom message brokers, shared memory stores, and complex routing logic — before shipping a single user-facing feature. The orchestration becomes the product, and the actual problem gets lost.</p>
      <p>Here's the simplest architecture that actually scales:</p>
      <ol>
        <li>A single orchestrator agent that owns the task decomposition.</li>
        <li>Stateless worker agents that execute subtasks and return structured results.</li>
        <li>A durable task queue (anything reliable — SQS, Redis streams, Postgres) connecting them.</li>
        <li>A shared read model for results that both agents and humans can query.</li>
      </ol>
      <p>That's it. No mesh topology. No peer-to-peer agent communication. No shared mutable state.</p>
      <p>The orchestrator-worker pattern has been proven at scale in distributed systems for decades. The only thing that changes when you add agents is that the orchestrator's task decomposition is now a reasoning step rather than a fixed algorithm.</p>
      <p>Start here. Add complexity only when you have concrete evidence that this architecture is the bottleneck. It almost never is.</p>
    `,
  },
  {
    slug: "the-memory-problem",
    title: "The Memory Problem",
    date: "2026-04-02",
    excerpt:
      "Agents forget. Not because models are bad at remembering — but because we haven't solved the retrieval problem.",
    content: `
      <p>There's a common misconception about agent memory: that it's primarily a model problem. That if we just had a larger context window, or a model trained with better long-term recall, the problem would be solved.</p>
      <p>It isn't a model problem. It's a retrieval problem.</p>
      <p>The hard part of agent memory isn't storing information — it's knowing what to retrieve, when, and in what form. A 10 million token context window doesn't help you if the relevant memory is buried 8 million tokens back and the model attends to the wrong thing.</p>
      <p>The approaches I've found most reliable in production:</p>
      <ul>
        <li><strong>Hierarchical summarization</strong> — compress episodic memories into semantic summaries at regular intervals. Retrieve summaries first, raw episodes only when needed.</li>
        <li><strong>Memory tagging</strong> — every memory record gets typed metadata at write time. Retrieval becomes a structured query, not a semantic search over an undifferentiated blob.</li>
        <li><strong>Recency weighting</strong> — the most recent context almost always matters most. Build your retrieval to reflect this explicitly rather than relying on vector similarity alone.</li>
      </ul>
      <p>We're early. The field hasn't converged on a memory architecture the way it has on, say, the transformer architecture. But the teams that treat memory as a first-class engineering problem — not a prompt engineering afterthought — are pulling ahead.</p>
    `,
  },
  {
    slug: "why-i-left-airbnb",
    title: "Why I Left Airbnb",
    date: "2026-03-18",
    excerpt:
      "After three years building data infrastructure for one of the most complex marketplaces in the world, I knew it was time to build something of my own.",
    content: `
      <p>I joined Airbnb in 2018 because I wanted to work on a genuinely hard technical problem at scale. I got what I came for. The data infrastructure we built handled billions of events per day across a two-sided marketplace with asymmetric supply, seasonal demand, and more edge cases than I could count.</p>
      <p>By 2021, I'd learned something I couldn't unlearn: the problems I found most interesting weren't internal to Airbnb. They were upstream of it. The infrastructure problems, the tooling gaps, the primitives that every data-intensive company was solving from scratch, over and over.</p>
      <p>That's a market. A boring, infrastructure-layer market — the kind I find most exciting.</p>
      <p>Leaving a well-paying job at a brand-name company to start something uncertain is a decision I deliberated for longer than I'd like to admit. The pull of stability is real, especially when you've watched other founders struggle.</p>
      <p>What pushed me over the edge was a simple question: in ten years, which outcome would I regret more? Not having tried, or having tried and failed? The answer was obvious once I asked it directly.</p>
      <p>I don't think the Airbnb years were time spent waiting to start my "real" career. They were load-bearing. Every hard problem I worked on there is directly relevant to what we're building now. The path wasn't a detour — it was the education.</p>
    `,
  },
  {
    slug: "tools-are-not-enough",
    title: "Tools Are Not Enough",
    date: "2026-03-05",
    excerpt:
      "Every major AI framework now supports tool use. But giving an agent a hammer doesn't make it a carpenter.",
    content: `
      <p>The tool use feature shipped in every major AI framework of the past year shares a common assumption: that the hard problem of agent capability is access to tools.</p>
      <p>It isn't. Access is table stakes. The hard problem is judgment — knowing which tool to use, when, with what parameters, in what sequence, and when not to use any tool at all.</p>
      <p>I've seen this play out dozens of times with teams building their first production agents. They start with a carefully curated set of five tools. The agent performs well in demos. Then they add more tools — because more capabilities seems obviously good — and performance degrades. The agent starts making worse choices, not better ones.</p>
      <p>This is the tool proliferation problem. It's analogous to the feature proliferation problem in product design: more options create more cognitive load, which leads to worse decisions.</p>
      <p>The agents that perform best in production tend to have small, well-defined tool sets with clear, non-overlapping responsibilities. Each tool does one thing well. The agent doesn't have to reason about which tool is "more appropriate" — there's only one right answer.</p>
      <p>Before you add another tool to your agent, ask: is this tool solving an agent capability problem, or a tool design problem? Most of the time, it's the latter.</p>
    `,
  },
  {
    slug: "on-building-with-llms",
    title: "On Building With LLMs",
    date: "2026-02-20",
    excerpt:
      "Two years into building production systems on top of language models, here's what I wish someone had told me on day one.",
    content: `
      <p>Building with language models is unlike building with any other infrastructure component. The failure modes are different. The testing methodology is different. The intuitions you've built up from years of deterministic software engineering will mislead you in specific, predictable ways.</p>
      <p>Here's what I've learned the hard way:</p>
      <p><strong>Evals first, always.</strong> You cannot improve what you cannot measure. The teams that ship reliable LLM systems invest in evaluation infrastructure before they optimize the system. Not after. Before.</p>
      <p><strong>Prompts are code.</strong> Treat them with the same rigor: version control, review, testing, documentation. A prompt change that ships without review is a code change that ships without review. The blast radius can be just as large.</p>
      <p><strong>The model is not the product.</strong> The model is a component. The product is the system around it — the retrieval, the context management, the output validation, the fallback logic, the monitoring. Teams that focus exclusively on model selection miss 80% of the engineering work.</p>
      <p><strong>Latency compounds.</strong> Every sequential LLM call adds latency. Multi-step pipelines that feel fast in development feel slow in production. Design for parallelism from the start, not as a retrofit.</p>
      <p><strong>Users are more forgiving than you expect, in the places you don't expect.</strong> They'll tolerate a slightly wrong answer. They won't tolerate a slow one, or a confusing one, or one that makes them feel talked down to. Optimize accordingly.</p>
    `,
  },
  {
    slug: "the-infrastructure-layer",
    title: "The Infrastructure Layer",
    date: "2026-02-04",
    excerpt:
      "Every technology wave creates an infrastructure layer that outlasts the first wave of applications built on top of it.",
    content: `
      <p>In 1994, the most exciting thing you could build on the internet was a web page. By 2000, the most durable businesses being built were infrastructure: CDNs, hosting providers, database vendors.</p>
      <p>The application layer and the infrastructure layer evolve at different speeds. Applications evolve with user behavior and market trends. Infrastructure evolves with the underlying technology's maturity curve. The gap between them is where durable businesses are built.</p>
      <p>We're in a similar moment with AI. The application layer is moving fast — new products launching daily, use cases proliferating, user expectations shifting. The infrastructure layer is still being defined.</p>
      <p>What does AI infrastructure look like? Not the model layer — that's been commoditizing since GPT-3. The layer above it: the orchestration primitives, the memory systems, the evaluation frameworks, the deployment tooling. The picks and shovels of the AI gold rush, except the gold rush hasn't peaked yet.</p>
      <p>At Agno, we're building in this layer deliberately. Not because applications aren't exciting — they are — but because infrastructure compounds. Every team that builds on your platform makes the platform better. Every integration adds a flywheel. Every production workload surfaces edge cases that improve the core.</p>
      <p>The infrastructure layer is a harder sell than the application layer. The ROI is less immediate, the use cases less tangible. But the businesses it produces tend to be more defensible, more scalable, and more enduring. I'll take that trade.</p>
    `,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}
