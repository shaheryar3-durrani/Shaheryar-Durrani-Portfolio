import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} · ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 110%, #9f553c 0%, #1a1519 55%)",
          color: "#f2ece5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 30, fontWeight: 700 }}>
          {profile.initials}
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#c8704f" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#c8704f", letterSpacing: 4, textTransform: "uppercase" }}>
            {`${profile.title} · ${profile.discipline}`}
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, marginTop: 20, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 28, color: "#aaa99b", marginTop: 28 }}>{`${profile.location} · ${profile.tagline}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
