# SOP: Export a WordPress site to a static site on our server

Use this when an existing WordPress site needs to be rebuilt as a clean static site (no WordPress, no database) and deployed to a subdomain on our Virtualmin/AlmaLinux server (e.g. cleo.blue-chip.net). Reference build: `gragnola/md_cube_dev` (Cube Developments, Oct 2026).

## 1. Gather before you start
- Live site URL, and whether it serves on **http or https**. (cubedevelopments.com was http-only; https failed.)
- The target subdomain created in Virtualmin, e.g. `dev.<domain>`.
- **FTP login** for that subdomain (host, username, password), tested in FileZilla first. It should land in the web root.
- The GitHub repo name, under the `gragnola` account.
- Whether any forms, mail, or other dynamic features are actually wanted. Don't assume. (Cube needed no contact form at all.)
- The WordPress admin login is optional. A public crawl is usually enough.

## 2. Survey and mirror the live site
- Find the pages in `/wp-sitemap.xml` (`sitemap_index.xml` may 404) and in the nav menu. Skip WordPress leftovers such as `hello-world` and `/category/...`.
- Download each page's HTML, plus the theme CSS, fonts, logo and the images under `wp-content/uploads` that the pages actually use.
- If the assistant's computer can't reach the site (it is often blocked), run the crawl from Mark's PC (Windows PowerShell: use `curl.exe`, not `curl`) and copy the zip across.
- Note down: theme or page builder, fonts, colour palette (check the real accent against theme defaults), layout sections, sliders, video, parallax, forms.

## 3. Create the repo
- Mark creates an **empty private repo** on GitHub with no README. The token can't create repos.
- Mark enables **Actions** in the repo settings (Settings → Actions → "Allow all actions and reusable workflows").
- Copy the conventions from an existing project repo (e.g. `md_havelock`): `AGENTS.md`, `README.md`, `PROJECT_BLUEPRINT.md`, `docs/project-session-guide.md`, `docs/CHANGELOG.md`, `.github/workflows/deploy.yml`.
- Same layout: `docs/`, `project/` and `media/` aren't deployed, static files go in `public/`, and only `dist/` goes live. Work on `dev`, then merge `dev` into `main` with a merge commit to deploy.

## 4. Rebuild as a static Vite site
- Plain HTML, CSS and JS. Shared header and footer go in `src/partials/`, included at build time by a small Vite plugin. List each page in `vite.config.js`.
- Keep the real text and look: fonts bundled locally, the palette, the logo at 1x and 2x.
- Replace WordPress features: sliders become a small JS carousel, parallax becomes CSS, portfolio and testimonial blocks become plain HTML.
- Copy only the images that are used, resized and recompressed.
- Add a footer with the version and last-updated time (house convention).
- `npm install && npm run build` must pass before you push.

## 5. .htaccess (Apache)
- `Options -Indexes -MultiViews`. **MultiViews must be off**, or `/contact/` resolves to `contact.php`.
- Clean URLs: add a trailing slash only when one is missing. `RewriteRule ^(.+[^/])$ /$1/ [R=301,L]`. A pattern like `^(.+?)/?$` causes a **redirect loop** on inner pages.
- Redirect old WordPress paths (`wp-admin`, `wp-content`, `wp-login.php`, `/2018/`, `/category/`) to `/`.
- Block dotfiles, and add security and caching headers.

## 6. Deploy
- Repo secrets (Mark adds them): `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PATH`.
- **`FTP_PATH` must be set**: use `./` for the web root. If it's missing, the deploy logs in and then fails with `ECONNRESET` / "Client is closed" while creating the first folder.
- Pushing to `main` runs the deploy. If you need a fresh run, push an empty commit: `git commit --allow-empty -m "Trigger deploy"`. The token can't re-run workflows.
- Check the run finished with "success", then load every page (it should return 200, with no redirect loops).

## 7. After going live
- If the server redirects http to https, the subdomain needs a **Let's Encrypt certificate** in Virtualmin, or browsers will warn.
- Remove unwanted pages or features with `git mv` into `DeleteMe<MonYY>/` (two months ahead), with a README. Never delete them outright.
- Log every change in `docs/CHANGELOG.md` (newest first, `## YYYY-MM-DD — Name (via assistant)`).
