# Device templates

Versioned source templates used by Termind screenshot framing. These files are part of the website/assets repository; there is no separate template checkout or local import step.

From the Termind repository, initialize the assets once:

```sh
git submodule update --init com.akinokaede.termind
```

The framing script reads `com.akinokaede.termind/assets/device_templates` by default. ImageMagick and the main repository's Bundler dependencies are required. Native app builds do not require these assets.

Apple artwork remains subject to its original usage terms. Repository access does not grant additional rights to the artwork.

## Sources and geometry

All source packages are from [Apple Design Resources](https://developer.apple.com/design/resources/#product-bezels).

| File | Source package / image | Canvas | Screenshot opening |
| --- | --- | --- | --- |
| iphone-18-pro.png | Bezel-iPhone-18.dmg / PNG/iPhone 18 Pro/iPhone 18 Pro - Silver - Portrait.png | 1350×2760 | 1206×2622 at +72+69 |
| iphone-duo-outer.png | Bezel-iPhone-Duo.dmg / PNG/iPhone Duo - Star White - Outer Closed Portrait.png | 1574×2194 | 1398×2034 at +88+80 |
| iphone-duo-inner.png | Bezel-iPhone-Duo.dmg / PNG/iPhone Duo - Star White - Inner Open Portrait.png | 2247×3093 | 2007×2853 at +120+120; rotate clockwise for landscape |
| ipad-pro-13-m5.png | Bezel-iPad-Pro-(M5).dmg / PNG/iPad Pro (M5) 13-inch - Space Black - Portrait.png | 2300×3000 | 2064×2752 at +118+124; rotate counterclockwise for landscape |
| macbook-pro-14-template.png | Bezel-MacBook-Pro-M5.dmg / PNG/MacBook Pro M5 14-inch Space Black.png | 3860×2320 | 3024×1964 at +418+68 |

The Mac template removes only the original 220px transparent top margin:

```sh
magick 'MacBook Pro M5 14-inch Space Black.png' -crop 3860x2320+0+220 +repage macbook-pro-14-template.png
```

The other four PNGs are copied without image changes. DMG downloads and unused device variants are not included. Verify bytes with `shasum -a 256 -c SHA256SUMS`. Commit and push changes to the assets repository before updating its gitlink in the main repository.
