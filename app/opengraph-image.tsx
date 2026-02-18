import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hush — NFC-Powered Focus Mode";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#142e07",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(132,201,151,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Blob circle as simple placeholder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {/* Pink blob shape */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              backgroundColor: "#edb6d4",
              position: "relative",
              marginBottom: 20,
            }}
          />
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: "#f8ffef",
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            hush
          </span>
        </div>

        <p
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#edb6d4",
            marginTop: 16,
          }}
        >
          A boundary your phone can&apos;t bypass.
        </p>

        <p
          style={{
            fontSize: 22,
            color: "#8aad78",
            marginTop: 8,
          }}
        >
          NFC-Powered Focus Mode
        </p>
      </div>
    ),
    { ...size },
  );
}
