# SIGNAL//NOISE

A harsh but navigable field guide to death industrial, power electronics,
Japanoise, noisecore, harsh noise wall and the metal/noise borderlands.

The guide contains more than 100 annotated releases, five ordered listening
routes, genre notes, source-search links and a browser-local listening tracker.

## Run locally

Requires Node 22 or newer.

```bash
npm ci
npm run dev:github
```

Vite will print the local address. The GitHub Pages build can be checked with:

```bash
npm run build:github
npx vite preview --outDir docs
```

## Publish on GitHub Pages

1. Create a repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included `deploy-pages.yml` workflow builds and publishes the site.

The static build uses relative asset paths, so it works under both a user Pages
domain and a project subdirectory. Tracker data remains in each visitor's local
browser; export/import buttons provide a portable JSON backup.

## Editing the guide

Release data, listening routes, the glossary and the timeline live in
`lib/guide-data.ts`. The shared interface is in
`components/noise-guide.tsx`, and the complete visual system is in
`app/globals.css`.
