<script setup lang="ts">
import { useFeatures } from '@/composables/useFeatures'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  Plus,
} from 'lucide-vue-next'
import DashboardStats from './components/DashboardStats.vue'
import RecentActivityCard from './components/RecentActivityCard.vue'
import ClosestEventCard from './components/ClosestEventCard.vue'
import { MiniCalendar } from '@/components/calendar'

const { features } = useFeatures()

</script>

<template>
  <div id="dashboard-page" class="space-y-8 max-w-7xl mx-auto">
    <!-- Header Banner -->
    <div
      class="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-950 p-6 md:p-8 backdrop-blur-sm">
      <div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none">
      </div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <Badge variant="default" class="gap-1.5 py-1 px-3">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistem Perencanaan Terpadu
          </Badge>
          <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-100">
            Dashboard Manajemen Acara
          </h1>
          <p class="text-sm text-neutral-400 leading-relaxed">
            Pantau persiapan rundown acara, konfirmasi kehadiran tamu, realisasi anggaran biaya, dan kemajuan tugas tim
            secara terpadu.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <Button v-if="features.quickActions && features.reports" id="btn-export-report" variant="outline"
            class="gap-2 border-neutral-800 hover:border-neutral-700 hover:text-emerald-400">
            <Download class="h-4 w-4" />
            <span>Ekspor Laporan</span>
          </Button>

          <Button v-if="features.quickActions && features.events" id="btn-new-event"
            class="gap-2 bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold shadow-lg shadow-emerald-500/20">
            <Plus class="h-4 w-4 stroke-[2.5]" />
            <span>Buat Acara Baru</span>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <DashboardStats />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div v-if="features.events" class="lg:col-span-7 space-y-6">
        <ClosestEventCard />
      </div>

      <div class="lg:col-span-5 space-y-6">
        <MiniCalendar v-if="features.calendar" />

        <RecentActivityCard />
      </div>
    </div>
  </div>
</template>
