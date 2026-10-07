# Termind website and assets

The [Termind](https://termind.akinokaede.com) website, screenshots, App Store artwork, and design assets.

## Structure

- `src/`: Astro pages, components, styles, and localized content.
- `public/`: icons, redirects, headers, and public integration metadata.
- [`assets/`](assets/README.md): source captures, device frames, and App Store artwork.
- [`design/`](design/README.md): brand artwork and paywall illustrations.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Cloudflare Pages builds `main` from the repository root with `npm run build` and serves `dist/`.

English uses `/`, Simplified Chinese `/zh-hans/`, and Traditional Chinese `/zh-hant/`.
All Japanese pages are available under `/ja/`, including pricing, comparisons, FAQ, security, privacy, and support.
Legacy `/zh/` routes redirect to Simplified Chinese.

`src/lib/marketingImages.ts` selects images from `assets/`; Astro generates responsive
AVIF, WebP, and JPEG variants. Keep source images out of `public/`.

Public access does not grant additional rights to Termind branding or third-party
artwork. Preserve attribution and follow the owners' usage terms.
