// app/components/ResourceHints.tsx
"use client";

import ReactDOM from "react-dom";

export function ResourceHints() {
  ReactDOM.preconnect("https://images.ctfassets.net");
  ReactDOM.prefetchDNS("https://images.ctfassets.net");
  return null;
}
