# 4. Theme-Adaptive Brand Assets and Logo Visibility

Date: 2026-11-24

## Status
Accepted

## Context
The original `assets/img/Logo.svg` embedded a raster PNG containing an Axies violet icon on the left (X: 0 to 35) and the wordmark "Axies" in static `#FFFFFF` white on the right (X: 41 to 130).

When switching to Light Mode (`[data-theme="light"]` or OS `prefers-color-scheme: light`), the light canvas background (`#f8fafc` / `#ffffff`) caused the white wordmark text to become completely invisible, rendering only the isolated mark without the brand name. Inverting the whole image via CSS `filter: invert(1)` distorted the purple brand mark into an unbranded yellow-green.

## Decision
1. **High-Contrast Light Wordmark Asset**:
   - Analyzed the decompressed PNG channels and generated `assets/img/Logo-light.png` and `assets/img/Logo-light.svg`.
   - Preserved the identical purple gradient mark on the left (`#6a50e6` to `#b250e6`), while transforming the white wordmark on the right into high-contrast dark slate (`#0f172a`), maintaining anti-aliased alpha blending.
2. **Declarative CSS Theme Switching**:
   - In markup (`index.html`), paired `.logo-dark` and `.logo-light` in the header, mobile drawer, and footer.
   - In styling (`_reset.scss`), applied declarative visibility rules:
     - Dark Mode (`[data-theme="dark"]` / default): `.logo-dark` displays, `.logo-light` is hidden.
     - Light Mode (`[data-theme="light"]`): `.logo-dark` is hidden, `.logo-light` displays.
     - System Media Query: Supported seamlessly before script initialization.
3. **Zero JavaScript Runtime Overhead**:
   - Eliminates complex canvas or SVG DOM manipulation scripts in favor of pure, performant CSS rules.

## Consequences
- **Positive**: The Axies brand wordmark is crisp, legible, and high-contrast (>14:1) in both Dark Mode and Light Mode.
- **Positive**: The signature violet/purple icon retains its brand identity across all themes without chromatic degradation.
