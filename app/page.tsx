export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <main className="flex max-w-xl flex-col items-center gap-8 text-center">
        <h1
          className="text-8xl font-bold tracking-tighter text-foreground sm:text-9xl"
          style={{ animationDelay: "0ms" }}
        >
          hush
        </h1>

        <p
          className="max-w-md text-xl leading-relaxed text-muted sm:text-2xl"
          style={{ animationDelay: "120ms" }}
        >
          No willpower required&nbsp;&mdash; just physics.
        </p>

        <p
          className="max-w-sm text-base leading-relaxed text-muted/70"
          style={{ animationDelay: "240ms" }}
        >
          An NFC token you keep out of reach. Tap to lock your apps. Tap again
          to unlock. The friction is real&nbsp;&mdash; and that&rsquo;s the
          point.
        </p>

        <a
          href="https://gethush.io"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(74,222,128,0.25)]"
          style={{ animationDelay: "400ms" }}
        >
          Get Early Access
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
        </a>
      </main>
    </div>
  );
}
