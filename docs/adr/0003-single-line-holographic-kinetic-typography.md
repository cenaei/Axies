# 3. Single-Line Kinetic Typography and Cyber Shimmer Animation

Date: 2026-11-24

## Status
Accepted

## Context
In the hero section headline:
`<span class="extraordinary"><span>e</span><span>x</span>...</span>`
The word "extraordinary" was breaking onto two lines (`e x t r a` / `o r d i n a r y`) due to:
1. Whitespace (newlines and indentation) between individual `<span>` elements in the HTML being interpreted by HTML rendering engines as inline word boundaries (space characters).
2. The CSS missing `white-space: nowrap` and `display: inline-flex`.
3. The previous flip animation was repetitive and lacked contemporary Cyberpunk / Web3 energy.

## Decision
1. **Zero-Whitespace Markup**:
   - Stripped all HTML whitespace between the character `<span>` tags, ensuring the browser treats the container as a contiguous inline flex sequence without unintended character spacing.
2. **Strict Single-Line Flexbox Rule**:
   - Set `.extraordinary { display: inline-flex; white-space: nowrap; flex-wrap: nowrap; }`.
   - Tuned fluid heading clamp: `font-size: clamp(2.8rem, 5.2vw, 5.4rem)` (with a 2.6rem mobile fallback under 480px) to guarantee the 13 characters remain on a single line across all screen sizes.
3. **Multi-Dimensional Kinetic Wave & Holographic Shimmer**:
   - **Holographic Shimmer**: Continuous animated chromatic sweep (`linear-gradient(110deg, #a855f7, #06b6d4, #ec4899, #f59e0b, #a855f7)`) with `-webkit-background-clip: text` and animated `background-position`.
   - **Staggered 3D Wave**: Keyframe `@keyframes kineticLetterWave` with staggered delays (`calc(0.08s * var(--i))`), vertical displacement (-9px), rotational tilt (-3deg to 1deg), and neon drop shadows.
   - **Interactive Hover Physics**: Individual letters scale to `1.3x` on pointer hover with an intense neon cyan/purple bloom (`drop-shadow(0 0 20px #06b6d4) drop-shadow(0 0 35px #a855f7)`).
   - **Accessibility**: Motion is disabled gracefully when `prefers-reduced-motion: reduce` is active.

## Consequences
- **Positive**: "extraordinary" is permanently locked onto a single, uninterrupted line on all devices.
- **Positive**: Visual energy matches top-tier Cyberpunk/Web3 landing pages with interactive tactile micro-interactions.
- **Positive**: Accessibility standards (WCAG 2.1 AA) are fully maintained.
