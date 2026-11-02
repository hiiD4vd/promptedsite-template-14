# Earbuds — Immersive Audio Experience

Typed React interface plus an explicit JavaScript scene engine. Engine JavaScript is not covered by TypeScript checking. Specifications are provided in an accessible panel because the supplied source did not implement the former /specs route.

## Run

Use Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Production media loads from the versioned public R2 manifest in src/config/assets.json. No cloud credentials are required or included.

## Browser preview

```sh
npm run build:artifact
npm run preview
```

The complete dist/ folder contains same-origin media verified against the release checksums. Mount the entire folder in a preview capable of serving companion files and WebGL. A shell localhost address is not a preview accessible from another device. Platform CSP or missing Artifact capabilities cannot be fixed by a prompt.

## Build

```sh
npm run build
npm run assets:verify
```

GitHub is used only for the media fallback. Dependencies and existing license notices are retained. This package contains no Git history, credentials, migration reports, or bundled product media. Worker/decoder runtime code may remain local.
