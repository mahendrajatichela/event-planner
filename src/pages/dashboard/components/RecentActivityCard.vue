<script setup lang="ts">
import { Card } from '@/components/ui/card'

type ActivityColor = 'emerald' | 'sky' | 'amber'

interface ActivityPart {
  text: string
  strong?: boolean
}

interface Activity {
  id: string
  parts: ActivityPart[]
  time: string
  color: ActivityColor
}

const dotClasses: Record<ActivityColor, string> = {
  emerald: 'bg-emerald-400 ring-emerald-500/20',
  sky: 'bg-sky-400 ring-sky-500/20',
  amber: 'bg-amber-400 ring-amber-500/20',
}

const activities: Activity[] = [
  {
    id: 'catering',
    parts: [
      { text: 'Citra W.', strong: true },
      { text: ' mengonfirmasi kontrak katering dengan ' },
      { text: 'Sedap Catering', strong: true },
      { text: '.' },
    ],
    time: '15 menit lalu',
    color: 'emerald',
  },
  {
    id: 'rundown',
    parts: [
      { text: 'Sarah Adelia', strong: true },
      { text: ' mengubah rundown sesi Keynote #2.' },
    ],
    time: '1 jam lalu',
    color: 'sky',
  },
  {
    id: 'payment',
    parts: [
      { text: 'Pembayaran termin 1 ' },
      { text: 'Audio Rigging', strong: true },
      { text: ' telah diajukan.' },
    ],
    time: '3 jam lalu',
    color: 'amber',
  },
]
</script>

<template>
  <Card class="border-neutral-800 bg-neutral-900/60 p-5 shadow-xl">
    <div class="pb-3 border-b border-neutral-800">
      <h3 class="text-base font-bold text-neutral-100">Aktivitas Terkini</h3>
      <p class="text-xs text-neutral-400">Pembaruan logistik dan koordinasi tim</p>
    </div>

    <div class="space-y-4 pt-3">
      <div v-for="activity in activities" :key="activity.id" class="flex items-start gap-3">
        <span class="mt-1 h-2 w-2 rounded-full ring-4 shrink-0" :class="dotClasses[activity.color]"></span>
        <div class="space-y-0.5">
          <p class="text-xs text-neutral-300 leading-tight">
            <template v-for="(part, i) in activity.parts" :key="i">
              <strong v-if="part.strong" class="text-neutral-100">{{ part.text }}</strong>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
          <span class="text-[10px] text-neutral-500 block">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>
