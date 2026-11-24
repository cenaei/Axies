# 5. CoolThemeSwitch Animated Day/Night Toggle Integration

Date: 2026-11-24

## Status
Accepted

## Context
The previous theme switcher utilized two static side-by-side buttons with SVG icons (Sun and Moon). The sun icon and container lacked visual feedback, tactile delight, and contemporary motion physics expected in high-end Web3 design systems.

The user requested integrating the animated Framer CoolThemeSwitch component (`https://framer.com/m/CoolThemeSwitch-jbUt.js@WuyuysvX5GwpMqKs8OMd`), which features dynamic celestial bodies (golden sun with day sky and multi-layered clouds vs. moon with crater spots, starry night sky, and halo glow).

## Decision
1. **Framer Component Port to Pure Web Standards**:
   - Ported the React/Framer component logic and keyframe transitions directly into clean HTML5 semantics, SCSS, and vanilla ES modules without introducing external dependencies.
   - Built with an accessible native checkbox input (`role="switch"`, `aria-checked="true/false"`) contained within `<label class="theme-switch">`.
2. **Dynamic Day/Night Visual Elements**:
   - **Light Mode (Sun & Sky)**:
     - Background: Day sky (`#3D7EAE`).
     - Celestial Body: Sun (`#ECCA2F`) with golden inset highlights.
     - Atmosphere: Multi-cloud puff formation (`.theme-switch__clouds`) rendered via layered box-shadows (`#F3FDFF` and `#AACADF`).
   - **Dark Mode (Moon & Stars)**:
     - Background: Deep night sky (`#1D1F2C`).
     - Celestial Body: Moon (`#C4C9D1`) with 3 realistic crater spots (`.theme-switch__spot`).
     - Atmosphere: Constellation of 7 twinkling white stars (`.theme-switch__stars-container`) that slide into view.
   - **Spring Physics**:
     - Fluid cubic-bezier transitions (`0.5s cubic-bezier(0, -0.02, 0.4, 1.25)`).
     - Hover nudge interaction shifting the orb when hovering over the toggle.
     - Accessible focus ring (`:focus-within`) on keyboard Tab navigation.
3. **Responsive Sizing**:
   - Scaled using `--toggle-size: 11px`, providing an elegant 62px x 28px pill that integrates into the header navigation bar.
4. **Theme Controller Synchronization**:
   - Synchronized `#theme-switch-checkbox` with `store`, `localStorage`, and OS media queries in `src/js/modules/theme.js`.

## Consequences
- **Positive**: Replaced the static buttons with an animated toggle.
- **Positive**: Zero performance overhead or framework dependencies.
- **Positive**: Full keyboard accessibility (`Space`/`Enter` to toggle) and screen-reader switch semantics.
