Publishing to GitHub Pages

Option A — Automatic (recommended): GitHub Actions
1. Push to the `main` branch. The workflow `.github/workflows/gh-pages.yml` will:
   - run `npm ci`
   - build the site with `VITE_BASE` set to `/<owner>/<repo>`
   - publish `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`

Notes:
- If your repository is `github.com/OWNER/REPO`, the action sets `VITE_BASE` to `/OWNER/REPO` so routing and assets resolve correctly.
- GitHub Pages should be configured in the repo settings to serve from the `gh-pages` branch.

Option B — Manual: using `gh-pages` package
1. Install `gh-pages` as a dev dep:

```bash
npm install --save-dev gh-pages
```

2. Add scripts to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist -b gh-pages"
}
```

3. Run:

```bash
npm run deploy
```

This will publish the `dist/` folder to the `gh-pages` branch.

Option C — Serve from `docs/` folder
1. Run `npm run build`.
2. Copy the contents of `dist/` into a `docs/` folder at repo root and commit. GitHub Pages can serve the `docs/` folder from the `main` branch.

Troubleshooting
- If assets 404, ensure `base` is set correctly (e.g., `/OWNER/REPO/`) in `vite.config.ts` or via `VITE_BASE` env var.
- For SPA routing, enable `404` fallback to `index.html` in GitHub Pages or use HashRouter in React.
