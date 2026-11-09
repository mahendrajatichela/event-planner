<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowLeft } from 'lucide-vue-next'

const route = useRoute()

const getModuleTitle = () => {
  const map: Record<string, string> = {
    events: 'Manajemen Acara Saya',
    calendar: 'Kalender & Timeline Acara',
    guests: 'Buku Tamu & RSVP Digital',
    budget: 'Anggaran & Pengeluaran Acara',
    vendors: 'Vendor & Mitra Rekanan',
    tasks: 'Checklist & Pembagian Tugas',
    reports: 'Laporan & Ekspor Data Acara',
    settings: 'Pengaturan Sistem & Profil',
  }
  const key = route.path.replace('/', '')
  return map[key] || 'Modul Acara'
}
</script>

<template>
  <div id="placeholder-page" class="flex min-h-[60vh] items-center justify-center p-4">
    <Card
      class="max-w-lg w-full p-8 text-center border-neutral-800 bg-neutral-900/70 shadow-2xl flex flex-col items-center"
    >
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-5 shadow-lg shadow-emerald-500/10"
      >
        <Clock class="h-8 w-8" />
      </div>

      <Badge variant="default" class="mb-3">SEGERA HADIR</Badge>

      <h2 class="text-2xl font-extrabold text-neutral-100 tracking-tight mb-2">
        {{ getModuleTitle() }}
      </h2>

      <p class="text-sm text-neutral-400 leading-relaxed mb-6">
        Halaman modul ini telah terintegrasi dengan struktur Tailwind CSS v4 dan shadcn-vue. Siap untuk tahap implementasi fitur detail berikutnya.
      </p>

      <router-link to="/dashboard">
        <Button class="gap-2 bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold">
          <ArrowLeft class="h-4 w-4" />
          Kembali ke Dashboard
        </Button>
      </router-link>
    </Card>
  </div>
</template>
