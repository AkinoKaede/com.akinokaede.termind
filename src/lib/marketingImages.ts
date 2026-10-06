import type { ImageMetadata } from "astro";

import assistantDuoOuterEn from "../../assets/device_frames/en/iphone-duo-outer/assistant.png";
import assistantDuoOuterZhHans from "../../assets/device_frames/zh-hans/iphone-duo-outer/assistant.png";
import assistantDuoOuterZhHant from "../../assets/device_frames/zh-hant/iphone-duo-outer/assistant.png";
import sftpDuoInnerEn from "../../assets/device_frames/en/iphone-duo-inner/sftp.png";
import sftpDuoInnerZhHans from "../../assets/device_frames/zh-hans/iphone-duo-inner/sftp.png";
import sftpDuoInnerZhHant from "../../assets/device_frames/zh-hant/iphone-duo-inner/sftp.png";
import assistantIphoneEn from "../../assets/device_frames/en/iphone-6.3/assistant.png";
import assistantIphoneZhHans from "../../assets/device_frames/zh-hans/iphone-6.3/assistant.png";
import assistantIphoneZhHant from "../../assets/device_frames/zh-hant/iphone-6.3/assistant.png";
import metricsIpadEn from "../../assets/device_frames/en/ipad-15/metrics.png";
import metricsIpadZhHans from "../../assets/device_frames/zh-hans/ipad-15/metrics.png";
import metricsIpadZhHant from "../../assets/device_frames/zh-hant/ipad-15/metrics.png";
import sftpIpadEn from "../../assets/device_frames/en/ipad-15/sftp.png";
import sftpIpadZhHans from "../../assets/device_frames/zh-hans/ipad-15/sftp.png";
import sftpIpadZhHant from "../../assets/device_frames/zh-hant/ipad-15/sftp.png";
import sshIphoneEn from "../../assets/device_frames/en/iphone-6.3/ssh.png";
import sshIphoneZhHans from "../../assets/device_frames/zh-hans/iphone-6.3/ssh.png";
import sshIphoneZhHant from "../../assets/device_frames/zh-hant/iphone-6.3/ssh.png";
import vaultIpadEn from "../../assets/device_frames/en/ipad-15/vault.png";
import vaultIpadZhHans from "../../assets/device_frames/zh-hans/ipad-15/vault.png";
import vaultIpadZhHant from "../../assets/device_frames/zh-hant/ipad-15/vault.png";
import vaultIphoneEn from "../../assets/device_frames/en/iphone-6.3/vault.png";
import vaultIphoneZhHans from "../../assets/device_frames/zh-hans/iphone-6.3/vault.png";
import vaultIphoneZhHant from "../../assets/device_frames/zh-hant/iphone-6.3/vault.png";
import workspaceMacEn from "../../assets/device_frames/en/mac-14/workspace.png";
import workspaceMacZhHans from "../../assets/device_frames/zh-hans/mac-14/workspace.png";
import workspaceMacZhHant from "../../assets/device_frames/zh-hant/mac-14/workspace.png";

export type MarketingAssetLocale = "en" | "zh-hans" | "zh-hant";

const duoOuterFrames = {
  assistant: { en: assistantDuoOuterEn, "zh-hans": assistantDuoOuterZhHans, "zh-hant": assistantDuoOuterZhHant },
} satisfies Record<string, Record<MarketingAssetLocale, ImageMetadata>>;

const duoInnerFrames = {
  sftp: { en: sftpDuoInnerEn, "zh-hans": sftpDuoInnerZhHans, "zh-hant": sftpDuoInnerZhHant },
} satisfies Record<string, Record<MarketingAssetLocale, ImageMetadata>>;

const iphoneFrames = {
  assistant: { en: assistantIphoneEn, "zh-hans": assistantIphoneZhHans, "zh-hant": assistantIphoneZhHant },
  ssh: { en: sshIphoneEn, "zh-hans": sshIphoneZhHans, "zh-hant": sshIphoneZhHant },
  vault: { en: vaultIphoneEn, "zh-hans": vaultIphoneZhHans, "zh-hant": vaultIphoneZhHant },
} satisfies Record<string, Record<MarketingAssetLocale, ImageMetadata>>;

const ipadFrames = {
  metrics: { en: metricsIpadEn, "zh-hans": metricsIpadZhHans, "zh-hant": metricsIpadZhHant },
  sftp: { en: sftpIpadEn, "zh-hans": sftpIpadZhHans, "zh-hant": sftpIpadZhHant },
  vault: { en: vaultIpadEn, "zh-hans": vaultIpadZhHans, "zh-hant": vaultIpadZhHant },
} satisfies Record<string, Record<MarketingAssetLocale, ImageMetadata>>;

const workspaceFrames = {
  en: workspaceMacEn,
  "zh-hans": workspaceMacZhHans,
  "zh-hant": workspaceMacZhHant,
} satisfies Record<MarketingAssetLocale, ImageMetadata>;

export function iphoneFrame(feature: keyof typeof iphoneFrames, locale: MarketingAssetLocale): ImageMetadata {
  return iphoneFrames[feature][locale];
}

export function duoInnerFrame(feature: keyof typeof duoInnerFrames, locale: MarketingAssetLocale): ImageMetadata {
  return duoInnerFrames[feature][locale];
}

export function ipadFrame(feature: keyof typeof ipadFrames, locale: MarketingAssetLocale): ImageMetadata {
  return ipadFrames[feature][locale];
}

export function workspaceFrame(locale: MarketingAssetLocale): ImageMetadata {
  return workspaceFrames[locale];
}

export function duoOuterFrame(feature: keyof typeof duoOuterFrames, locale: MarketingAssetLocale): ImageMetadata {
  return duoOuterFrames[feature][locale];
}
