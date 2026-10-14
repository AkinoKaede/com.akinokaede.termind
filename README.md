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

Language navigation follows language-code order: German, English, French, Japanese, Korean,
Simplified Chinese, and Traditional Chinese. Their routes are `/de/`, `/`, `/fr/`,
`/ja/`, `/ko/`, `/zh-hans/`, and `/zh-hant/`, respectively.
English remains the default language.
Every language includes pricing, comparisons, FAQ, security, privacy, and support.
Language switching preserves the current page, with localized canonical and
`hreflang` links on every route.
Legacy `/zh/` routes redirect to Simplified Chinese.

`src/lib/marketingImages.ts` selects images from `assets/`; Astro generates responsive
AVIF, WebP, and JPEG variants. Keep source images out of `public/`.
Device frames and social preview images use the page's language without English
fallbacks. Missing German, French, or Korean copy and missing localized images
fail the build. Run `npm run test:locales` after `npm run build` to check copy
coverage, all localized routes, metadata, links, and generated assets.

Public access does not grant additional rights to Termind branding or third-party
artwork. Preserve attribution and follow the owners' usage terms.
