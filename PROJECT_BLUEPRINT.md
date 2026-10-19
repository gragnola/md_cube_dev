# Project Blueprint: Cube Developments static site

**Version:** 0.1.0
**Last Updated:** 19/10/2026

Adapted from the shared gragnola blueprint (md_havelock) for a static brochure site.

## 1. Infrastructure & constraints
- **Server:** cleo.blue-chip.net — AlmaLinux, Virtualmin, Apache, PHP. Virtual server `dev.cubedevelopments.com`.
- **No Node.js on the server.** Node/Vite is used only to build; the output is static HTML/CSS/JS plus PHP.
- **Deploy:** GitHub Actions → FTP upload of `dist/` into the web root (`FTP_PATH`).
- **Times** in Italian local format `dd/mm/yyyy HH:mm`. **UK English** throughout.

## 2. Architecture
- Vite multi-page build; one `index.html` per page directory for clean URLs.
- Shared markup in `src/partials/*.html`, inlined by a small plugin in `vite.config.js`.
- `src/main.js`: mobile nav, header shrink on scroll, lightweight carousel, AJAX contact form.
- `src/style.css`: design tokens (Titillium Web; black/white/#333; gold `#e1a457`, deeper gold `#dd9933`), CSS-only parallax (`background-attachment: fixed`, disabled on touch / reduced motion).
- Fonts are self-hosted via `@fontsource/titillium-web` (no Google Fonts request).
- `public/contact.php`: validation, honeypot, CR/LF stripping against header injection, `mail()` to and from `noreply@dev.cubedevelopments.com`, `Reply-To` = visitor; JSON for fetch, 303 redirect otherwise.

## 3. Content source
Text and images were taken from the live WordPress site on 19/10/2026 (mirror kept outside the repo). Only images used on the 7 pages were copied, resized (heroes ≤1920px, project photos ≤800px) and re-compressed.
