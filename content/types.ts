export type Locale = "en" | "ar";
export type L<T> = Record<Locale, T>;

export interface Shot {
  src: string;
  kind: "desktop" | "mobile";
  caption: L<string>;
}

export interface Project {
  slug: string;
  year: L<string>;
  status: "live" | "in-progress" | "private";
  /** Accent glow used on cards and the case-study hero. */
  hue: string;
  title: L<string>;
  tagline: L<string>;
  kind: L<string>;
  role: L<string>;
  summary: L<string>;
  overview: L<string[]>;
  highlights: L<{ title: string; body: string }[]>;
  decisions?: L<{ title: string; body: string }[]>;
  stats?: { value: string; label: L<string> }[];
  stack: string[];
  links: {
    live?: string;
    /** Set when the live demo is currently unavailable. */
    liveNote?: L<string>;
    github?: string;
    sourceNote?: L<string>;
  };
  cover: string;
  shots: Shot[];
}

export interface ArchiveItem {
  title: string;
  year: string;
  kind: L<string>;
  summary: L<string>;
  stack: string[];
  image?: string;
  live?: string;
  liveNote?: L<string>;
  github?: string;
}
