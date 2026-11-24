# 1. Universal Module Bundling and file:// Protocol Compatibility

Date: 2026-11-24

## Status
Accepted

## Context
When developers or end-users open `index.html` by double-clicking it directly from the Windows/macOS/Linux filesystem, the document loads under the `file:///` protocol. 

Modern browsers (Firefox, Chrome, Edge, Safari) treat native ES modules (`<script type="module" src="...">` and downstream `import ... from '...'`) under `file://` as cross-origin requests with a `null`/opaque origin. Under the browser's Same-Origin Policy (SOP), this triggers:
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at file:///... (Reason: CORS request not http)
Module source URI is not allowed in this document: “file:///.../app.js”
```
This blocked `app.js` execution entirely when opening the site via file explorer, preventing the splash screen from dismissing and leaving interactive features inert.

## Decision
1. **Source vs. Distribution Separation**:
   - Maintain clean, decoupled ES Module source code in `src/js/` (`data/`, `state/`, `modules/`).
   - Bundle `src/js/main.js` into a single, self-contained Immediately Invoked Function Expression (IIFE) in root `app.js` via fast bundling (`esbuild src/js/main.js --bundle --outfile=app.js --format=iife`).
2. **Classic Deferred Script Tag**:
   - Reference `app.js` in `index.html` with `<script src="./app.js" defer></script>`.
   - Classic scripts with `defer` execute without any CORS restrictions over the `file://` protocol, while maintaining non-blocking asynchronous parsing.
3. **Resilient Splash Screen Fallback**:
   - In addition to JavaScript-driven dismissal, add a CSS-based `@keyframes autoDismissSplash` fallback (with a 2s cap) so that the splash screen never traps the user even if scripts are blocked by restrictive browser security profiles.

## Consequences
- **Positive**: Zero-friction local development and evaluation. Users can double-click `index.html` in Windows Explorer and enjoy 100% of the interactive features (theming, search, carousel, modal, likes) with zero web server setup and zero console CORS errors.
- **Positive**: Zero external runtime network requests and lightning-fast execution on production deployments (GitHub Pages, Vercel, Netlify).
- **Positive**: Clean separation between modular developer sources (`src/js/`) and distribution artifact (`app.js`).
