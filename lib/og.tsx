import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 } as const;

const dir = path.join(process.cwd(), "assets", "og");
const load = (f: string) => readFile(path.join(dir, f));
const dataUri = async (f: string, mime: string) =>
  `data:${mime};base64,${(await load(f)).toString("base64")}`;

async function fonts(rtl: boolean) {
  const [lat700, lat400, brico] = await Promise.all([
    load("plex-lat-700.woff"),
    load("plex-lat-400.woff"),
    load("bricolage-700.woff"),
  ]);
  const base = [
    { name: "Plex", data: lat700, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: lat400, weight: 400 as const, style: "normal" as const },
    { name: "Display", data: brico, weight: 700 as const, style: "normal" as const },
  ];
  if (!rtl) return base;
  const [ar700, ar400] = await Promise.all([load("plex-ar-700.woff"), load("plex-ar-400.woff")]);
  return [
    { name: "Plex", data: ar700, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: ar400, weight: 400 as const, style: "normal" as const },
    ...base,
  ];
}

export type OgOptions = {
  locale: string;
  /** Small label above the title, e.g. "Case study". */
  eyebrow: string;
  title: string;
  /** Second, accent-coloured line (home only). */
  accent?: string;
  subtitle?: string;
  visual?: { type: "portrait" } | { type: "cover"; slug: string };
  tagline: string;
};

/**
 * Text that keeps its visual order in RTL. satori does not run the bidi algorithm, so Arabic is
 * laid out word by word in a reversed row (Arabic letters still shape correctly inside a word).
 */
function Words({ text, rtl, style }: { text: string; rtl: boolean; style: React.CSSProperties }) {
  if (!rtl) return <div style={{ display: "flex", ...style }}>{text}</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        width: "100%",
        ...style,
      }}
    >
      {text.split(" ").map((w, i) => (
        <div key={i} style={{ display: "flex", marginLeft: "0.4em" }}>
          {w}
        </div>
      ))}
    </div>
  );
}

/** Branded 1200×630 share image, in the visitor's language (RTL-aware). */
export async function renderOg(o: OgOptions) {
  const rtl = o.locale === "ar";
  const [fontData, portrait, cover] = await Promise.all([
    fonts(rtl),
    o.visual?.type === "portrait" ? dataUri("portrait.png", "image/png") : null,
    o.visual?.type === "cover" ? dataUri(`covers/${o.visual.slug}.jpg`, "image/jpeg") : null,
  ]);

  const displayFont = rtl ? "Plex" : "Display";
  // satori mis-spaces Arabic words that carry tashkeel, and the image doesn't need them
  const strip = (v: string) => (rtl ? v.replace(/[ً-ْ]/g, "") : v);
  const title = strip(o.title);
  const titleSize = title.length > 38 ? 66 : 84;
  const host = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        direction: rtl ? "rtl" : "ltr",
        background: "#07080a",
        backgroundImage:
          "radial-gradient(circle at 78% 30%, rgba(197,248,42,0.16), rgba(7,8,10,0) 55%), radial-gradient(circle at 0% 100%, rgba(197,248,42,0.06), rgba(7,8,10,0) 45%)",
        color: "#ecebe6",
        padding: "56px 72px",
        fontFamily: "Plex",
        position: "relative",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, fontFamily: "Display" }}>
          Mazin<span style={{ color: "#c5f82a" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#9aa0a8",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 999,
            padding: "8px 20px",
          }}
        >
          {o.tagline}
        </div>
      </div>

      {/* body */}
      <div
        style={{
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: rtl ? "flex-end" : "flex-start",
            textAlign: rtl ? "right" : "left",
            width: o.visual ? 640 : 1000,
          }}
        >
          <Words
            rtl={rtl}
            text={o.eyebrow}
            style={{
              fontSize: 26,
              color: "#c5f82a",
              fontWeight: 700,
              letterSpacing: rtl ? 0 : 3,
              textTransform: rtl ? "none" : "uppercase",
            }}
          />
          <Words
            rtl={rtl}
            text={title}
            style={{
              marginTop: 20,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: rtl ? 0 : -2,
              fontFamily: displayFont,
            }}
          />
          {o.accent && (
            <Words
              rtl={rtl}
              text={o.accent}
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: rtl ? 0 : -2,
                color: "#c5f82a",
                fontFamily: displayFont,
              }}
            />
          )}
          {o.subtitle && (
            <Words
              rtl={rtl}
              text={o.subtitle}
              style={{
                marginTop: 24,
                fontSize: 30,
                lineHeight: 1.4,
                color: "#9aa0a8",
                fontWeight: 400,
              }}
            />
          )}
        </div>

        {portrait && (
          // eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img>
          <img
            src={portrait}
            alt=""
            width={324}
            height={405}
            style={{ marginBottom: -56, objectFit: "contain" }}
          />
        )}
        {cover && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 400,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "#14171b",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 80px rgba(197,248,42,0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "10px 14px",
                background: "#14171b",
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 9,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain <img> */}
            <img src={cover} alt="" width={400} height={250} style={{ objectFit: "cover" }} />
          </div>
        )}
      </div>

      {/* footer */}
      <div
        style={{
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#9aa0a8",
        }}
      >
        <div style={{ display: "flex" }}>{rtl ? "مازن عماد" : "Mazin Emad"}</div>
        <div style={{ display: "flex", direction: "ltr" }}>{host}</div>
      </div>
    </div>,
    { ...ogSize, fonts: fontData },
  );
}
