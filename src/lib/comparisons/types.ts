import type { ComparisonFeatureId } from "./termind";

export interface CompetitorContent {
  name: string;
  owner: string;
  attribution?: string;
  summary: string;
  description: string;
  termindRecommendationTitle: string;
  termindRecommendation: string;
  recommendationTitle: string;
  recommendation: string;
  features: Partial<Record<ComparisonFeatureId, { title: string; note: string }>>;
}
