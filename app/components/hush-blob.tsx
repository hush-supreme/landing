"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const EXPRESSIONS = [
  "crossed_out_eyes",
  "original",
  "closed_eyes_smiling",
  "sleepy",
  "surprised",
  "winking",
] as const;
type Expression = (typeof EXPRESSIONS)[number];

const EXPRESSION_LABELS: Record<Expression, string> = {
  crossed_out_eyes: "overwhelmed",
  original: "calm",
  closed_eyes_smiling: "happy",
  sleepy: "sleepy",
  surprised: "surprised",
  winking: "winking",
};

const CYCLE_MS = 2000;

const BODY_PATH =
  "M75 0C33.455 0 0 49.821 0 91.071C0 127.967 28.037 149.999 75 149.999C121.963 149.999 150 127.968 150 91.071C150 49.821 116.544 0 75 0Z";

const BODY_COLOR = "#EDB6D4";
const FEATURE_COLOR = "#0a0a0a";

function CrossedOutEyesFace() {
  return (
    <>
      <path d="M40 52L54 66M54 52L40 66" stroke={FEATURE_COLOR} strokeWidth={4} strokeLinecap="round" />
      <path d="M96 52L110 66M110 52L96 66" stroke={FEATURE_COLOR} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx={75} cy={82} rx={5} ry={7} fill={FEATURE_COLOR} />
    </>
  );
}

function OriginalFace() {
  return (
    <>
      <circle cx={50} cy={60} r={6} fill={FEATURE_COLOR} />
      <circle cx={100} cy={60} r={6} fill={FEATURE_COLOR} />
      <path d="M62 82L88 82" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
    </>
  );
}

function ClosedEyesSmilingFace() {
  return (
    <>
      <path d="M40 62C44 55 56 55 60 62" stroke={FEATURE_COLOR} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M90 62C94 55 106 55 110 62" stroke={FEATURE_COLOR} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M62 80C66 86 84 86 88 80" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" fill="none" />
    </>
  );
}

function SleepyFace() {
  return (
    <>
      {/* Half-closed droopy eyes */}
      <path d="M40 62C44 58 56 58 60 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      <path d="M90 62C94 58 106 58 110 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      {/* Slight pout */}
      <path d="M66 82C70 85 80 85 84 82" stroke={FEATURE_COLOR} strokeWidth={2.5} strokeLinecap="round" fill="none" />
    </>
  );
}

function SurprisedFace() {
  return (
    <>
      {/* Wide eyes */}
      <circle cx={50} cy={58} r={8} fill={FEATURE_COLOR} />
      <circle cx={100} cy={58} r={8} fill={FEATURE_COLOR} />
      {/* O mouth */}
      <ellipse cx={75} cy={84} rx={6} ry={8} fill={FEATURE_COLOR} />
    </>
  );
}

function WinkingFace() {
  return (
    <>
      {/* Open eye */}
      <circle cx={50} cy={60} r={6} fill={FEATURE_COLOR} />
      {/* Wink */}
      <path d="M90 62C94 56 106 56 110 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      {/* Smirk */}
      <path d="M60 80C66 87 84 87 90 82" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" fill="none" />
    </>
  );
}

const FACES = [CrossedOutEyesFace, OriginalFace, ClosedEyesSmilingFace, SleepyFace, SurprisedFace, WinkingFace];

interface HushBlobProps {
  className?: string;
  style?: React.CSSProperties;
}

export function HushBlob({ className, style }: HushBlobProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % EXPRESSIONS.length);
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const advance = () => {
    setActiveIndex((i) => (i + 1) % EXPRESSIONS.length);
    startTimer();
  };

  return (
    <svg
      viewBox="0 0 150 150"
      fill="none"
      className={className}
      style={{ ...style, cursor: "pointer" }}
      role="img"
      aria-label={`Hush blob feeling ${EXPRESSION_LABELS[EXPRESSIONS[activeIndex]]}`}
      onClick={advance}
    >
      <path d={BODY_PATH} fill={BODY_COLOR} />
      {FACES.map((Face, i) => (
        <g
          key={EXPRESSIONS[i]}
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.15s linear",
          }}
        >
          <Face />
        </g>
      ))}
    </svg>
  );
}
