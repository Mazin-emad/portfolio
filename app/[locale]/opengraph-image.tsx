import { ImageResponse } from "next/og";

export const alt = "Mazin Emad — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          color: "#ecebe6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          Mazin<span style={{ color: "#c5f82a" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>Full-stack products,</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, color: "#c5f82a" }}>built Arabic-first.</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8b9099" }}>Mazin Emad · Software Engineer · Egypt</div>
      </div>
    ),
    size,
  );
}
