import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ShareImageProps = {
  params: Promise<{ slug: string }>;
};

export async function createArticleShareImage({ params }: ShareImageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title =
    article?.title ?? "From Keywords to Meaning: A Complete Guide to Text Search";
  const excerpt =
    article?.excerpt ??
    "A practical map for engineers who want to build text search.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f9f7f3",
          color: "#292524",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "62px 70px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "46%",
            paddingRight: 46,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#2563eb",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 4,
                marginBottom: 26,
                textTransform: "uppercase",
              }}
            >
              Search map
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.04,
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#6b6764",
                display: "flex",
                flexWrap: "wrap",
                fontSize: 22,
                lineHeight: 1.35,
                marginTop: 22,
              }}
            >
              {excerpt}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#6b6764",
                fontSize: 20,
                fontWeight: 700,
                marginTop: 22,
              }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                background: "#2563eb",
              }}
            />
            Farel Ganlaky
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "54%",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "#6b6764",
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              One problem, different tools
            </div>
            <div
              style={{
                borderRadius: 999,
                background: "rgba(37, 99, 235, 0.1)",
                color: "#2563eb",
                fontSize: 17,
                fontWeight: 800,
                padding: "8px 14px",
              }}
            >
              Exact keyword
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              border: "1px solid rgba(41, 37, 36, 0.08)",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.54)",
              padding: "18px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: 999,
                background: "rgba(37, 99, 235, 0.1)",
                color: "#2563eb",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              ?
            </div>
            <div style={{ fontSize: 29, fontWeight: 800 }}>
              shoes for rainy days
            </div>
            <div
              style={{
                marginLeft: "auto",
                borderRadius: 999,
                background: "rgba(41, 37, 36, 0.06)",
                color: "#6b6764",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 2,
                padding: "8px 12px",
                textTransform: "uppercase",
              }}
            >
              Literal match
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                color: "#6b6764",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Literal query tokens
            </div>
            {["shoes", "rainy", "days"].map((token) => (
              <div
                key={token}
                style={{
                  border: "1px solid rgba(37, 99, 235, 0.35)",
                  borderRadius: 999,
                  background: "rgba(37, 99, 235, 0.1)",
                  color: "#2563eb",
                  fontSize: 18,
                  fontWeight: 800,
                  padding: "8px 14px",
                }}
              >
                {token}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <ProductCard
              active
              eyebrow="Literal token found"
              title="Trail shoes"
              body="Storm-ready traction."
            />
            <ProductCard
              eyebrow="Good product, wrong words"
              title="Waterproof sneakers"
              body="Dry mesh, grippy sole."
            />
            <ProductCard
              eyebrow="Good product, wrong words"
              title="Water-resistant trainers"
              body="Wet pavement walking."
            />
          </div>

          <div
            style={{
              display: "flex",
              borderLeft: "5px solid #2563eb",
              color: "#6b6764",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1.35,
              paddingLeft: 18,
            }}
          >
            Literal match: search starts by asking whether the words appear as written.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function ProductCard({
  active = false,
  body,
  eyebrow,
  title,
}: {
  active?: boolean;
  body: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: 198,
        border: active
          ? "1px solid rgba(37, 99, 235, 0.35)"
          : "1px dashed rgba(41, 37, 36, 0.12)",
        borderRadius: 16,
        background: active ? "rgba(37, 99, 235, 0.09)" : "rgba(255, 255, 255, 0.42)",
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#6b6764",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          color: "#292524",
          fontSize: 21,
          fontWeight: 800,
          lineHeight: 1.14,
          marginTop: 12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#6b6764",
          fontSize: 17,
          lineHeight: 1.35,
          marginTop: 12,
        }}
      >
        {body}
      </div>
    </div>
  );
}
