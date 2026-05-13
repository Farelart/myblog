import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

type NewsletterPayload = {
  email?: unknown;
  source?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGNUP_LOG_PREFIX = "NEWSLETTER_SIGNUP";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);

  if (!email || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const signup = {
    email,
    source: normalizeSource(payload.source),
    createdAt: new Date().toISOString(),
  };

  if (shouldWriteLocalFile()) {
    await saveSignupLocally(signup);
  } else {
    console.info(SIGNUP_LOG_PREFIX, signup);
  }

  return Response.json({ ok: true });
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function normalizeSource(value: unknown) {
  if (typeof value !== "string") return "unknown";

  const source = value.trim().toLowerCase();
  if (!source) return "unknown";

  return source.replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "unknown";
}

function shouldWriteLocalFile() {
  return process.env.NODE_ENV !== "production" && !process.env.VERCEL;
}

async function saveSignupLocally(signup: {
  createdAt: string;
  email: string;
  source: string;
}) {
  const dataDirectory = path.join(process.cwd(), "data");
  const filePath = path.join(dataDirectory, "newsletter-signups.jsonl");

  await mkdir(dataDirectory, { recursive: true });
  await appendFile(filePath, `${JSON.stringify(signup)}\n`, "utf8");
}
