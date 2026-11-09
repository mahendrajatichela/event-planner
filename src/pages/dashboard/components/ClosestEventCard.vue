<script setup lang="ts">
import type { Component } from 'vue'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Wallet } from 'lucide-vue-next'

interface EventDetail {
  label: string
  value: string
  icon: Component
}

const details: EventDetail[] = [
  { label: 'Jadwal Acara', value: '14 - 15 Nov 2026', icon: Calendar },
  { label: 'Lokasi', value: 'JIExpo Kemayoran, Hall A', icon: MapPin },
  { label: 'Konfirmasi Tamu', value: '1,280 Orang Hadir', icon: Users },
  { label: 'Realisasi Anggaran', value: 'Rp 85.000.000', icon: Wallet },
]

const logisticsProgress = 82
</script>

<template>
  <Card id="closest-event-card"
    class="relative overflow-hidden border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900/70 to-neutral-950 p-6 shadow-xl">
    <div class="absolute left-0 top-0 h-full w-1.5 bg-emerald-500 shadow-md shadow-emerald-500"></div>

    <div class="flex items-center justify-between gap-3 mb-4">
      <Badge variant="default" class="gap-1.5">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Acara Terdekat
      </Badge>
      <Badge variant="secondary" class="font-mono text-xs">⏱️ 18 Hari Lagi</Badge>
    </div>

    <h3 class="text-xl font-extrabold text-neutral-100 tracking-tight">
      Tech Conference & Expo 2026
    </h3>
    <p class="text-xs text-neutral-400 mt-1 mb-5 leading-relaxed">
      Konferensi inovasi teknologi tahunan skala nasional menghadirkan 24 pembicara internasional, 40 stan
      pameran, dan workshop developer terpadu.
    </p>

    <!-- Details Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-neutral-800/80 bg-neutral-950/60 mb-5">
      <div v-for="detail in details" :key="detail.label" class="flex items-center gap-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-emerald-400">
          <component :is="detail.icon" class="h-4 w-4" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold text-neutral-500 block">{{ detail.label }}</span>
          <span class="text-xs font-semibold text-neutral-200">{{ detail.value }}</span>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="space-y-1.5">
      <div class="flex justify-between text-xs font-semibold">
        <span class="text-neutral-400">Kesiapan Logistik & Vendor</span>
        <span class="text-emerald-400 font-bold">{{ logisticsProgress }}% (Sesuai Jadwal)</span>
      </div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
        <div class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
          :style="{ width: `${logisticsProgress}%` }">
        </div>
      </div>
    </div>
  </Card>
</template>
