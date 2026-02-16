"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Expressions ──────────────────────────────────────────────

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

// ── SVG constants ────────────────────────────────────────────

const BODY_PATH =
  "M75 0C33.455 0 0 49.821 0 91.071C0 127.967 28.037 149.999 75 149.999C121.963 149.999 150 127.968 150 91.071C150 49.821 116.544 0 75 0Z";

const BODY_COLOR = "#EDB6D4";
const FEATURE_COLOR = "#0a0a0a";

// ── Face components ──────────────────────────────────────────

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
      <path d="M40 62C44 58 56 58 60 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      <path d="M90 62C94 58 106 58 110 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      <path d="M66 82C70 85 80 85 84 82" stroke={FEATURE_COLOR} strokeWidth={2.5} strokeLinecap="round" fill="none" />
    </>
  );
}

function SurprisedFace() {
  return (
    <>
      <circle cx={50} cy={58} r={8} fill={FEATURE_COLOR} />
      <circle cx={100} cy={58} r={8} fill={FEATURE_COLOR} />
      <ellipse cx={75} cy={84} rx={6} ry={8} fill={FEATURE_COLOR} />
    </>
  );
}

function WinkingFace() {
  return (
    <>
      <circle cx={50} cy={60} r={6} fill={FEATURE_COLOR} />
      <path d="M90 62C94 56 106 56 110 62" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" />
      <path d="M60 80C66 87 84 87 90 82" stroke={FEATURE_COLOR} strokeWidth={3} strokeLinecap="round" fill="none" />
    </>
  );
}

const FACES = [CrossedOutEyesFace, OriginalFace, ClosedEyesSmilingFace, SleepyFace, SurprisedFace, WinkingFace];

// ── Component ────────────────────────────────────────────────

const BOUNCE_DURATION = 1.9;
const FACE_CHANGE_INTERVAL = BOUNCE_DURATION * 2.5;

interface HushBlobProps {
  className?: string;
  style?: React.CSSProperties;
}

export function HushBlob({ className, style }: HushBlobProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ── Face cycling — change expression every ~2.5 bounces ──

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % EXPRESSIONS.length);
    }, FACE_CHANGE_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Mouse tilt ────────────────────────────────────────

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseSpring = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, mouseSpring);
  const smoothY = useSpring(mouseY, mouseSpring);

  const tiltY = useTransform(smoothX, [-1, 1], [-7, 7]);
  const tiltX = useTransform(smoothY, [-1, 1], [7, -7]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(Math.max(-1, Math.min(1, (e.clientX - cx) / 150)));
      mouseY.set(Math.max(-1, Math.min(1, (e.clientY - cy) / 150)));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // ── Render ──────────────────────────────────────────────

  return (
    <motion.div
      ref={wrapperRef}
      className={className}
      style={{
        perspective: 600,
        rotateX: tiltX,
        rotateY: tiltY,
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.svg
        viewBox="0 0 150 150"
        fill="none"
        className="size-full"
        style={{
          ...style,
          transformOrigin: "center bottom",
          willChange: "transform",
        }}
        animate={{
          y: [0, 40, 18, 0],
          scaleX: [1, 1.12, 0.96, 1],
          scaleY: [1, 0.82, 1.05, 1],
        }}
        transition={{
          duration: BOUNCE_DURATION,
          repeat: Infinity,
          times: [0, 0.4, 0.6, 1],
          ease: ["easeIn", "easeOut", "easeOut"],
        }}
        role="img"
        aria-label={`Hush blob feeling ${EXPRESSION_LABELS[EXPRESSIONS[activeIndex]]}`}
      >
        <path d={BODY_PATH} fill={BODY_COLOR} />
        {FACES.map((Face, i) => (
          <g
            key={EXPRESSIONS[i]}
            style={{
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.35s ease-in-out",
            }}
          >
            <Face />
          </g>
        ))}
      </motion.svg>
    </motion.div>
  );
}
