export interface AppFeatures {
  // Modul
  events: boolean
  calendar: boolean
  guests: boolean
  budget: boolean
  vendors: boolean
  tasks: boolean
  reports: boolean

  // UI & Widgets
  notifications: boolean
  storageWidget: boolean
  quickActions: boolean
}

export type FeatureKey = keyof AppFeatures

const parseEnvBoolean = (value: string | undefined, defaultValue = true): boolean => {
  if (value === undefined || value === '') {
    return defaultValue
  }
  const normalized = value.trim().toLowerCase()
  return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on'
}

/**
 * Konfigurasi Feature Flag aplikasi Event Planner.
 * Nilai dibaca langsung dari environment variable Vite (VITE_FEATURE_*)
 */
export const features: AppFeatures = Object.freeze({
  // Modul Navigasi
  events: parseEnvBoolean(import.meta.env.VITE_FEATURE_EVENTS, true),
  calendar: parseEnvBoolean(import.meta.env.VITE_FEATURE_CALENDAR, true),
  guests: parseEnvBoolean(import.meta.env.VITE_FEATURE_GUESTS, true),
  budget: parseEnvBoolean(import.meta.env.VITE_FEATURE_BUDGET, true),
  vendors: parseEnvBoolean(import.meta.env.VITE_FEATURE_VENDORS, true),
  tasks: parseEnvBoolean(import.meta.env.VITE_FEATURE_TASKS, true),
  reports: parseEnvBoolean(import.meta.env.VITE_FEATURE_REPORTS, true),

  // UI & Widgets
  notifications: parseEnvBoolean(import.meta.env.VITE_FEATURE_NOTIFICATIONS, true),
  storageWidget: parseEnvBoolean(import.meta.env.VITE_FEATURE_STORAGE_WIDGET, true),
  quickActions: parseEnvBoolean(import.meta.env.VITE_FEATURE_QUICK_ACTIONS, true),
})

/**
 * Helper untuk memeriksa apakah fitur tertentu aktif atau nonaktif
 */
export const isFeatureEnabled = (key: FeatureKey): boolean => {
  return features[key] ?? true
}

export default features
