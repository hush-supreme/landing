"use client";

import { HushBlob } from "@landing/app/components/hush-blob";
import { AnimatePresence, motion, useInView } from "framer-motion";
import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";

// ── Animation helpers ──────────────────────────────────────

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}): ReactNode {
  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Icons ──────────────────────────────────────────────────

function ArrowRightIcon(): ReactNode {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10m0 0L9 4m4 4L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NfcIcon(): ReactNode {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
      <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
      <path d="M12.91 4.1a16.1 16.1 0 0 1 0 15.8" />
      <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
    </svg>
  );
}

// ── Waitlist Form ──────────────────────────────────────────

function WaitlistForm({
  large = false,
}: {
  large?: boolean;
}): ReactNode {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-6 py-3.5 text-sm font-semibold text-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8.5l3.5 3.5L13 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {message}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={`flex w-full items-center gap-2 rounded-full border border-foreground/[0.08] bg-background-light p-1.5 transition-colors focus-within:border-accent/30 ${
              large ? "sm:p-2" : ""
            }`}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              required
              className={`min-w-0 flex-1 bg-transparent px-4 text-foreground placeholder-muted/60 outline-none ${
                large ? "text-base" : "text-sm"
              }`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`group inline-flex shrink-0 items-center gap-2 rounded-full bg-pink font-bold tracking-wide text-background transition-all duration-300 hover:shadow-[0_0_40px_rgba(237,182,212,0.25)] active:scale-[0.97] disabled:opacity-60 ${
                large ? "px-7 py-3 text-sm" : "px-5 py-2.5 text-xs"
              }`}
            >
              {status === "loading" ? (
                <motion.div
                  className="size-4 rounded-full border-2 border-background/30 border-t-background"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ) : (
                <>
                  Join Waitlist
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRightIcon />
                  </span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-xs text-pink-dim"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// ── Section: Hero ──────────────────────────────────────────

function HeroSection(): ReactNode {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative flex max-w-3xl flex-col items-center gap-5 text-center">
        {/* Blob + wordmark lockup */}
        <motion.div
          className="flex flex-row items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="size-28 -translate-y-8 sm:size-36 lg:size-44">
            <HushBlob className="size-full" />
          </div>
          <h1 className="text-[6rem] font-black tracking-tighter text-foreground sm:text-[9rem] lg:text-[11rem]">
            hush
          </h1>
        </motion.div>

        <motion.p
          className="text-xl font-semibold text-pink sm:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          A boundary your phone can&rsquo;t bypass.
        </motion.p>

        <motion.p
          className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Tap to lock your apps. Tap again to unlock.
          <br />
          The rest of your time is yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 w-full max-w-md"
        >
          <WaitlistForm />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          className="h-10 w-5 rounded-full border-2 border-muted/30 p-1"
          animate={{}}
        >
          <motion.div
            className="h-2 w-1.5 rounded-full bg-muted/50 mx-auto"
            animate={{ y: [0, 14, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Section: The Problem ───────────────────────────────────

function ProblemSection(): ReactNode {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            The problem
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Digital blockers are built to be bypassed.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Three taps. That&rsquo;s all it takes to override every app blocker
            on the market. They rely on willpower &mdash; the very thing
            you&rsquo;ve already run out of.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                text: "You set a limit",
                sub: "Feeling motivated",
              },
              {
                step: "2",
                text: "The popup appears",
                sub: '"Just 5 more minutes"',
              },
              {
                step: "3",
                text: "You tap ignore",
                sub: "Every. Single. Time.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-foreground/[0.06] bg-background-light px-6 py-6"
              >
                <span className="text-sm font-bold text-pink">
                  Step {item.step}
                </span>
                <p className="mt-2 text-lg font-bold text-foreground">
                  {item.text}
                </p>
                <p className="mt-1 text-sm text-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-10 text-center text-lg font-semibold text-pink-dim">
            Hush doesn&rsquo;t ask you to resist. It makes the choice physical.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Section: How It Works ──────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Create a mode",
    description:
      "Choose which apps to block — or flip it around and only allow the ones you need. Name it, customize it, make it yours.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Place your token",
    description:
      "Put it across the room, in a drawer, in your bag. The further away, the stronger the friction. That distance is the product.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Tap to hush",
    description:
      "One tap on your token and your apps are locked. When the urge to scroll hits, you'd have to walk over and tap again. That pause changes everything.",
    icon: <NfcIcon />,
  },
];

function HowItWorksSection(): ReactNode {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            How it works
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Three steps. No willpower required.
          </h2>
        </FadeIn>

        <motion.div
          className="mt-16 flex flex-col gap-0"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={FADE_UP}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-6 sm:gap-8"
            >
              {/* Vertical connector */}
              <div className="flex flex-col items-center">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-background-light text-accent">
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="step-line my-0 w-px flex-1 min-h-8" />
                )}
              </div>

              {/* Content */}
              <div className="pb-14">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent/60">
                  {step.number}
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: The Token ─────────────────────────────────────

function TokenSection(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Token visual */}
          <FadeIn>
            <div className="relative flex items-center justify-center">
              {/* Glow ring */}
              <div className="animate-pulse-glow absolute h-64 w-64 rounded-full bg-accent/10 blur-[60px]" />

              {/* Token circle */}
              <motion.div
                className="relative flex size-56 items-center justify-center rounded-full border border-accent/20 bg-gradient-to-b from-background-card to-background-light sm:size-64"
                animate={
                  isInView
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(132,201,151,0)",
                          "0 0 60px 10px rgba(132,201,151,0.15)",
                          "0 0 0 0 rgba(132,201,151,0)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* NFC waves */}
                <div className="text-accent">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                    <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                    <path d="M12.91 4.1a16.1 16.1 0 0 1 0 15.8" />
                    <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
                  </svg>
                </div>

                {/* Inner ring */}
                <div className="absolute inset-3 rounded-full border border-accent/[0.08]" />
              </motion.div>
            </div>
          </FadeIn>

          {/* Token copy */}
          <div>
            <FadeIn>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                The token
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                The magic is in
                <br />
                the distance.
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                Your token isn&rsquo;t in your pocket &mdash; it&rsquo;s across
                the room, in your bag, or wherever you choose to keep it. When
                the urge to scroll hits, you have to make a conscious choice to
                walk over and tap.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                That moment of pause is usually all it takes. The walk gives
                your brain enough time to ask:{" "}
                <span className="font-semibold text-foreground">
                  &ldquo;Do I actually need this?&rdquo;
                </span>
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-6 text-sm font-semibold text-pink-dim">
                Not a gimmick. Not an accessory. The physical friction is the
                entire product.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section: Features ──────────────────────────────────────

const FEATURES = [
  {
    title: "Custom Modes",
    description:
      "Block specific apps or allow only what you need. Create unlimited modes for work, sleep, study — whatever fits your life.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v18m-6-6h12M6 9h12" />
      </svg>
    ),
  },
  {
    title: "Live Activity",
    description:
      "See your hush timer right on the lock screen. Always know how long you've been focused without opening the app.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Statistics",
    description:
      "Track your daily and weekly hushed time. Watch your screen time go down as your real life goes up.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    title: "Emergency Unhush",
    description:
      "Five emergency overrides when you genuinely need an app. Because life happens — Hush isn't a prison.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 9v4m0 4h.01M3.6 18h16.8c.9 0 1.35 0 1.58-.17a1 1 0 0 0 .42-.83c0-.24-.22-.53-.68-1.1L13.32 4.1c-.46-.58-.69-.87-.97-.98a1 1 0 0 0-.7 0c-.28.11-.51.4-.97.98L2.28 15.9c-.46.57-.68.86-.68 1.1a1 1 0 0 0 .42.83C2.25 18 2.7 18 3.6 18Z" />
      </svg>
    ),
  },
  {
    title: "NFC Powered",
    description:
      "No Bluetooth. No batteries. No charging. Just tap your phone to the token — it works every time, instantly.",
    icon: <NfcIcon />,
  },
  {
    title: "Personality Built In",
    description:
      "Meet the blob. It celebrates your wins, sleeps when you're hushed, and reacts to everything you do. It's your focus companion.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
];

function FeaturesSection(): ReactNode {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-pink/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Features
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Everything you need.
            <br />
            Nothing you don&rsquo;t.
          </h2>
        </FadeIn>

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={FADE_UP}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-2xl border border-foreground/[0.06] bg-background-light p-6 transition-colors duration-300 hover:border-accent/20 hover:bg-background-card"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/15">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Section: Final CTA + Footer ────────────────────────────

function FooterSection(): ReactNode {
  return (
    <section className="relative px-6 pb-16 pt-32 sm:pt-40">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-pink/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <FadeIn>
          <div className="mx-auto size-20">
            <HushBlob className="size-full" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Ready to take back
            <br />
            your attention?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            No willpower required &mdash; just physics.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex justify-center">
            <WaitlistForm large />
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <FadeIn delay={0.4}>
        <footer className="mx-auto mt-32 flex max-w-4xl flex-col items-center gap-6 border-t border-foreground/[0.06] pt-8">
          <div className="flex items-center gap-6 text-sm text-muted">
            <a
              href="https://www.hushscreentime.com/"
              className="transition-colors hover:text-foreground"
            >
              Website
            </a>
            <span className="text-foreground/10">|</span>
            <a
              href="https://www.hushscreentime.com/"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <span className="text-foreground/10">|</span>
            <a
              href="https://www.hushscreentime.com/"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} Hush. All rights reserved.
          </p>
        </footer>
      </FadeIn>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────

export default function Home(): ReactNode {
  return (
    <div className="grain">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <TokenSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
}
