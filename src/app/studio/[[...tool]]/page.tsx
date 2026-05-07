/**
 * Embedded Sanity Studio at /studio.
 * Editors access this URL to manage content. Server component shell;
 * the actual studio runs as a client component below.
 */

import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
