import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Inline shared partials: <!--#include name --> -> src/partials/name.html (nested includes allowed)
const include = (html, depth = 0) =>
  depth > 5 ? html : html.replace(/<!--#include (\w+) -->/g, (_, n) =>
    include(readFileSync(resolve(__dirname, `src/partials/${n}.html`), 'utf8'), depth + 1));

const pages = ['', 'cube-home', 'residential', 'commercial', 'social', 'our-requirements', 'contact'];

export default defineConfig({
  base: '/',
  plugins: [{ name: 'html-partials', transformIndexHtml: { order: 'pre', handler: (h) => include(h) } }],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p || 'home', resolve(__dirname, p ? `${p}/index.html` : 'index.html')])),
    },
  },
});
