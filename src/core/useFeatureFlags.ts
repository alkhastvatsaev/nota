"use client";

import { useFeatureFlagsFromContext } from "@/core/FeatureFlagsProvider";
import type { NotaFeatureFlags } from "@/core/featureFlags";

export function useFeatureFlags(): NotaFeatureFlags {
  return useFeatureFlagsFromContext();
}

export function useFeatureFlag<K extends keyof NotaFeatureFlags>(key: K): boolean {
  const flags = useFeatureFlags();
  return flags[key];
}
