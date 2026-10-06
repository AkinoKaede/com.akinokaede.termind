# Termind marketing assets

- `captures/<locale>/<device>/`: full-resolution app screenshots.
- `device_frames/<locale>/<device>/`: PNG device compositions.
- `app_store/<locale>/<device>/`: final RGB JPEG artwork with an sRGB color profile.

Locales are `en`, `zh-hans`, and `zh-hant`. Capture and frame devices are `iphone`,
`ipad`, and `mac`. Filenames use lowercase words separated by underscores.

## Image sizes

| Capture | Pixels |
| --- | --- |
| iPhone 17 Pro | 1206 × 2622 |
| iPad Pro 13-inch (M5) | 2752 × 2064 |
| Mac Workspace / Overview | 3024 × 1964 |
| Other Mac windows | 2360 × 1480 |

App Store canvases are `iphone-6.5` (1284 × 2778), `ipad-13` (2752 × 2064),
and `mac` (2880 × 1800). These sizes describe the artwork, not the capture device.
Preserve original captures and refresh derived frames and artwork when their sources change.

## Usage

Device frames use [fastlane frameit-frames](https://github.com/fastlane/frameit-frames)
and Apple artwork. Follow the owners' usage terms; licensed source templates are
not included. Public access grants no additional rights to these assets or Termind branding.
