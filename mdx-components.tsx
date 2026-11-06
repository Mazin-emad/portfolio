import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-14 mb-4 text-3xl font-semibold" {...props} />,
    h3: (props) => <h3 className="mt-10 mb-3 text-2xl font-semibold" {...props} />,
    p: (props) => <p className="text-muted my-5 text-lg leading-relaxed" {...props} />,
    ul: (props) => <ul className="text-muted my-5 list-disc space-y-2 ps-6 text-lg" {...props} />,
    ol: (props) => <ol className="text-muted my-5 list-decimal space-y-2 ps-6 text-lg" {...props} />,
    a: (props) => <a className="link-u text-fg" {...props} />,
    code: (props) => (
      <code dir="ltr" className="font-mono bg-surface-2 text-fg rounded-md px-1.5 py-0.5 text-[0.9em]" {...props} />
    ),
    ...components,
  };
}
