# Termind marketing assets

- `captures/<locale>/<device>/`: full-resolution app screenshots.
- `device_frames/<locale>/<device>/`: PNG device compositions.
- `app_store/<locale>/<device>/`: final RGB JPEG artwork with an sRGB color profile.

Locales are `en`, `zh-hans`, and `zh-hant`. Capture and frame directories are `iphone-6.3`,
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
The iPhone Duo platform label reads “FLEXIBLE”, “灵活变换”, or “靈活變換”.
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
and Apple artwork. Follow the owners' usage terms; licensed source templates are
not included. Public access grants no additional rights to these assets or Termind branding.
