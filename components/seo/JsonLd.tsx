/**
 * Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag.
 *
 * The <script> is emitted as raw HTML inside a hidden wrapper rather than as a React element:
 * React warns ("Encountered a script tag while rendering React component") whenever it has to
 * *create* a script on the client, which happens on every locale switch. Crawlers see the exact
 * same server-rendered `<script type="application/ld+json">`.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\u003c");
  return (
    <div
      hidden
      dangerouslySetInnerHTML={{
        __html: `<script type="application/ld+json">${json}</script>`,
      }}
    />
  );
}
