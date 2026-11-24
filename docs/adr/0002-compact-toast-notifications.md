# 2. Compact and Unobtrusive Toast Notifications

Date: 2026-11-24

## Status
Accepted

## Context
Initial toast notifications were visually oversized due to:
1. The global CSS reset (`img, svg { display: block; max-width: 100%; height: auto; }`) expanding unconstrained SVG icons inside flex containers to their natural viewBox aspect ratios.
2. The CSS toast class missing explicit pixel/rem dimensions (`width: 1.6rem; height: 1.6rem;`) on the icon, causing the SVG to dominate the toast.
3. Excessive container padding (`1.4rem 2rem`) and wide `max-width` (36rem) creating heavy banners rather than lightweight, transient feedback pills.

## Decision
1. **Explicit Icon Constraining**:
   - Explicitly define `width: 1.6rem; height: 1.6rem; min-width: 1.6rem; min-height: 1.6rem;` on `.toast__icon`.
   - Add explicit `width="16" height="16"` directly on all inline SVG toast templates in `src/js/modules/toast.js`.
2. **Compact Floating Pill Geometry**:
   - Reduce padding to `0.8rem 1.6rem`.
   - Use `border-radius: var(--radius-full)` for an ultra-sleek, pill-shaped silhouette.
   - Set `max-width: 32rem` with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` on `.toast__text`.
   - Use translucent glass backgrounds (`var(--color-surface-glass)` with `backdrop-filter: blur(12px)` and subtle theme-tinted borders).
3. **Transient Timing**:
   - Shorten display duration from 3.5s to 2.2s so non-critical confirmations (theme switch, favorites toggle, wallet status) vanish swiftly without obstructing interaction.

## Consequences
- **Positive**: Toasts are now sleek, non-intrusive, and modern, perfectly complementing the Cyberpunk / Web3 glassmorphic design system.
- **Positive**: Zero risk of layout distortion across desktop or mobile viewports.
