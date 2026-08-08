import { ImageResponse } from "next/og";

export const alt = "Hamza Outmassint — Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "54px 58px",
        background: "#F2F0E8",
        color: "#171714",
        fontFamily: "Arial, sans-serif",
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.12em",
        }}
      >
        <span>Hamza O.</span>
        <span>Full-stack developer</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 150,
          fontWeight: 700,
          letterSpacing: "-0.075em",
          lineHeight: 0.78,
        }}
      >
        <span>Hamza</span>
        <span style={{ alignSelf: "flex-end" }}>Outmassint<span style={{ color: "#E4512A" }}>.</span></span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #C9C6BC",
          paddingTop: 18,
          fontSize: 18,
          letterSpacing: "0.08em",
        }}
      >
        <span>Marrakech, Morocco</span>
        <span>Design ↔ Code ↔ Product</span>
      </div>
    </div>,
    size,
  );
}
