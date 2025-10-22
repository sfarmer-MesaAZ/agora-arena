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

Fallback: Use a Personal Access Token (PAT)
1. If the workflow fails with a 403 when pushing ("Permission denied to github-actions[bot]"), your org or repo may block the default `GITHUB_TOKEN` from pushing.
2. Create a PAT on GitHub: Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token. Grant `repo` scope (for private repos) or `public_repo` for public repos.
3. Add the token to your repo secrets: `Settings -> Secrets -> Actions -> New repository secret`, name it `GH_PAGES_PAT`.
4. Update the workflow `gh-pages.yml` deploy step to use the `personal_token` input instead of `github_token`:

```yaml
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          personal_token: ${{ secrets.GH_PAGES_PAT }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

5. Commit and push. The workflow will use your PAT to create/update the `gh-pages` branch.
