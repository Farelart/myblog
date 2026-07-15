import Image from "next/image";
import {
  FaArrowRight,
  FaDatabase,
  FaMagnifyingGlass,
  FaShoePrints,
  FaUmbrella,
} from "react-icons/fa6";

const intentWords = ["shoes", "rainy days"];
const intentImage = {
  label: "shoes for rainy days",
  image:
    "https://images.pexels.com/photos/5310910/pexels-photo-5310910.jpeg?auto=compress&cs=tinysrgb&w=640",
};
const productImages = [
  {
    label: "waterproof sneakers",
    image:
      "https://images.unsplash.com/photo-1698018574308-929deec9f832?auto=format&fit=crop&q=80&w=640",
  },
  {
    label: "water-resistant trainers",
    image:
      "https://images.pexels.com/photos/5310910/pexels-photo-5310910.jpeg?auto=compress&cs=tinysrgb&w=640",
  },
  {
    label: "trail shoes",
    image:
      "https://images.unsplash.com/photo-1760465809553-ddcbe4bb4753?auto=format&fit=crop&q=80&w=640",
  },
];

export default function IntroMismatchIllustration() {
  return (
    <section
      aria-label="Illustration of the mismatch between user intent and catalog language"
      className="article-animation article-animation-mismatch intro-mismatch overflow-hidden"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--muted)">
          <FaMagnifyingGlass className="h-3.5 w-3.5 text-(--accent)" />
          <span>The mismatch</span>
        </div>
        <span className="rounded-full bg-[rgba(245,184,35,0.32)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b5510]">
          same need, different words
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        <div className="rounded-md border border-[rgba(37,99,235,0.14)] bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(37,99,235,0.1)] text-(--accent)">
              <FaUmbrella className="h-4 w-4" />
            </span>
            What you mean
          </div>
          <div className="flex flex-wrap gap-2">
            {intentWords.map((word) => (
              <span
                key={word}
                className="intro-mismatch-token rounded-full bg-[rgba(37,99,235,0.1)] px-3 py-1.5 text-sm font-semibold text-(--accent)"
              >
                {word}
              </span>
            ))}
          </div>
          <figure className="intro-product-card mt-4">
            <Image
              src={intentImage.image}
              alt={intentImage.label}
              width={640}
              height={360}
              sizes="(max-width: 640px) 100vw, 320px"
              className="h-36 w-full rounded-md object-cover"
            />
            <figcaption className="mt-2">
              <span className="article-keyword text-[12px] font-semibold">
                {intentImage.label}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="hidden items-center justify-center px-1 sm:flex">
          <div className="intro-mismatch-arrow flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-white text-(--muted)">
            <FaArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="rounded-md border border-[rgba(41,37,36,0.1)] bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(245,184,35,0.28)] text-[#8a6113]">
              <FaDatabase className="h-4 w-4" />
            </span>
            What the catalog says
          </div>
          <div className="flex flex-wrap gap-2">
            {productImages.map((product) => (
              <span
                key={product.label}
                className="intro-catalog-token rounded-full bg-[rgba(245,184,35,0.26)] px-3 py-1.5 text-sm font-semibold text-[#6f5420]"
              >
                {product.label}
              </span>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {productImages.map((product) => (
              <figure key={product.label} className="intro-product-card">
                <Image
                  src={product.image}
                  alt={product.label}
                  width={320}
                  height={180}
                  sizes="(max-width: 640px) 100vw, 150px"
                  className="h-24 w-full rounded-md object-cover"
                />
                <figcaption className="mt-2">
                  <span className="article-keyword text-[12px] font-semibold">
                    {product.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-md border border-[rgba(41,37,36,0.08)] bg-[rgba(249,247,243,0.76)] p-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-(--muted)">
          <FaShoePrints className="h-4 w-4 text-(--accent)" />
          Search&apos;s job
        </div>
        <p className="text-sm leading-6 text-(--muted)">
          Translate the words you use into the words the system has, without
          losing the intent in between.
        </p>
      </div>
    </section>
  );
}
