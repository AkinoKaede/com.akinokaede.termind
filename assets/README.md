# Termind marketing assets

## Organization

- `app_store/<locale>/<device>/`: final App Store artwork, exported as opaque
  RGB JPEGs with an sRGB color profile.
- `captures/<locale>/<device>/`: full-resolution source app captures.
- `device_frames/<locale>/<device>/`: PNG compositions using device frames.

Locales are `en`, `zh-hans`, and `zh-hant`. Capture and frame filenames use
lowercase underscore-separated `<feature>.png`, for example `captures/en/iphone/vault.png` and
`device_frames/zh-hans/mac/workspace.png`. Mac Metrics captures use
`metrics_overview.png`.

## Dimensions and production stages

| Source device | Capture dimensions |
| --- | --- |
| iPhone 17 Pro, portrait | 1206 × 2622 |
| iPad Pro 13-inch (M5), landscape | 2752 × 2064 |
| Mac Workspace / Overview, built-in display | 3024 × 1964 |
| Other Mac windows, including Command Generator | 2360 × 1480 |

The `app_store/*/iphone-6.5/` folder describes the final 1284 × 2778 artwork
canvas, not the source screenshot device. App Store folders also include
`ipad-13` and `mac` artwork. Preserve source capture resolution; device frames
and final App Store artwork are separate outputs and must be refreshed when
their source images change.

The website imports selected frames through `src/lib/marketingImages.ts` and
creates web-sized image variants during the Astro build. Do not duplicate the
full-resolution source images in `public/`.

## Device artwork

Device compositions use artwork distributed through
[fastlane frameit-frames](https://github.com/fastlane/frameit-frames) and Apple's
device artwork. Follow the respective owners' usage terms. Licensed source
frame downloads are not included in this repository. Public availability does
not grant additional rights to third-party artwork or Termind branding.
