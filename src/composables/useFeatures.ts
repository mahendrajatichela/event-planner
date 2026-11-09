import { readonly } from 'vue'
import { features, isFeatureEnabled, type AppFeatures, type FeatureKey } from '../config/features'

export function useFeatures() {
  return {
    features: readonly(features) as AppFeatures,
    isFeatureEnabled,
  }
}

export default useFeatures
