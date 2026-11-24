# Axies — Web3 NFT Marketplace

<div align="center">

![Axies Hero Banner](./Screenshot.png)

<br />

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success?style=for-the-badge&logo=w3c&logoColor=white)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_Runtime-brightgreen?style=for-the-badge)](./)
[![Responsive](https://img.shields.io/badge/Layout-Fluid_Responsive-blue?style=for-the-badge)](./)

<p align="center">
  A modernized, accessible, and high-performance Web3 NFT Marketplace landing platform for discovering, collecting, and trading monster digital character collectibles.
</p>

[**Explore Live Demo &raquo;**](https://cenaei.github.io/Axies/)

</div>

---

## 🌟 Key Highlights & Architecture

Axies has been overhauled from the ground up into a production-grade Web3 web application using **ui-ux-pro-max** design intelligence and **Matt Pocock** specification standards.

- 🌗 **Dual-Theme Design Tokens**: Cyberpunk OLED Dark Mode by default, paired with an ultra-clean, high-contrast Light Mode via CSS Custom Properties. Automatically detects system `prefers-color-scheme` and remembers user preference via `localStorage`.
- ⚡ **Zero Runtime Dependencies**: Completely eliminated external, unpinned third-party script kits (`kit.fontawesome.com`) and heavy CDN carousels. All icons are self-contained accessible SVGs with 0 tracking and 0 latency.
- 📱 **100% Fluid Responsive**: Mobile-first architecture with zero layout shifts or horizontal clipping. Adapts from 320px mobile viewports up to 4K ultra-wide displays.
- ♿ **WCAG 2.1 AA Compliant**: Features a keyboard skip link, visible `:focus-visible` offset rings, roving tab navigation, screen-reader status announcements (`aria-live="polite"`), and accessible `<dialog>` focus trapping.
- 🔍 **Real-Time Catalog Search & Filter**: Instant 200ms debounced search matching NFT titles and artist handles, accompanied by dynamic category filter tabs with live count indicators and an empty recovery state.
- 👛 **Simulated Web3 Wallet Connection**: Accessible `<dialog>` modal with provider selection (MetaMask, Coinbase Wallet, WalletConnect), realistic connection feedback, and address truncation in the navigation bar.
- 🎠 **Touch & Keyboard Carousel**: High-performance native carousel with smooth touch drag gestures, left/right arrow key navigation, and real-time live auction countdown timers.
- ❤️ **Optimistic Favoriting**: Instant like counter toggling with tactile micro-interactions and local storage synchronization.

---

## 🎨 Theme & Design System

The visual design is grounded in a Cyberpunk / Modern Web3 aesthetic with luminous violet gradients, gold bidding highlights, and glassmorphic elevations.

| Design Token | Dark OLED (Default) | Modern Light Mode | Role |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#0b0b14` | `#f8fafc` | Canvas backdrop |
| `--color-surface` | `#181628` | `#ffffff` | Elevated card & modal surfaces |
| `--color-primary` | `#8b5cf6` | `#6366f1` | Brand violet accent & CTA buttons |
| `--color-accent-gold` | `#f59e0b` | `#d97706` | Live auction bids & trading volume |
| `--color-accent-green` | `#10b981` | `#059669` | Verified creator checkmarks & live indicator |
| `--color-text` | `#f8fafc` | `#0f172a` | High-contrast display typography |
| `--color-text-secondary` | `#94a3b8` | `#475569` | Subtitles, creator roles, and meta text |
| `--color-border` | `rgba(255,255,255,0.08)` | `rgba(15,23,42,0.08)` | Subtle card outlines |

### Typography Pairing
- **Headings & Badges**: [`Orbitron`](https://fonts.google.com/specimen/Orbitron) — Futuristic geometric display face.
- **Body & UI**: [`Exo 2`](https://fonts.google.com/specimen/Exo+2) — Crisp, legible humanist grotesque with balanced tabular figures.

---

## 📂 Repository Structure

```
Axies/
├── assets/
│   ├── css/
│   │   └── main.css              # Compiled production CSS with design tokens
│   ├── img/
│   │   ├── avatar/               # Creator avatars
│   │   ├── icon/                 # Platform SVG icons
│   │   ├── nfts/                 # Collection mosaic artworks
│   │   ├── post/                 # Auction and pick NFT assets
│   │   ├── profile/              # Verified seller headshots
│   │   ├── hero.svg              # 3D Astronaut vector graphic
│   │   └── Logo.svg              # Axies brand wordmark
│   └── sass/
│       ├── base/                 # Reset, fluid typography, loader styles
│       ├── components/           # Searchbar, wallet modal, toast notifications
│       ├── layouts/              # Header, hero, live, popular, seller, todays, footer
│       ├── sass-utils/           # CSS Custom property tokens, mixins, variables
│       └── main.scss             # Master Sass entrypoint
├── src/
│   └── js/
│       ├── data/
│       │   └── nfts.js           # Normalized NFT, creator, and collection catalog
│       ├── state/
│       │   └── store.js          # Centralized observable state store
│       └── modules/
│           ├── carousel.js       # Touch & keyboard live auctions slider
│           ├── likes.js          # Optimistic like counter toggling
│           ├── navigation.js     # Responsive mobile drawer & keyboard dropdowns
│           ├── newsletter.js     # Accessible newsletter validation
│           ├── search-filter.js  # Debounced real-time search & category tabs
│           ├── theme.js          # OS preference & manual theme manager
│           ├── toast.js          # Accessible status notifications
│           └── wallet-modal.js   # Focus-trapped wallet connection dialog
├── .scratch/                     # Spec, tickets, and code review documentation
├── app.js                        # Modular application bootstrap
├── index.html                    # Semantic, accessible HTML5 application
└── README.md                     # Documentation & metadata
```

---

## ⌨️ Interactive Keyboard Shortcuts & Controls

| Key | Context | Action |
| :--- | :--- | :--- |
| `Tab` | Anywhere | Navigates forward through operable elements with visible focus ring |
| `Shift + Tab` | Anywhere | Navigates backward |
| `Enter` / `Space` | Buttons / Tabs / Links | Triggers action, expands dropdown, or selects tab |
| `Arrow Left` / `Right` | Live Auctions Carousel | Scrolls carousel slides horizontally |
| `Escape` | Modal or Mobile Drawer | Immediately closes open dialog/drawer and returns focus to trigger |
| `Home` / `End` | Category Tabs | Jumps to first / last category filter |

---

## 🚀 Getting Started

### Prerequisites
Axies runs natively in any modern web browser with zero build steps required! To edit or recompile Sass styles:
- [Node.js](https://nodejs.org/) (v18+)

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/cenaei/Axies.git
   cd Axies
   ```

2. Serve locally using any static web server:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node
   npx serve .
   ```

3. Open your browser and navigate to `http://localhost:3000`.

### Recompiling Sass
To watch or recompile the SCSS files into `assets/css/main.css`:
```bash
npx sass assets/sass/main.scss assets/css/main.css --no-source-map --watch
```

---

## 🧪 Verification & Quality Assurance

- **Syntax Validation**: `node --check app.js` and all ES modules pass with 0 errors.
- **Sass Compilation**: Compiles with Dart Sass 1.108+ cleanly.
- **Accessibility**: Audited against WCAG 2.1 AA specifications for contrast, semantic landmarking, and keyboard traps.

---

## 👥 Credits & Mentorship

- **Original Concept**: Landing page for Axies [NFT Marketplace]
- **Frontend Mentorship Program**: Guided by [Dan Salahi](https://github.com/DanSalahi)
- **Author**: [Sina Sangiji](https://github.com/cenaei)
- **Design Intelligence**: ui-ux-pro-max & Matt Pocock engineering specifications

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
