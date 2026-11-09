<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFeatures } from '@/composables/useFeatures'
import type { FeatureKey } from '@/config/features'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  CalendarDays,
  Calendar,
  Wallet,
  Briefcase,
  CheckSquare,
  FileText,
  Settings,
  ChevronLeft,
  X,
} from 'lucide-vue-next'

const props = defineProps<{
  isCollapsed: boolean
  isMobileOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'closeMobile'): void
  (e: 'toggleCollapse'): void
}>()

const route = useRoute()
const { features, isFeatureEnabled } = useFeatures()

interface NavItem {
  id: string
  label: string
  to: string
  icon: any
  feature?: FeatureKey
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'warning' | 'info'
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'MENU UTAMA',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        to: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        id: 'events',
        label: 'Acara Saya',
        to: '/events',
        icon: CalendarDays,
        feature: 'events',
      },
      {
        id: 'calendar',
        label: 'Kalender & Jadwal',
        to: '/calendar',
        icon: Calendar,
        feature: 'calendar',
      },
    ],
  },
  {
    title: 'MANAJEMEN ACARA',
    items: [
      {
        id: 'budget',
        label: 'Anggaran Biaya',
        to: '/budget',
        icon: Wallet,
        feature: 'budget',
      },
      {
        id: 'vendors',
        label: 'Vendor & Mitra',
        to: '/vendors',
        icon: Briefcase,
        feature: 'vendors',
      },
      {
        id: 'tasks',
        label: 'Checklist & Tugas',
        to: '/tasks',
        icon: CheckSquare,
        badge: '5',
        badgeVariant: 'warning',
        feature: 'tasks',
      },
    ],
  },
  {
    title: 'PENGATURAN',
    items: [
      {
        id: 'reports',
        label: 'Laporan Acara',
        to: '/reports',
        icon: FileText,
        feature: 'reports',
      },
      {
        id: 'settings',
        label: 'Pengaturan',
        to: '/settings',
        icon: Settings,
      },
    ],
  },
]

const filteredNavGroups = computed(() => {
  return navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.feature || isFeatureEnabled(item.feature)),
    }))
    .filter((group) => group.items.length > 0)
})

const isCurrentRoute = (path: string) => {
  if (path === '/dashboard' && (route.path === '/' || route.path === '/dashboard')) {
    return true
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <aside id="app-sidebar"
    class="fixed md:sticky top-0 left-0 z-50 flex h-screen flex-col border-r border-neutral-800/80 bg-neutral-950 transition-all duration-300"
    :class="[
      isCollapsed ? 'w-[72px]' : 'w-64',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]">
    <!-- Brand Header -->
    <div class="relative flex h-16 items-center border-b border-neutral-800/80 px-4 shrink-0 transition-all"
      :class="isCollapsed ? 'justify-center' : 'justify-between'">
      <router-link to="/dashboard" class="flex items-center gap-3 group" :title="isCollapsed ? 'Event Planner' : ''">
        <div v-if="!isCollapsed" class="flex items-baseline gap-1.5 whitespace-nowrap overflow-hidden">
          <span class="text-base font-extrabold tracking-tight text-neutral-100">Event</span>
          <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Planner</span>
        </div>
      </router-link>

      <!-- Desktop Collapse Toggle Button (Top Right) -->
      <button
        id="btn-sidebar-collapse"
        type="button"
        class="hidden md:flex items-center justify-center transition-all cursor-pointer"
        :class="[
          isCollapsed
            ? 'absolute -right-3.5 top-4.5 z-30 h-7 w-7 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/50 shadow-md shadow-black/40'
            : 'h-8 w-8 rounded-lg border border-neutral-800/80 text-neutral-400 hover:bg-neutral-900 hover:text-emerald-400 hover:border-neutral-700',
        ]"
        :title="isCollapsed ? 'Perbesar Menu' : 'Kecilkan Menu'"
        @click="emit('toggleCollapse')">
        <ChevronLeft class="h-4 w-4 shrink-0 transition-transform duration-200"
          :class="isCollapsed ? 'rotate-180' : ''" />
      </button>

      <!-- Mobile Close Button -->
      <button
        class="flex md:hidden h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        @click="emit('closeMobile')">
        <X class="h-4 w-4" />
      </button>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      <div v-for="group in filteredNavGroups" :key="group.title" class="space-y-1.5">
        <h5 v-if="!isCollapsed" class="px-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          {{ group.title }}
        </h5>

        <div class="space-y-1">
          <router-link v-for="item in group.items" :key="item.id" :to="item.to"
            class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all group relative cursor-pointer"
            :class="[
              isCurrentRoute(item.to)
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200 border border-transparent',
              isCollapsed ? 'justify-center px-0' : '',
            ]" :title="isCollapsed ? item.label : ''" @click="emit('closeMobile')">
            <component :is="item.icon" class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
              :class="isCurrentRoute(item.to) ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-emerald-400'" />

            <span v-if="!isCollapsed" class="flex-1 truncate">{{ item.label }}</span>

            <Badge v-if="!isCollapsed && item.badge" :variant="item.badgeVariant || 'default'"
              class="text-[10px] py-0 px-1.5 font-bold">
              {{ item.badge }}
            </Badge>
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>
