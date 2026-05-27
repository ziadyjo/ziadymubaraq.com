import type { ReactElement } from "react";

interface JsonLdProps {
  readonly data: object;
}

export function JsonLd({ data }: JsonLdProps): ReactElement {
  return (
    <script
      type="application/ld+json"
      // Payload is build-time site data only (no user input), so inlining is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
