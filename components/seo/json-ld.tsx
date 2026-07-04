/**
 * Renders a single JSON-LD `<script>` tag. Escapes `<` so a value containing
 * `</script>`-like text can never break out of the tag — the JSON payload
 * itself is always real, resolver-derived data (never user input at request
 * time), but this is cheap, standard defence-in-depth.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
