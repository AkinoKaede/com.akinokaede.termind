# Termind marketing assets

- `captures/<locale>/<device>/`: full-resolution app screenshots.
- `device_templates/`: versioned device bezel PNGs, source notes and checksums used by the framing script.
- `device_frames/<locale>/<device>/`: PNG device compositions.
- `screenshots/<locale>/<device>/`: final RGB JPEG artwork with an sRGB color profile.
- `header/header.png`: universal App Store header, shared across languages.
- `search_results/<locale>/search_results.png`: localized App Store search artwork.

Header artwork is 3840 × 1646 pixels; Search Results artwork is 3840 × 2560 pixels.
Japanese artwork uses upright Hiragino Sans text. Mac Command Generator
headlines use two vertical columns, read right to left, with punctuation preserved
in Japanese and both Chinese variants.

Both are opaque RGB PNGs with an embedded sRGB profile, exported at 1× from the
Figma `Header and Search Results` page. Keep review previews and export manifests
outside this asset tree.

Locales are `en`, `zh-hans`, `zh-hant`, and `ja`. Capture and frame directories are `iphone-6.3`,
`ipad-15`, `mac-14`, `iphone-duo-inner`, and `iphone-duo-outer`. Filenames use lowercase words separated by underscores.

## Image sizes

| Capture | Pixels |
| --- | --- |
| iPhone 18 Pro | 1206 × 2622 |
| iPhone Duo outer, portrait | 1398 × 2034 |
| iPhone Duo inner, unfolded landscape | 2853 × 2007 |
| iPad Pro 13-inch (M5) | 2752 × 2064 |
| Mac 14-inch Workspace / Overview | 3024 × 1964 |
| Other Mac windows | 2360 × 1480 |

App Store canvases are `iphone-6.3` (1206 × 2622), `ipad-13` (2752 × 2064),
`iphone-duo` (2853 × 2007), and `mac` (2880 × 1800). These sizes describe the artwork, not the capture device.
Preserve original captures and refresh derived frames and artwork when their sources change.

The Figma `App Store iPhone Duo` page supplies six boards per language. SSH, SFTP,
and Assistant use the inner display; Metrics and Vault use the outer display.
Overview combines Mac Workspace, Duo inner SFTP, and Duo outer Vault. Duo captures
use iOS 27.1; iPhone 18 Pro and iPad Pro captures use iOS/iPadOS 27.0.
All mobile captures use 9:41 and 100% battery while discharging.
The iPhone Duo platform label reads “FLEXIBLE”, “灵活变换”, “靈活變換”, or “自由に使い分け”.
Its inner-display frame places the volume buttons along the top edge near the right corner.

iPhone Overview uses two devices with aligned bottom edges: a fully visible
iPhone Assistant in the right foreground and an enlarged, partially cropped Mac
Workspace behind it. Mac and iPad Overview retain all three devices.
iPhone artwork uses `01_overview.jpg`; the other platforms retain `01_three_screens.jpg`.
Mac device frames use the 14-inch MacBook Pro M5 Space Black bezel, matching Workspace captures at native scale.
Mac `02_workspace.jpg` uses the separate ordinary-window capture `workspace_window.png`
(2360 × 1480), exported with `bundle exec fastlane mac screenshots scenes:workspace-window`.
The full-screen `workspace.png` remains the source for device-framed Overview artwork.

## Usage

Device frames use [fastlane frameit-frames](https://github.com/fastlane/frameit-frames)
and Apple artwork. The five templates required by the current pipeline are included in
`device_templates/`; see its README for sources, geometry and setup. Follow the owners' usage terms. Public access grants no additional rights to these assets or Termind branding.
