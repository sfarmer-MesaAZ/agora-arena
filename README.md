# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b85d86c8-ff6f-443c-a3d3-720d2338e404

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b85d86c8-ff6f-443c-a3d3-720d2338e404) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Option 1: Deploy with Lovable
Simply open [Lovable](https://lovable.dev/projects/b85d86c8-ff6f-443c-a3d3-720d2338e404) and click on Share -> Publish.

### Option 2: Deploy to GitHub Pages (Automated)
This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Here's how it works:

1. **Configuration Files**
   - `vite.config.ts` is configured to handle GitHub Pages base URL:
     ```typescript
     export default defineConfig(({ mode }: ConfigEnv) => ({
       base: process.env.VITE_BASE || "/",
       // ... other config
     }));
     ```
   - `.github/workflows/gh-pages.yml` handles automated deployment

2. **Deployment Process**
   - Push to `main` branch triggers automatic deployment
   - Workflow builds site and publishes to `gh-pages` branch
   - Site is available at: https://sfarmer-mesaaz.github.io/agora-arena/

3. **GitHub Actions Workflow Details**
   ```yaml
   # Key workflow permissions
   permissions:
     contents: write    # For gh-pages branch
     pages: write      # For GitHub Pages
   
   jobs:
     build-and-deploy:
       steps:
         - uses: actions/checkout@v4
           with:
             persist-credentials: true
         - name: Build
           env:
             VITE_BASE: "/${{ github.event.repository.name }}/"
           run: npm run build
         - name: Deploy to gh-pages
           uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **Repository Settings**
   - Go to Repository Settings → Pages
   - Set Source to: "Deploy from a branch"
   - Select Branch: `gh-pages`

5. **Troubleshooting**
   - If deployment fails with 403, check workflow permissions
   - For SPA routing issues, consider using HashRouter
   - Allow a few minutes for GitHub Pages to update after deployment

For more detailed deployment options, see `DEPLOY.md` in the project root.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Static pages (pre-rendered)

We added a simple static generation step so each route has its own HTML file (clean URLs, better SEO).

What we did
- After building the app, a small script (`scripts/generate-static.js`) copies `dist/index.html` into per-route folders such as `dist/forum/index.html`, `dist/webinars/index.html`, etc.
- This makes URLs like `/forum/` or `/webinars/` work on static hosts (including GitHub Pages) without client-side hash routing.

Commands to test locally
- Build and generate static pages:

```bash
npm run build:static
```

This runs the production build and then the post-build script that creates the per-route HTML files.

- Serve the `dist` folder locally:

```bash
npx serve dist
```

This starts a small static server that serves the `dist` folder on a local port (usually 3000). Open the following URLs in your browser to test:

- Home: `http://localhost:3000/`
- Forum: `http://localhost:3000/forum/`
- Webinars: `http://localhost:3000/webinars/`

Notes
- If you prefer an integrated SSG solution later (prerendering components or generating real HTML at build time), we can switch to a dedicated SSG like Astro or use a Vite prerender plugin.
- For SPA behavior (client-side navigation) the app still uses React Router. The static pages provide initial HTML snapshots and the client bundle hydrates the app.

### Local testing & VITE_BASE troubleshooting

When building for GitHub Pages we often set a repository base (for example `/agora-arena/`) so asset URLs resolve correctly on the hosted site. That base becomes part of the asset paths in `dist/index.html` (for example `/agora-arena/assets/index-...js`).

That can cause 404s when serving `dist/` locally because the local server expects assets under `/assets/...` while the built HTML points to `/agora-arena/assets/...`.

Quick checks (PowerShell)

- Confirm `dist/index.html` exists:

```powershell
Get-ChildItem dist\index.html
```

- Search the built HTML for a repo-base reference (replace `agora-arena` if your repo name is different):

```powershell
Get-Content dist\index.html | Select-String '/agora-arena'
```

Build locally for testing (recommended)

- Build without a repo base so asset URLs are relative to `/` (best for local testing):

```powershell
# set VITE_BASE for this PowerShell session only, then build
$env:VITE_BASE = '/'
npm run build:static
# optionally unset the variable afterwards
Remove-Item Env:VITE_BASE
```

- If you accidentally built with the repo base and want to rebuild with a clean base, unset the env var and rebuild:

```powershell
Remove-Item Env:VITE_BASE
npm run build:static
```

Serve the `dist` folder locally

- Normal static serve (recommended for pre-rendered pages):

```powershell
npx serve dist
```

- SPA fallback serve (serve unknown paths as `index.html`):

```powershell
npx serve -s dist
```

Notes

- If you want to test using the repo base (exact parity with GitHub Pages), set `VITE_BASE` to `'/agora-arena/'` before building. Serving locally then requires the server to expose that subpath or you can open the file `dist/agora-arena/index.html` directly.
- For quick local debugging, building with `VITE_BASE='/'` and using `npx serve dist` is the simplest path.
