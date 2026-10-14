import type { ImageMetadata } from "astro";

export type MarketingAssetLocale = "en" | "zh-hans" | "zh-hant" | "ja" | "ko" | "de" | "fr";

const frames = import.meta.glob<{ default: ImageMetadata }>(
  [
    "../../assets/device_frames/*/iphone-6.3/{assistant,ssh,vault}.png",
    "../../assets/device_frames/*/ipad-15/{metrics,sftp,vault}.png",
    "../../assets/device_frames/*/mac-14/workspace.png",
    "../../assets/device_frames/*/iphone-duo-inner/sftp.png",
    "../../assets/device_frames/*/iphone-duo-outer/assistant.png",
  ],
  { eager: true },
);

function frame(device: string, feature: string, locale: MarketingAssetLocale): ImageMetadata {
  const path = (language: MarketingAssetLocale) => `../../assets/device_frames/${language}/${device}/${feature}.png`;
  const image = frames[path(locale)];
  if (!image) throw new Error(`Missing marketing image: ${locale}/${device}/${feature}`);
  return image.default;
}

export function iphoneFrame(feature: "assistant" | "ssh" | "vault", locale: MarketingAssetLocale): ImageMetadata {
  return frame("iphone-6.3", feature, locale);
}

export function duoInnerFrame(feature: "sftp", locale: MarketingAssetLocale): ImageMetadata {
  return frame("iphone-duo-inner", feature, locale);
}

export function ipadFrame(feature: "metrics" | "sftp" | "vault", locale: MarketingAssetLocale): ImageMetadata {
  return frame("ipad-15", feature, locale);
}

export function workspaceFrame(locale: MarketingAssetLocale): ImageMetadata {
  return frame("mac-14", "workspace", locale);
}

export function duoOuterFrame(feature: "assistant", locale: MarketingAssetLocale): ImageMetadata {
  return frame("iphone-duo-outer", feature, locale);
}
