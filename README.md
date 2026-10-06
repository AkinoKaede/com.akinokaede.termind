# Termind website and brand assets

The public website, product screenshots, App Store artwork, and brand assets for
[Termind](https://termind.akinokaede.com).

## Structure

- `src/`: Astro pages, components, styles, translations, and product information.
- `public/`: icons, redirects, response headers, and public integration metadata.
- `assets/`: screenshots and final App Store artwork; see the
  [asset guide](assets/README.md).
- `design/brand/`: brand artwork and [visual guidelines](design/brand/README.md).
- `design/paywall/`: light and dark product feature illustrations.

## Development

Use Node.js 22.12 or newer, following the installed Astro version's requirements.
Install the locked dependencies and start the development server:

```sh
npm ci
npm run dev
```

Validate and build the static website:

```sh
npm run build
npm run preview
```

The build writes to `dist/`. Cloudflare Pages builds the repository's `main`
branch from the root directory using `npm run build`, with `dist` as its output.
This repository builds independently of the Termind application source.

## Content and languages

English pages live at `/`, Simplified Chinese at `/zh-hans/`, and Traditional
Chinese at `/zh-hant/`. Legacy `/zh/` routes redirect to Simplified Chinese.
Shared prices are maintained in `src/lib/pricing.ts`; comparison content and
public sources are in `src/lib/comparisons/`.

`src/lib/marketingImages.ts` selects the screenshots used by the site.
`ScreenshotPicture.astro` generates appropriately sized AVIF, WebP, and JPEG
images. Keep full-resolution captures and device frames in `assets/`, rather
than copying them into `public/`.

Check the English and Chinese pages, image rendering, mobile layouts, keyboard
navigation, and reduced-motion behavior when changing the site.

## Asset usage

Public access to this repository does not grant additional rights to Termind
branding or third-party artwork. Preserve existing notices and follow the
applicable owners' usage terms.
