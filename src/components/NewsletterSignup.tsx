"use client";

import { FormEvent, useId, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

type NewsletterSignupProps = {
  className?: string;
  source: "article" | "home";
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup({
  className = "",
  source,
}: NewsletterSignupProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      setEmail("");
      setStatus("success");
      setMessage("Thank you. You are on the list. I will let you know when something new drops.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className={className}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--muted)">
        <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Stay up to date</span>
      </div>
      <p className="mt-4 text-[14px] text-(--muted)">
        Get notified when I publish something new.
      </p>
      <form className="mt-5 flex gap-2" onSubmit={handleSubmit}>
        <input
          id={inputId}
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "submitting") {
              setStatus("idle");
              setMessage("");
            }
          }}
          className="h-[42px] min-w-0 flex-1 rounded-md border border-[rgba(41,37,36,0.14)] bg-transparent px-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-(--muted) focus:border-(--accent)"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-[42px] rounded-md bg-[#171820] px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {status === "submitting" ? "Joining" : "Join"}
        </button>
      </form>
      {message ? (
        <p
          aria-live="polite"
          className={`mt-3 text-[13px] ${
            status === "error" ? "text-[#b45309]" : "text-(--accent)"
          }`}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
