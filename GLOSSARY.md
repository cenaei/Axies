# Axies Domain Glossary

Ubiquitous language for the Axies NFT Marketplace codebase.

### NFT (Non-Fungible Token)
A unique digital asset on a blockchain representing digital artwork, collectibles, domain names, or virtual world assets. In Axies, NFTs are represented by the normalized schema in `src/js/data/nfts.js`.

### Item Card
The primary presentation unit displaying an NFT's artwork image, title, creator metadata, current bid in ETH/USD, category tag, and interactive like button.

### Creator
The artist or author who minted and published an NFT collection or artwork, characterized by a display name, avatar image, verified badge status, and primary blockchain network (e.g., Ethereum, Binance Smart Chain).

### Live Auction
A time-sensitive bidding event for an NFT featuring an ongoing countdown timer and real-time bid updates, presented within an accessible, touch-enabled horizontal carousel.

### Today's Picks
The curated showcase grid of available NFTs, equipped with real-time keyword search and category filter tabs (All, Art, Music, Domain Names, Virtual World, Collectibles).

### Design Token
A named entity storing a raw visual value (such as color, typography scale, fluid spacing, or shadow elevation) defined via CSS Custom Properties in `assets/sass/sass-utils/_tokens.scss` to support dual-theme switching (`[data-theme="dark"]` and `[data-theme="light"]`).

### CoolThemeSwitch (Day/Night Toggle)
The interactive, animated celestial theme switch located in the navigation header (`assets/sass/components/_theme-switch.scss` and `src/js/modules/theme.js`). Based on the Framer CoolThemeSwitch component, it transitions between a day sky with golden sun and layered clouds and a night sky with cratered moon and starry constellation using cubic-bezier spring physics.

### Kinetic Typography (Holographic Shimmer)
The multi-dimensional, single-line headline animation applied to "extraordinary" in the hero section (`assets/sass/layouts/_hero.scss`). Combines continuous chromatic gradient sweeps, staggered 3D letter waves (`@keyframes kineticLetterWave`), neon drop-shadow blooms, and tactile letter hover spring physics.

### Theme-Adaptive Brand Asset
A dual-state visual asset (such as `Logo.svg` for dark mode and `Logo-light.svg` for light mode) paired in HTML with `.logo-dark` and `.logo-light` classes and declaratively switched via CSS custom properties and theme attributes (`[data-theme="light"]`), guaranteeing high contrast and brand color preservation.

### Wallet Provider
A Web3 crypto wallet service (such as MetaMask, Coinbase Wallet, or WalletConnect) simulated in the application via an accessible `<dialog>` modal with focus trapping and address truncation.

### Toast Notification (Floating Feedback Pill)
A compact, transient status notification (`src/js/modules/toast.js` and `assets/sass/components/_toast.scss`) displayed at the bottom of the viewport with an accessible live announcement (`role="status"`, `aria-live="polite"`), auto-dismissing after 2.2 seconds. Styled as an unobtrusive pill with an explicit 16px icon, glassmorphic backdrop blur, and theme-tinted borders.

### Universal Compatibility (IIFE Distribution)
The packaging strategy where modular source files in `src/js/` are compiled into an Immediately Invoked Function Expression (`app.js`) loaded via a deferred classic `<script src="./app.js" defer>`, ensuring flawless execution across both the local `file:///` filesystem protocol and standard `http(s)://` web servers without CORS restrictions.
