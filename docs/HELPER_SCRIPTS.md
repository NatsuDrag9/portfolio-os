# Helper Scripts

This document describes all available npm/yarn scripts in the Portfolio OS project.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn storybook` | Start Storybook development server |
| `yarn build:storybook` | Build Storybook for deployment |
| `yarn lint` | Run ESLint to check code quality |
| `yarn deploy:gh-pages` | Deploy portfolio and Storybook to GitHub Pages |
| `yarn build:deploy` | Build for GitHub Pages deployment |

---

## Development Scripts

### `yarn dev`

Starts the Vite development server with hot module replacement (HMR).

```bash
yarn dev
```

**Output:**
```
VITE v6.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

---

### `yarn storybook`

Starts Storybook development server for interactive component development and testing.

```bash
yarn storybook
```

**Output:**
```
Storybook 8.x started
➜ Local:        http://localhost:6006/
```
---

## Build Scripts

### `yarn build`

Creates an optimized production build of the portfolio application.

```bash
yarn build
```

**Output:**
```
✓ 1234 modules transformed
dist/index.html                    XX.XX kB │ gzip: XX.XX kB
dist/assets/index-XXXXX.js        XXX.XX kB │ gzip: XX.XX kB
```
---

### `yarn build:storybook`

Creates a production build of Storybook for deployment.

```bash
yarn build:storybook
```
---

### `yarn preview`

Serves the production build locally to preview before deployment.

```bash
yarn preview
```

**Output:**
```
➜  Local:   http://localhost:4173/
```
---

## Code Quality Scripts

### `yarn lint`

Runs ESLint to check code quality, style, and potential issues.

```bash
yarn lint
```

**Output:**
```
0 errors and 0 warnings
```

Or:
```
✖ 5 errors
  src/App.tsx:XX:XX - error: Unused variable 'foo'
```

**Auto-fix issues:**
```bash
yarn lint --fix
```

---

## Deployment Scripts

### `yarn deploy:gh-pages`

Builds both the portfolio and Storybook, then deploys everything to GitHub Pages.

```bash
yarn deploy:gh-pages
```

**What it does:**
1. Builds the portfolio application
2. Builds Storybook
3. Combines both into `dist/` folder structure:
   ```
   dist/
   ├── index.html (portfolio)
   ├── assets/
   ├── storybook/ (Storybook build)
   └── ...
   ```
4. Pushes to `gh-pages` branch automatically

**Output:**
- Portfolio at: `https://yourusername.github.io/portfolio-os/`
- Storybook at: `https://yourusername.github.io/portfolio-os/storybook/`

**Requirements:**
- Git repository configured
- GitHub Pages enabled in repo settings
- GitHub Pages branch set to `gh-pages`

**When to use:**
- When deploying new features
- After making changes to portfolio or components
- As final step after testing locally

---

### `yarn build:deploy`

Builds the application for deployment without pushing to GitHub.

```bash
yarn build:deploy
```

**What it does:**
1. Builds portfolio
2. Builds Storybook
3. Combines both in `dist/` folder

**When to use:**
- Before manual GitHub Pages push
- To review build artifacts
- For custom deployment processes

**Manual push to GitHub Pages:**
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

---

## Workflow Examples

### Development Workflow

```bash
# 1. Start development server
yarn dev

# 2. In another terminal, start Storybook
yarn storybook

# 3. Make changes and test in both

# 4. Before committing, run linter
yarn lint --fix

# 5. After final changes, test production build
yarn build
yarn preview
```

### Component Development Workflow

```bash
# 1. Start Storybook
yarn storybook

# 2. Create new component file structure
# ComponentName/
# ├── ComponentName.tsx
# ├── ComponentName.scss
# └── ComponentName.stories.tsx

# 3. Write component and stories
# 4. View in Storybook at http://localhost:6006
# 5. Iterate until satisfied
# 6. Run linter
yarn lint --fix

# 7. Test in main app
yarn dev
```

### Deployment Workflow

```bash
# 1. Test locally
yarn dev
# Verify all changes work

# 2. Run linter
yarn lint --fix

# 3. Test production build
yarn build
yarn preview
# Verify everything looks good

# 4. Deploy to GitHub Pages
yarn deploy:gh-pages

# 5. Verify deployment
# Visit https://yourusername.github.io/portfolio-os/
```

---

## Troubleshooting Scripts

### Clear Cache and Reinstall

If you encounter persistent issues:

```bash
# Clear node_modules and lockfile
rm -rf node_modules yarn.lock

# Reinstall dependencies
yarn install

# Run linter to check for issues
yarn lint

# Try building again
yarn build
```

### Check Build Issues

```bash
# Analyze bundle size
yarn build

# Preview to check for runtime issues
yarn preview
```

---

## Environment Variables

Some scripts can be controlled with environment variables:

### Bundle Analysis

Enable bundle analyzer during build:

```bash
VITE_BUNDLE_ANALYZE=true yarn build
```

This creates a visual analysis of your bundle size.

---

## Git Pre-commit Hook (Optional)

To automatically run linter before commits, add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
yarn lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Commit aborted."
  exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---