/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Feature Flags
  readonly VITE_FEATURE_EVENTS?: string
  readonly VITE_FEATURE_CALENDAR?: string
  readonly VITE_FEATURE_GUESTS?: string
  readonly VITE_FEATURE_BUDGET?: string
  readonly VITE_FEATURE_VENDORS?: string
  readonly VITE_FEATURE_TASKS?: string
  readonly VITE_FEATURE_REPORTS?: string
  readonly VITE_FEATURE_NOTIFICATIONS?: string
  readonly VITE_FEATURE_STORAGE_WIDGET?: string
  readonly VITE_FEATURE_QUICK_ACTIONS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
