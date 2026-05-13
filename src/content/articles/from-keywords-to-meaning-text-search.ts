import type { Article } from "@/lib/articles";

export const fromKeywordsToMeaningTextSearch: Article = {
  slug: "from-keywords-to-meaning-text-search",
  title: "From Keywords to Meaning: A Complete Guide to Text Search",
  date: "2026-05-12",
  excerpt:
    "A practical map for engineers who want to build text search, from exact matching to semantic, hybrid, and conversational systems.",
  content: `
    <p>I am writing this article for the engineer I was nine months ago, as a harness for everything I have been learning and building in production. I want it to be the ultimate resource for anyone who wants to build a platform around text search and does not know where to start or which step to take.</p>
    <p>Let's say you want to build a search engine for an ecommerce platform, just for fun. A catalog, a search bar, product pages, filters, rankings. Then, on top of that, you want a chatbot so the user can simply talk and receive what they want.</p>
    <p>A user comes in and looks for <span class="article-keyword">shoes for rainy days</span>. In the catalog, you have a lot of shoes, but the names do not exactly match that. They say things like <span class="article-keyword">waterproof sneakers</span>, <span class="article-keyword">water-resistant trainers</span>, and <span class="article-keyword">trail shoes</span>.</p>
    <p>That tiny mismatch is the whole problem of search.</p>
    <!-- intro-mismatch-illustration -->
    <p>What do you do? Where do you start? How do you ensure the user gets exactly what they are looking for?</p>
    <p>This is exactly what we are going to figure out in this article. A good search system does not merely find text. It helps a person move from what they typed to what they meant.</p>
    <p>This seems easy until you start listing everything that can go wrong. The user may misspell a brand. The product may use a synonym. A query may contain an exact product code, a vague desire, a price constraint, and a taste preference at the same time. The best result may not contain the query words. The top lexical match may be irrelevant. The most semantically similar result may ignore a crucial constraint. The user may need an answer, not a list.</p>

    <h2>0. Before Search: What Are We Building?</h2>
    <p>Before writing code, define the shape of the problem.</p>
    <p>We are using ecommerce as the example, but the techniques apply to almost every kind of search: documentation search, support search, marketplace search, code search, enterprise search, legal search, and even RAG systems that need to retrieve the right context before generating an answer.</p>
    <p>In ecommerce, relevance is not only about text. A good result may need to be relevant, in stock, available in the user's size, deliverable to their country, within budget, well reviewed, and visually close to what they imagined.</p>
    <p>We also want a chatbot on top. That changes the interface, but it does not remove search. The chatbot still needs a retrieval system underneath it. If retrieval is weak, the chatbot becomes a fluent narrator of bad results.</p>
    <p>So the platform has two main interfaces:</p>
    <ul>
      <li><strong>Search bar:</strong> the user types a query and expects ranked results.</li>
      <li><strong>Chat interface:</strong> the user describes a need and expects guidance, comparison, recommendations, or a direct answer.</li>
    </ul>
    <p>Under both surfaces is the same core question: given this user intent, what evidence in the catalog should we retrieve, rank, and show?</p>
    <!-- detail-animation-platform -->
    <p>That is the thread we will follow.</p>

    <h2>1. Exact Matching: The Smallest Search Engine</h2>
    <p>The first thing we can do is embarrassingly simple.</p>
    <p>Take the query. Scan every product. Return the products whose text contains the query string.</p>
    <p>If the user searches Nike, return products that contain Nike. If the user searches invoice-8392 in an internal tool, return the document that contains invoice-8392. If they search a product SKU, return the matching product.</p>
    <p>In our case, the user searches <span class="article-keyword">shoes for rainy days</span>. A naive loop might split the query into words and return every product containing <span class="article-keyword">shoes</span>. It may also look for rainy and days. If those words do not appear, the product is ignored.</p>
    <p>This is exact keyword search. It is not fashionable, but it is still essential.</p>
    <p>Exact search is what you want for IDs, SKUs, invoice numbers, usernames, error codes, filenames, quoted phrases, legal references, product model numbers, and anything where interpretation would be a bug.</p>
    <p>If a developer searches for <strong>ERR_AUTH_4017</strong>, they do not want a conceptually similar authentication article. They want the exact page, log line, issue, or source file containing that code. If a shopper searches for a specific model number, the system should not get creative. It should find the model.</p>
    <p>So exact matching is not bad. It is narrow. It answers one question: does this text contain that text?</p>
    <!-- detail-animation-exact -->
    <p>The problem is that our ecommerce user does not speak like the catalog.</p>
    <p>They ask for <span class="article-keyword">shoes for rainy days</span>, but the catalog says <span class="article-keyword">waterproof sneakers</span>, <span class="article-keyword">water-resistant trainers</span>, and <span class="article-keyword">trail shoes</span>. Exact matching may return products containing shoes, but miss products that would actually be perfect.</p>
    <p>That is our first limitation: exact matching is precise, but it has poor recall when language changes.</p>
    <p>Precision means the results you return are likely correct. Recall means you found all the things that should have been returned. Exact search can be very precise. It often fails at recall.</p>
    <p>Now we need the next layer.</p>

    <h2>2. The Inverted Index: Stop Reading Every Product</h2>
    <p>A loop is easy to understand, but it does not scale.</p>
    <p>If your catalog has 100 products, scanning all of them is fine. If it has 10 million products, scanning every title, description, review, and attribute for every query is not a search engine. It is a slow script.</p>
    <p>The classic solution is the inverted index.</p>
    <p>Instead of storing only products and scanning them one by one, the system builds a map from terms to the products that contain those terms.</p>
    <p>A tiny index might look like this:</p>
    <ul>
      <li><strong>shoes</strong>: product1, product3, product8, product12</li>
      <li><strong>sneakers</strong>: product2, product4, product9</li>
      <li><strong>waterproof</strong>: product2, product8</li>
      <li><strong>trail</strong>: product5, product8, product11</li>
      <li><strong>nike</strong>: product3, product9</li>
    </ul>
    <p>Now when the user searches, you do not read the whole catalog. You look up posting lists. A posting list is the list of documents or products where a term appears.</p>
    <p>This is the first real architectural jump. Search becomes an indexing problem.</p>
    <!-- detail-animation-inverted-index -->
    <p>Real inverted indexes store more than product IDs. They may store how many times a term appears, where it appears, which field it appears in, and the positions of words. That information later helps ranking, phrase search, highlighting, and debugging.</p>
    <p>For ecommerce, field information matters a lot. A match in a product title should usually count more than a match buried in a long description. A match in a brand field may count differently from a match in a review.</p>
    <p>At this stage, you can build something fast. But fast is not enough. The system still needs to decide what counts as a searchable term.</p>

    <h2>3. Analysis: Turning Product Text Into Searchable Terms</h2>
    <p>Before text can enter an index, it must be analyzed.</p>
    <p>Analysis is the pipeline that turns raw text into searchable terms. This is where a lot of search quality is won or lost.</p>
    <!-- detail-animation-analysis -->
    <p>A typical analyzer has three parts:</p>
    <ol>
      <li><strong>Character filters</strong> clean the raw text before tokenization. They can remove HTML, normalize punctuation, or handle special characters.</li>
      <li><strong>Tokenizers</strong> split text into tokens. They decide where words begin and end.</li>
      <li><strong>Token filters</strong> transform tokens. They can lowercase, remove stop words, stem words, fold accents, apply synonyms, or create n-grams.</li>
    </ol>
    <p>Take a product title like:</p>
    <p><strong>Nike Pegasus Trail 5 GORE-TEX Men's Waterproof Running Shoes</strong></p>
    <p>An analyzer may turn it into terms like nike, pegasus, trail, 5, gore, tex, men, waterproof, running, shoes.</p>
    <p>But every decision matters.</p>
    <ul>
      <li>If you split GORE-TEX into gore and tex, will users searching goretex still find it?</li>
      <li>If you lowercase everything, will brand and model matching still behave correctly?</li>
      <li>If you remove stop words, will phrases like to be or not to be still work in other domains?</li>
      <li>If you stem running to run, will runner and running become useful matches or noisy ones?</li>
      <li>If you treat sneakers and shoes as unrelated, will the rainy-day query miss good products?</li>
    </ul>
    <p>There is no perfect analyzer. There is only an analyzer that fits the domain.</p>
    <p>For ecommerce, you usually care about product names, brands, categories, attributes, sizes, colors, materials, and user language. Your analyzer must respect exact identifiers while still being flexible with normal words.</p>
    <p>This is the second lesson: search quality starts before ranking. If analysis loses the meaning you need, the ranker cannot recover it later.</p>

    <h2>4. Ranking: Matching Is Not Enough</h2>
    <p>Now the system can find candidates quickly. But it still has to order them.</p>
    <p>If 500 products contain shoes, which one should appear first?</p>
    <p>The simplest ranking is count-based: products with more query terms rank higher. If a product contains shoes and rainy, it beats a product containing only shoes.</p>
    <p>That is a start, but it is not enough.</p>
    <p>A word that appears in every product description is not very informative. A rare word is more useful. A match in the title is more important than a match in a review. A short product title matching the query may be more relevant than a huge description that happens to contain the same word once.</p>
    <p>This is where TF-IDF and BM25 enter.</p>
    <!-- detail-animation-ranking -->
    <p>TF-IDF combines two intuitions: terms that appear often in a document may matter, and terms that are rare across the collection matter more than common terms.</p>
    <p>BM25 is one of the most durable ranking functions built from that family of ideas. You do not need the formula to understand the instinct:</p>
    <ul>
      <li>Rare query terms should matter more than common query terms.</li>
      <li>Repeating a term helps, but only up to a point.</li>
      <li>Document length matters because matching a word in a short title is different from matching it somewhere in a giant text.</li>
    </ul>
    <p>BM25 is strong because it is boring in the best way. It is fast, explainable, and hard to beat as a lexical baseline.</p>
    <p>For our query, BM25 can help rank products that contain shoes, waterproof, rainy, trail, or related indexed terms. But if the product never uses the same words as the query, BM25 cannot invent the connection by itself.</p>
    <p>So we need to teach the system more language.</p>

    <h2>5. Query Forgiveness: Phrase, Proximity, Typos, and Synonyms</h2>
    <p>Once lexical search works, the next job is forgiveness. People do not type like clean databases, and products do not describe themselves with one perfect vocabulary.</p>
    <p>First, word position matters. A product that says <strong>waterproof running shoes</strong> is probably more relevant than a product where waterproof appears in one review, running appears in another paragraph, and shoes appears somewhere else. Phrase and proximity search reward words that form one idea.</p>
    <p>Second, spelling is messy. If the user types <span class="article-keyword">nik waterproof shooes</span>, the system should probably understand Nike waterproof shoes. Fuzzy search uses edit distance to recover from insertions, deletions, substitutions, and transpositions.</p>
    <p>Third, vocabulary differs. The user says shoes. The catalog says sneakers or trainers. The user says rainy days. The catalog says waterproof or water-resistant. Synonyms connect those words, but they should come from the domain, not from a random thesaurus.</p>
    <!-- detail-animation-query-forgiveness -->
    <p>These tools are powerful because they solve different kinds of mismatch:</p>
    <ul>
      <li><strong>Phrase and proximity</strong> protect meaning when word order and closeness matter.</li>
      <li><strong>Fuzzy search</strong> forgives typos while keeping exact IDs, SKUs, and model numbers protected.</li>
      <li><strong>Synonyms</strong> teach the system that sneakers, trainers, and shoes may belong together.</li>
      <li><strong>Autocomplete</strong> can gently guide users toward searchable language before they submit the query.</li>
    </ul>
    <p>The danger is over-expansion. If everything becomes related to everything, search gets generous but confused. Good query forgiveness improves recall without destroying precision.</p>

    <h2>6. Filters And Facets: Constraints Are Not Vibes</h2>
    <p>A user rarely wants only "shoes". They want size 42, under $120, black, in stock, deliverable this week, suitable for rain, maybe from Nike or Salomon.</p>
    <p>That is not just text search. That is search plus structured constraints.</p>
    <!-- detail-animation-filters -->
    <p>Filters let the system restrict results by structured fields. Facets let users refine results and understand the result set.</p>
    <p>For our ecommerce platform, useful fields might include:</p>
    <ul>
      <li>category</li>
      <li>brand</li>
      <li>price</li>
      <li>size</li>
      <li>color</li>
      <li>material</li>
      <li>waterproof or water-resistant</li>
      <li>terrain</li>
      <li>rating</li>
      <li>availability</li>
    </ul>
    <p>Facets are important because they move some work out of the query. The user does not need to type waterproof Nike trail shoes under 120 size 42 black. They can type the rough intent, then use filters.</p>
    <p>For the chatbot, structured fields matter even more. If the user says "under $120", the system should not treat that as vague text. It should apply a price filter. If they say "available in size 42", it should check inventory.</p>
    <p>This is a major lesson: not everything should be solved by ranking. Some things should be solved by filtering.</p>

    <h2>7. Semantic Search: Meaning, Not Just Words</h2>
    <p>At this point, lexical search is fairly strong. We have exact matching, an inverted index, analysis, BM25, query forgiveness, filters, and facets.</p>
    <p>But there is still a problem: users can describe needs in ways your rules never anticipated.</p>
    <p>They may search:</p>
    <ul>
      <li>shoes that will not get soaked</li>
      <li>something for walking in the rain</li>
      <li>comfortable sneakers for wet streets</li>
      <li>what should I wear for a rainy commute?</li>
    </ul>
    <p>You cannot manually write synonyms for every possible phrasing.</p>
    <p>Semantic search tries to solve this by matching meaning instead of only matching words.</p>
    <p>Semantic search is broader than vector search. At this level, semantic search names the goal: retrieve by meaning, not only by surface words. You can model meaning with knowledge graphs, ontologies, taxonomies, rules, structured domain relationships, or embeddings.</p>
    <!-- detail-animation-semantic -->
    <p>The most common modern tool is an embedding model because it scales well, works with natural language, and can retrieve paraphrases without hand-writing every connection. An embedding turns text into a vector: a list of numbers representing something about meaning. Queries and products become points in a high-dimensional space. Similar meanings should land near one another.</p>
    <p>Now shoes for rainy days can be close to waterproof sneakers even if the words are different.</p>
    <p>This is powerful for vague intent, natural language, paraphrases, and discovery. It is also useful for the chatbot because users naturally speak in full sentences.</p>
    <p>But semantic search is not magic.</p>
    <p>It may blur details that should remain sharp. It might think hiking boots and waterproof sneakers are similar, even if the user wanted lightweight city shoes. It may ignore exact constraints like Nike, size 42, under $120, or a specific SKU. It may retrieve conceptually similar products that are wrong in practice.</p>
    <p>So semantic search improves recall over meaning, but it can hurt precision over constraints.</p>
    <p>That is why modern systems rarely choose pure lexical or pure semantic search. They combine them.</p>

    <h2>8. Vector Indexes: Making Semantic Search Fast</h2>
    <p>If every product has an embedding, searching means finding vectors near the query vector.</p>
    <p>For a small catalog, you can compare the query vector to every product vector. For a large catalog, that becomes expensive.</p>
    <p>Vector indexes solve this problem. They use approximate nearest neighbor search to find close vectors quickly without comparing against everything.</p>
    <!-- detail-animation-vector-index -->
    <p>Systems may use algorithms and structures such as HNSW graphs, IVF indexes, product quantization, or GPU search. The details can get deep, but the product question is simple: can we retrieve semantically relevant candidates fast enough?</p>
    <p>Vector search introduces its own engineering decisions:</p>
    <ul>
      <li>Which embedding model should we use?</li>
      <li>Should we embed titles, descriptions, attributes, reviews, or all of them?</li>
      <li>How do we represent product variants?</li>
      <li>How often do we refresh embeddings?</li>
      <li>How do we handle deleted or out-of-stock products?</li>
      <li>How much latency and memory can we afford?</li>
    </ul>
    <p>For ecommerce, product representation matters. A product title alone may be too thin. A full description may be too noisy. Often you build a clean text representation from title, brand, category, attributes, and a short description, then embed that.</p>

    <h2>9. Hybrid Search: The Practical Default</h2>
    <p>Hybrid search combines lexical retrieval and semantic retrieval.</p>
    <!-- detail-animation-hybrid -->
    <p>This is usually where search starts feeling production-grade.</p>
    <p>Our query may contain multiple kinds of intent:</p>
    <p><strong>waterproof Nike trail shoes under $120</strong></p>
    <p>Here is what each layer should do:</p>
    <ul>
      <li><strong>Lexical search</strong> respects exact words like Nike and trail.</li>
      <li><strong>Semantic search</strong> connects waterproof to rainy-day intent.</li>
      <li><strong>Filters</strong> enforce under $120 and availability.</li>
      <li><strong>Business signals</strong> may consider rating, stock, margin, or shipping speed.</li>
    </ul>
    <p>Hybrid search can run BM25 and vector search in parallel, then merge the results. It can also retrieve a candidate pool from both systems and send that pool to a reranker.</p>
    <p>One common merging approach is reciprocal rank fusion. Instead of trying to compare raw BM25 scores with vector similarity scores directly, it combines rank positions. A product that appears high in both lists gets promoted.</p>
    <p>Hybrid search works because lexical and semantic systems fail differently. Lexical search is precise but literal. Semantic search is flexible but sometimes soft. Together, they cover more ground.</p>

    <h2>10. Reranking: Retrieve Broadly, Then Think Carefully</h2>
    <p>Most serious search systems are multi-stage.</p>
    <p>The first stage retrieves candidates quickly. The second stage reranks a smaller set more carefully.</p>
    <!-- detail-animation-reranking -->
    <p>A reranker looks at the query and each candidate product together, then predicts relevance. This can be more accurate than comparing separate embeddings because the model sees the interaction between the query and the product.</p>
    <p>For example, a first-stage hybrid search may retrieve 200 products. A reranker then sorts the top 50 by how well they answer the user's actual intent.</p>
    <p>Reranking is useful because it can understand details like:</p>
    <ul>
      <li>Does this product actually satisfy rainy-day use?</li>
      <li>Is this a shoe or only an accessory?</li>
      <li>Is the waterproof feature central or just mentioned casually?</li>
      <li>Does the product match the user's constraints?</li>
    </ul>
    <p>But reranking has trade-offs. It adds latency and cost. It cannot fix a bad candidate pool. If the right product never appears in the first-stage results, the reranker cannot rescue it.</p>
    <p>The pattern is: retrieve broadly, then think carefully.</p>

    <h2>11. Search as an AI Interface: Chat, RAG, and Agents</h2>
    <p>Now let us return to the chatbot. The user does not type a short query. They say:</p>
    <p><strong>I need shoes I can wear on rainy days, mostly for walking in the city, not hiking, and I do not want anything too expensive.</strong></p>
    <p>A chatbot has to parse intent before it searches. It should identify the product type, use case, terrain, negative preference, and price preference. Then it should turn those into retrieval actions: semantic search for rainy-day intent, lexical matching for shoes, filters for category and price, and maybe a reranking penalty for hiking boots.</p>
    <p>This is where search becomes the foundation for the AI interface. In RAG, the language model writes the answer, but retrieval supplies the evidence. In agentic search, the system may need several steps: extract constraints, search, filter, compare, ask a follow-up question, and recommend.</p>
    <!-- detail-animation-ai-interface -->
    <p>But the rule stays the same: the model should not invent products. It should use search tools, inspect product data, compare candidates, and answer with grounded recommendations.</p>
    <p>If retrieval is weak, RAG gives fluent bad answers. If the catalog data is messy, the chatbot becomes confident about the wrong things. If filters are ignored, the answer may sound helpful while recommending products the user cannot buy.</p>
    <p>The chatbot is not separate from search. It is another interface over search.</p>

    <h2>12. Operating the System: Evaluation, Debugging, and Build Order</h2>
    <p>Search quality is not something you feel once and declare solved. You measure it, debug it, and improve it layer by layer.</p>
    <p>Start with a query set: head queries, exact product codes, typo queries, synonym queries, filter-heavy queries, no-result queries, and chat-style requests. For each query, define what good results look like.</p>
    <p>Useful metrics include precision, recall, MRR, NDCG, recall@K, latency, zero-result rate, and reformulation rate. For ecommerce, also watch add-to-cart rate, conversion, filter usage, and abandonment. For chat, watch grounded answer rate and whether users keep correcting the assistant.</p>
    <!-- detail-animation-operating -->
    <p>When search fails, trace the pipeline instead of blaming ranking immediately:</p>
    <ol>
      <li>Did the product enter the system?</li>
      <li>Did analysis create the right terms?</li>
      <li>Did lexical or semantic retrieval find it?</li>
      <li>Did a filter remove it?</li>
      <li>Did the scorer or reranker demote it?</li>
      <li>Did the UI or chatbot distort the evidence?</li>
    </ol>
    <p>If I were building this from zero, I would start with clean product data, exact and lexical search, analyzers, BM25, filters, typo tolerance, autocomplete, and synonyms. Then I would add evaluation sets, semantic search, hybrid retrieval, reranking, and finally chat, RAG, or agentic flows.</p>
    <p>Learning to rank can come later, when you have enough reliable judgments or behavior data to learn from. It is powerful, but behavior data is biased, so it should improve a strong system rather than replace judgment.</p>
    <p>The practical order is simple: build the foundation first, add intelligence when the earlier layer exposes a real limitation, and keep measuring.</p>

    <h2>13. The Core Mental Model</h2>
    <p>The whole story can be compressed into one sentence:</p>
    <p><strong>Search is the engineering of translation between user intent and stored evidence.</strong></p>
    <!-- detail-animation-mental-model -->
    <p>Exact matching translates characters. Analyzers translate text into terms. BM25 translates term evidence into lexical relevance. Query forgiveness translates messy language. Filters translate constraints. Embeddings translate meaning. Hybrid search translates across retrieval methods. Rerankers translate candidate sets into better ordering. RAG translates retrieved evidence into answers. Agents translate user goals into multi-step retrieval plans.</p>
    <p>Each layer exists because the previous layer was useful but incomplete.</p>
    <p>So when you hear about a new search technique, do not ask: is this the future of search?</p>
    <p>Ask: which failure mode does this solve?</p>
    <p>That question will keep you grounded.</p>
    <p>The future of search is not simply semantic, or conversational, or agentic. It is layered. Exact when exactness matters. Lexical when words carry the signal. Structured when constraints matter. Semantic when vocabulary diverges. Hybrid when real queries mix all of it. Conversational when the user needs help deciding.</p>
    <p>The user types a few words. The system has to understand the need, find the evidence, respect the constraints, rank the candidates, and present something useful.</p>
    <p>That is the craft.</p>
  `,
};
