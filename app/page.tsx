import { HushBlob } from "./components/hush-blob";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <main className="flex max-w-3xl flex-col items-center gap-4 text-center">
        {/* Blob + wordmark lockup */}
        <div className="animate-fade-up flex flex-row items-center gap-4 sm:gap-6">
          <div className="animate-blob-float size-32 sm:size-40 lg:size-48">
            <HushBlob className="size-full" />
          </div>
          <h1 className="text-[7rem] font-bold tracking-tighter text-foreground sm:text-[10rem] lg:text-[12rem]">
            hush
          </h1>
        </div>

        <p
          className="animate-fade-up text-lg text-pink-dim sm:text-xl"
          style={{ animationDelay: "150ms" }}
        >
          A boundary your phone can&rsquo;t bypass.
        </p>

        <p
          className="animate-fade-up max-w-sm text-base leading-relaxed text-muted"
          style={{ animationDelay: "250ms" }}
        >
          Tap to lock your apps. Tap again to unlock.
          <br />
          The rest of your time is yours.
        </p>

        <a
          href="https://www.hushscreentime.com/"
          className="animate-fade-up mt-2 inline-flex items-center gap-2 rounded-full bg-pink px-8 py-3.5 text-sm font-semibold tracking-wide text-background transition-all hover:brightness-110"
          style={{ animationDelay: "300ms" }}
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
