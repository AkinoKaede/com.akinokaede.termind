import type { SiteLocale } from "../i18n";
import { getTermindFeatures, type ComparisonFeatureId } from "./termind";
import { getTermius } from "./termius";
import { getWebSSH } from "./webssh";
import { getServerCat } from "./servercat";
import { getPrompt3 } from "./prompt3";
import type { CompetitorContent } from "./types";

export const comparisonSlugs = ["termius", "webssh", "servercat", "prompt-3"] as const;
export type ComparisonSlug = typeof comparisonSlugs[number];

const providers: Record<ComparisonSlug, (locale: SiteLocale) => CompetitorContent> = {
  termius: getTermius,
  webssh: getWebSSH,
  servercat: getServerCat,
  "prompt-3": getPrompt3,
};

const topics: Record<ComparisonSlug, ComparisonFeatureId[]> = {
  termius: ["sftp", "port-forwarding", "tailscale", "ai", "hardware-keys"],
  webssh: ["sftp", "tailscale", "external-agents", "hardware-keys"],
  servercat: ["monitoring", "containers", "ai", "tailscale", "hardware-keys"],
  "prompt-3": ["connections", "ai", "tailscale", "plans", "hardware-keys"],
};

export function getComparison(slug: ComparisonSlug, locale: SiteLocale) {
  const competitor = providers[slug](locale);
  const features = getTermindFeatures(locale);
  const rows = (Object.keys(competitor.features) as ComparisonFeatureId[]).flatMap((id) => {
    const detail = competitor.features[id];
    return detail ? [{ ...features[id], competitor: detail }] : [];
  });
  return { competitor, rows };
}

export function getComparisonPreviews(locale: SiteLocale) {
  const features = getTermindFeatures(locale);
  return comparisonSlugs.map((slug) => {
    const competitor = providers[slug](locale);
    return {
      slug,
      name: competitor.name,
      summary: competitor.summary,
      topics: topics[slug].map((id) => features[id].feature),
    };
  });
}
