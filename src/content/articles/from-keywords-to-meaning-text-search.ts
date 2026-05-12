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
    <!-- detail-animation-0 -->
    <p>That is the thread we will follow.</p>

    <h2>1. The Smallest Search Engine: A Loop</h2>
    <p>The first thing we can do is embarrassingly simple.</p>
    <p>Take the query. Scan every product. Return the products whose text contains the query string.</p>
    <p>If the user searches Nike, return products that contain Nike. If the user searches invoice-8392 in an internal tool, return the document that contains invoice-8392. If they search a product SKU, return the matching product.</p>
    <p>In our case, the user searches <span class="article-keyword">shoes for rainy days</span>. A naive loop might split the query into words and return every product containing <span class="article-keyword">shoes</span>. It may also look for rainy and days. If those words do not appear, the product is ignored.</p>
    <!-- exact-loop-illustration -->
    <p>This is exact keyword search. It is not fashionable, but it is still essential.</p>
    <p>Exact search is what you want for IDs, SKUs, invoice numbers, usernames, error codes, filenames, quoted phrases, legal references, product model numbers, and anything where interpretation would be a bug.</p>
    <p>If a developer searches for <strong>ERR_AUTH_4017</strong>, they do not want a conceptually similar authentication article. They want the exact page, log line, issue, or source file containing that code. If a shopper searches for a specific model number, the system should not get creative. It should find the model.</p>
    <p>So exact matching is not bad. It is narrow. It answers one question: does this text contain that text?</p>
    <!-- detail-animation-1 -->
    <p>The problem is that our ecommerce user does not speak like the catalog.</p>
    <p>They ask for <span class="article-keyword">shoes for rainy days</span>, but the catalog says <span class="article-keyword">waterproof sneakers</span>, <span class="article-keyword">water-resistant trainers</span>, and <span class="article-keyword">trail shoes</span>. Exact matching may return products containing shoes, but miss products that would actually be perfect.</p>
    <!-- exact-limitations-illustration -->
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
    <!-- detail-animation-2 -->
    <p>Real inverted indexes store more than product IDs. They may store how many times a term appears, where it appears, which field it appears in, and the positions of words. That information later helps ranking, phrase search, highlighting, and debugging.</p>
    <p>For ecommerce, field information matters a lot. A match in a product title should usually count more than a match buried in a long description. A match in a brand field may count differently from a match in a review.</p>
    <p>At this stage, you can build something fast. But fast is not enough. The system still needs to decide what counts as a searchable term.</p>

    <h2>3. Analysis: Turning Product Text Into Searchable Terms</h2>
    <p>Before text can enter an index, it must be analyzed.</p>
    <p>Analysis is the pipeline that turns raw text into searchable terms. This is where a lot of search quality is won or lost.</p>
    <!-- detail-animation-3 -->
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
    <!-- detail-animation-4 -->
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

    <h2>5. Phrase And Proximity: Words Near Each Other Matter</h2>
    <p>Sometimes the order and distance of words matter.</p>
    <p>A product that says waterproof running shoes is probably more relevant than a product where waterproof appears in one paragraph, running appears in another, and shoes appears in a review.</p>
    <p>This is why search engines store positions in the index. With positions, they can support:</p>
    <!-- detail-animation-5 -->
    <ul>
      <li><strong>Phrase search:</strong> exact word order, like "running shoes".</li>
      <li><strong>Proximity search:</strong> words appearing near each other.</li>
      <li><strong>Sloppy phrase search:</strong> word order and closeness with some flexibility.</li>
    </ul>
    <p>For ecommerce, proximity can make titles and compact product descriptions rank better. It rewards products where the important words form one idea, not products where the words appear by accident.</p>
    <p>This improves lexical relevance, but it still does not solve typos.</p>

    <h2>6. Fuzzy Search: People Make Typos</h2>
    <p>Users type fast. Phones are small. Brand names are strange. Search needs forgiveness.</p>
    <p>If the user types <span class="article-keyword">nik waterproof shooes</span>, you probably want Nike waterproof shoes. If they type addidas, you probably want Adidas. If they type snikers, you probably want sneakers.</p>
    <p>Fuzzy search handles approximate spelling. The usual idea is edit distance: how many insertions, deletions, substitutions, or transpositions are needed to turn one word into another?</p>
    <!-- detail-animation-6 -->
    <p>This is useful, but dangerous if you overdo it.</p>
    <p>Short words are risky. One edit can completely change the meaning. Product codes are risky too. If a user searches X100, you should not silently rewrite it to X700 because it looks close.</p>
    <p>A good ecommerce search system usually has rules:</p>
    <ul>
      <li>Allow fewer typos for short words.</li>
      <li>Prefer exact matches over typo matches.</li>
      <li>Disable fuzziness for SKUs, IDs, model numbers, and codes.</li>
      <li>Use query logs to see which typos actually happen.</li>
      <li>Show "did you mean" suggestions when rewriting could surprise the user.</li>
    </ul>
    <p>Fuzzy search solves the spelling problem. It does not solve the vocabulary problem. Rainy-day shoes and waterproof sneakers are still different words.</p>

    <h2>7. Synonyms: Teaching The System Your Domain</h2>
    <p>Now we reach the first obvious fix for our original problem.</p>
    <p>The user says shoes. The catalog says sneakers or trainers. The user says rainy days. The catalog says waterproof or water-resistant.</p>
    <p>Synonyms let you connect those terms.</p>
    <!-- detail-animation-7 -->
    <p>You might define rules like:</p>
    <ul>
      <li>sneakers, trainers, shoes</li>
      <li>rainy, waterproof, water-resistant</li>
      <li>grip, traction, outsole</li>
    </ul>
    <p>Now a search for shoes for rainy days can expand toward waterproof sneakers and water-resistant trainers.</p>
    <p>But synonyms are not just a thesaurus. They are domain decisions.</p>
    <p>Some synonyms are safe in both directions. Sneakers and trainers may often be equivalent depending on region. Some are one-way. Trail shoes are shoes, but not all shoes are trail shoes. Waterproof implies rain suitability, but rainy does not always mean waterproof. Some words are ambiguous. Apple means one thing in groceries and another in electronics.</p>
    <p>Bad synonym rules can destroy relevance. If you expand too broadly, the search engine becomes generous but confused.</p>
    <p>Good synonym work comes from real evidence: query logs, no-result searches, support messages, product taxonomy, and domain experts.</p>
    <p>Synonyms help lexical search understand vocabulary. But ecommerce queries often contain structure too.</p>

    <h2>8. Filters And Facets: Text Is Not Enough</h2>
    <p>A user rarely wants only "shoes". They want size 42, under $120, black, in stock, deliverable this week, suitable for rain, maybe from Nike or Salomon.</p>
    <p>That is not just text search. That is search plus structured constraints.</p>
    <!-- detail-animation-8 -->
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

    <h2>9. Autocomplete: Search Before The Search</h2>
    <p>Autocomplete is search before the user finishes searching.</p>
    <!-- detail-animation-9 -->
    <p>When someone types rain, the system might suggest rainy day shoes, waterproof sneakers, rain boots, trail running shoes, or water-resistant trainers.</p>
    <p>Autocomplete does several jobs:</p>
    <ul>
      <li>It saves typing.</li>
      <li>It teaches users what the catalog contains.</li>
      <li>It reduces zero-result queries.</li>
      <li>It nudges users toward searchable vocabulary.</li>
    </ul>
    <p>It can be built from prefix matching, edge n-grams, query logs, popular searches, product names, categories, and personalization.</p>
    <p>Autocomplete has to be fast. It also has to be careful. Bad suggestions make the system feel noisy. Over-personalized suggestions can feel creepy. Popular suggestions can bury niche needs.</p>
    <p>For our platform, autocomplete is a bridge between user language and catalog language. The user begins with rain, and the system gently suggests waterproof sneakers before the full query is even submitted.</p>

    <h2>10. Semantic Search: Meaning, Not Just Words</h2>
    <p>At this point, lexical search is fairly strong. We have exact matching, an inverted index, analysis, BM25, phrase matching, fuzzy search, synonyms, filters, and autocomplete.</p>
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
    <p>Semantic search is broader than vector search. You can model meaning with knowledge graphs, ontologies, taxonomies, rules, or structured domain relationships. Embeddings are just the most common modern approach because they scale well, work with natural language, and retrieve paraphrases without hand-writing every connection.</p>
    <!-- detail-animation-10 -->
    <p>The usual tool is an embedding model. An embedding turns text into a vector: a list of numbers representing something about meaning. Queries and products become points in a high-dimensional space. Similar meanings should land near one another.</p>
    <p>Now shoes for rainy days can be close to waterproof sneakers even if the words are different.</p>
    <p>This is powerful for vague intent, natural language, paraphrases, and discovery. It is also useful for the chatbot because users naturally speak in full sentences.</p>
    <p>But semantic search is not magic.</p>
    <p>It may blur details that should remain sharp. It might think hiking boots and waterproof sneakers are similar, even if the user wanted lightweight city shoes. It may ignore exact constraints like Nike, size 42, under $120, or a specific SKU. It may retrieve conceptually similar products that are wrong in practice.</p>
    <p>So semantic search improves recall over meaning, but it can hurt precision over constraints.</p>
    <p>That is why modern systems rarely choose pure lexical or pure semantic search. They combine them.</p>

    <h2>11. Vector Indexes: Making Semantic Search Fast</h2>
    <p>If every product has an embedding, searching means finding vectors near the query vector.</p>
    <p>For a small catalog, you can compare the query vector to every product vector. For a large catalog, that becomes expensive.</p>
    <p>Vector indexes solve this problem. They use approximate nearest neighbor search to find close vectors quickly without comparing against everything.</p>
    <!-- detail-animation-11 -->
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

    <h2>12. Hybrid Search: The Practical Default</h2>
    <p>Hybrid search combines lexical retrieval and semantic retrieval.</p>
    <!-- detail-animation-12 -->
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

    <h2>13. Reranking: Retrieve Broadly, Then Think Carefully</h2>
    <p>Most serious search systems are multi-stage.</p>
    <p>The first stage retrieves candidates quickly. The second stage reranks a smaller set more carefully.</p>
    <!-- detail-animation-13 -->
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

    <h2>14. Learning To Rank: Let Behavior Improve Ranking</h2>
    <p>At some point, rules and manual boosts become hard to manage.</p>
    <p>You may have signals like text score, vector score, price, rating, popularity, conversion rate, freshness, margin, availability, shipping speed, brand preference, and personalization. Combining them by hand becomes fragile.</p>
    <p>Learning to rank uses data to learn how signals should be weighted.</p>
    <!-- detail-animation-14 -->
    <p>The training data can come from human relevance judgments, clicks, purchases, add-to-cart events, query reformulations, or curated evaluation sets. The model learns which features tend to produce good rankings.</p>
    <p>For ecommerce, this can be powerful. But behavior data is biased. Users click what you show them. Popular products get more exposure. Higher-ranked products get more clicks because they are higher, not always because they are better.</p>
    <p>So learning to rank is not a magic replacement for judgment. It is a way to use evidence carefully.</p>

    <h2>15. The Chatbot Layer: Search Becomes Conversation</h2>
    <p>Now let us return to the chatbot.</p>
    <p>The user does not type a short query. They say:</p>
    <p><strong>I need shoes I can wear on rainy days, mostly for walking in the city, not hiking, and I do not want anything too expensive.</strong></p>
    <p>A chatbot has to do more than retrieve. It has to parse intent.</p>
    <!-- detail-animation-15 -->
    <p>It should identify:</p>
    <ul>
      <li>product type: shoes</li>
      <li>use case: rainy days</li>
      <li>terrain: city walking</li>
      <li>negative preference: not hiking</li>
      <li>price preference: not too expensive</li>
    </ul>
    <p>Then it should turn that into search actions: semantic retrieval for rainy-day intent, lexical matching for shoes, filters for category and price, maybe a negative filter or reranking penalty for hiking boots.</p>
    <p>This is retrieval-augmented conversation.</p>
    <p>The model should not invent products. It should use search tools, inspect product data, compare candidates, and answer with grounded recommendations.</p>
    <p>This is where the search platform becomes the foundation for the AI experience. The chatbot is not separate from search. It is another interface over search.</p>

    <h2>16. RAG: When The User Needs An Answer</h2>
    <p>Retrieval-augmented generation, or RAG, means the system retrieves relevant information and gives it to a language model so the model can answer.</p>
    <p>In ecommerce, RAG can answer questions like:</p>
    <ul>
      <li>Which of these shoes is better for heavy rain?</li>
      <li>Does this product work for trail running?</li>
      <li>What is the difference between waterproof and water-resistant?</li>
      <li>Which option is best under $120?</li>
    </ul>
    <p>But RAG quality depends on retrieval quality.</p>
    <p>If the system retrieves the wrong products, the answer is wrong. If it retrieves outdated inventory, the answer is wrong. If it ignores structured constraints, the answer may sound helpful but fail the user.</p>
    <p>A good RAG pipeline needs:</p>
    <ul>
      <li>clean product data</li>
      <li>strong lexical and semantic retrieval</li>
      <li>filters for constraints</li>
      <li>reranking</li>
      <li>citations or product references</li>
      <li>guardrails against unsupported claims</li>
    </ul>
    <p>The language model writes the answer. The search system supplies the evidence.</p>
    <!-- detail-animation-16 -->

    <h2>17. Agentic Search: When The System Needs To Plan</h2>
    <p>Agentic search starts when one search call is not enough.</p>
    <p>Suppose the user says:</p>
    <p><strong>I am traveling to London next week. I need shoes that can handle rain, look decent with casual outfits, and are comfortable for walking all day. Give me three options and explain the trade-offs.</strong></p>
    <p>The system may need to:</p>
    <ol>
      <li>Extract constraints.</li>
      <li>Search for waterproof or water-resistant city shoes.</li>
      <li>Filter by availability and price.</li>
      <li>Retrieve reviews or product attributes about comfort.</li>
      <li>Compare candidates.</li>
      <li>Ask a follow-up question if budget or style is unclear.</li>
      <li>Return a ranked recommendation with reasons.</li>
    </ol>
    <p>This is a task, not just a query.</p>
    <!-- detail-animation-17 -->
    <p>But the agent still depends on the search stack underneath it. It needs exact search, filters, semantic search, hybrid retrieval, reranking, and trustworthy product data. Without that foundation, the agent is just improvising.</p>

    <h2>18. Evaluation: You Cannot Improve Search By Vibes</h2>
    <p>At every stage, you need evaluation.</p>
    <p>Search quality is not something you feel once and declare solved. You measure it.</p>
    <p>Start with a query set. Include:</p>
    <ul>
      <li>head queries like shoes, nike, sneakers</li>
      <li>intent queries like shoes for rainy days</li>
      <li>exact queries like SKUs and model numbers</li>
      <li>typo queries</li>
      <li>synonym queries</li>
      <li>filter-heavy queries</li>
      <li>chat-style queries</li>
      <li>queries that currently return no results</li>
    </ul>
    <p>For each query, define what good results look like. Then measure.</p>
    <!-- detail-animation-18 -->
    <p>Useful metrics include:</p>
    <ul>
      <li><strong>Precision:</strong> of the results returned, how many are relevant?</li>
      <li><strong>Recall:</strong> of all relevant results, how many did we find?</li>
      <li><strong>MRR:</strong> how high is the first relevant result?</li>
      <li><strong>NDCG:</strong> how good is the ranking when relevance has degrees?</li>
      <li><strong>Recall@K:</strong> did the right product appear somewhere in the candidate set?</li>
      <li><strong>Latency:</strong> how long did the search take?</li>
      <li><strong>Zero-result rate:</strong> how often does the system fail to return anything?</li>
      <li><strong>Reformulation rate:</strong> how often do users have to search again?</li>
    </ul>
    <p>For ecommerce, also watch add-to-cart rate, conversion, revenue per search, filter usage, and abandonment. For chat, watch grounded answer rate, successful recommendation rate, and whether users ask corrective follow-ups.</p>
    <p>Evaluation is the difference between a demo and a search platform.</p>

    <h2>19. Debugging: Where Did Search Fail?</h2>
    <p>When search fails, do not only ask "why is ranking bad?" Ask where in the pipeline it failed.</p>
    <!-- detail-animation-19 -->
    <ol>
      <li><strong>Ingestion:</strong> did the product enter the system?</li>
      <li><strong>Parsing:</strong> did we extract the title, description, attributes, and variants correctly?</li>
      <li><strong>Analysis:</strong> did the analyzer create the right terms?</li>
      <li><strong>Indexing:</strong> did the product get indexed in the right fields?</li>
      <li><strong>Retrieval:</strong> did lexical or semantic search retrieve it?</li>
      <li><strong>Filtering:</strong> did a price, size, availability, or permission filter remove it?</li>
      <li><strong>Scoring:</strong> did it receive a low score for an understandable reason?</li>
      <li><strong>Reranking:</strong> did the reranker demote it?</li>
      <li><strong>Presentation:</strong> did the UI make a good result look bad?</li>
      <li><strong>Chat synthesis:</strong> did the model ignore or distort the retrieved evidence?</li>
    </ol>
    <p>Search debugging is easier when the system exposes traces: analyzed query terms, matched fields, BM25 scores, vector neighbors, filters applied, reranker scores, and final ranking explanations.</p>
    <p>Build those tools early. Your future self will thank you.</p>

    <h2>20. A Practical Build Order</h2>
    <p>If I were building this ecommerce search platform from zero, I would not start with agents.</p>
    <p>I would build it in this order:</p>
    <ol>
      <li><strong>Clean product data.</strong> Titles, descriptions, categories, attributes, variants, prices, inventory, and images.</li>
      <li><strong>Build exact and lexical search.</strong> Inverted index, analyzers, BM25, field boosts.</li>
      <li><strong>Add filters and facets.</strong> Category, brand, price, size, availability, color, waterproof, terrain.</li>
      <li><strong>Add typo tolerance.</strong> Carefully, with exceptions for codes and SKUs.</li>
      <li><strong>Add autocomplete.</strong> Product names, categories, popular queries, and query suggestions.</li>
      <li><strong>Add synonyms.</strong> Based on query logs and domain review.</li>
      <li><strong>Create evaluation sets.</strong> Before making advanced ranking changes.</li>
      <li><strong>Add semantic search.</strong> Use embeddings for intent and paraphrase.</li>
      <li><strong>Move to hybrid retrieval.</strong> Combine lexical and vector candidates.</li>
      <li><strong>Add reranking.</strong> Improve the top results where quality matters most.</li>
      <li><strong>Add chat on top.</strong> The chatbot should call search tools and respect structured constraints.</li>
      <li><strong>Add RAG and agentic flows.</strong> Only when the system needs answers, comparisons, or multi-step decisions.</li>
      <li><strong>Monitor and iterate.</strong> Search is never finished.</li>
    </ol>
    <p>This order is not the only path, but it is a sane one. It starts with the foundation and adds intelligence only when the earlier layer has exposed a real limitation.</p>

    <h2>21. The Core Mental Model</h2>
    <p>The whole story can be compressed into one sentence:</p>
    <p><strong>Search is the engineering of translation between user intent and stored evidence.</strong></p>
    <p>Exact matching translates characters. Analyzers translate text into terms. BM25 translates term evidence into lexical relevance. Synonyms translate vocabulary. Filters translate constraints. Embeddings translate meaning. Hybrid search translates across retrieval methods. Rerankers translate candidate sets into better ordering. RAG translates retrieved evidence into answers. Agents translate user goals into multi-step retrieval plans.</p>
    <p>Each layer exists because the previous layer was useful but incomplete.</p>
    <p>So when you hear about a new search technique, do not ask: is this the future of search?</p>
    <p>Ask: which failure mode does this solve?</p>
    <p>That question will keep you grounded.</p>
    <p>The future of search is not simply semantic, or conversational, or agentic. It is layered. Exact when exactness matters. Lexical when words carry the signal. Structured when constraints matter. Semantic when vocabulary diverges. Hybrid when real queries mix all of it. Conversational when the user needs help deciding.</p>
    <p>The user types a few words. The system has to understand the need, find the evidence, respect the constraints, rank the candidates, and present something useful.</p>
    <p>That is the craft.</p>
  `,
};
