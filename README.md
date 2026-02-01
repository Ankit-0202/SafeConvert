# SafeConvert

Privacy-first, client-side PDF and file toolkit. SafeConvert runs entirely in your browser so files never leave your device.

## Highlights

- 100% client-side processing (no uploads)
- Fast conversions with WebAssembly
- Works offline after first load
- Full toolkit: merge, split, compress, convert, edit, secure, OCR, and more
- Self-hostable

## Live Demo

<https://safeconvert.vercel.app>

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

```bash
vercel --prod
```

## Configuration

- The app is built with Vite and generates a static `dist` output.
- Simple mode: `SIMPLE_MODE=true npm run build`.
- WASM assets are served locally by default.

## Repository Structure

- `index.html` and top-level HTML files are entry points.
- `src/pages/` contains tool pages.
- `src/js/` contains app logic.
- `public/` contains static assets.

## License

SafeConvert is licensed under the GNU AGPL v3 or later. See `LICENSE` for full terms.
