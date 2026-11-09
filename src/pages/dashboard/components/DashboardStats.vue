<script setup lang="ts">
import { computed } from 'vue'
import { useFeatures } from '@/composables/useFeatures'
import { CalendarDays, Wallet, CheckSquare } from 'lucide-vue-next'
import { StatCard, type StatCardProps } from '@/components/ui/stat-card'

interface StatItem extends StatCardProps {
  id: string
  show: boolean
}

const { features } = useFeatures()

const stats = computed<StatItem[]>(() => [
  {
    id: 'events',
    title: 'Total Acara Aktif',
    value: '4 Acara',
    icon: CalendarDays,
    iconVariant: 'emerald',
    show: features.events,
  },
  {
    id: 'budget',
    title: 'Realisasi Anggaran',
    value: 'Rp 142.5 Jt',
    icon: Wallet,
    iconVariant: 'emerald',
    show: features.budget,
  },
  {
    id: 'tasks',
    title: 'Progres Checklist',
    value: '38 / 45',
    icon: CheckSquare,
    iconVariant: 'amber',
    show: features.tasks,
  },
])

const visibleStats = computed(() => stats.value.filter((item) => item.show))
</script>

<template>
  <div id="dashboard-stats" class="contents">
    <div
      v-for="stat in visibleStats"
      :key="stat.id"
      class="flex-1"
    >
      <StatCard
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :icon-variant="stat.iconVariant"
      />
    </div>
  </div>
</template>
