# Changelog

Newest entries first. Headings: `## 2026-10-19 — Mark Dunleavy (via Cube Developments)

- Fixed redirect loop on inner pages (.htaccess clean-URL rule).
- Removed all contact forms and the PHP mail handler (archived to DeleteMeDec26/); the Contact page stays with the live site's contact details only.

## 2026-10-26 — Mark Dunleavy (via Cube Developments)

- Project domain changed to the live cubedevelopments.com (repo secrets repointed by Mark). Docs updated; no code changes needed.

## 2026-10-20 — Mark Dunleavy (via Cube Developments)

- Fixed missing spaces in mobile menu items (space before hidden line breaks).

## YYYY-MM-DD — Name (via assistant)`.

## 2026-10-19 — Mark Dunleavy (via Cube Developments)

- Create repo `gragnola/md_cube_dev` with `main` and `dev` branches; conventions (`AGENTS.md`, session guide, README, blueprint) and `deploy.yml` adapted from `md_havelock`.
- Static Vite rebuild of the live WordPress site's 7 pages: Home, Cube Home, Residential, Commercial, Social, Our Requirements, Contact. No WordPress/Salient code; Nectar sliders replaced by a small JS carousel and CSS parallax.
- Copy only the images used (resized and recompressed) into `public/images/`; self-host Titillium Web.
- Add `public/contact.php` (PHP `mail()` to/from `noreply@dev.cubedevelopments.com`, Reply-To visitor, validation, honeypot, header-injection protection) and wire up the footer and Contact page forms.
- Add Apache `.htaccess` (clean URLs, old WordPress paths redirected home, caching, security headers).
- Release: `main` set to match `dev` for the first deploy. FTP secrets still to be added by Mark, so the first deploy run is expected to fail.
- Open: the Cube Home background video had no video source on the live site, so it could not be carried over; blog post "Hello world" and the category page were dropped deliberately.
