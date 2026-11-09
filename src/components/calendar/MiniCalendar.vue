<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowUpRight,
} from 'lucide-vue-next'
import { initialEvents, type CalendarEvent } from '@/data/mockEvents'

const events = ref<CalendarEvent[]>([...initialEvents])

// Date State (Defaults to Current Month / Today)
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0 - 11

const formatPad = (n: number) => String(n).padStart(2, '0')
const toDateString = (year: number, month: number, day: number) =>
  `${year}-${formatPad(month + 1)}-${formatPad(day)}`

// Selected date starts at today's date
const selectedDateStr = ref<string>(
  toDateString(today.getFullYear(), today.getMonth(), today.getDate())
)

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const dayHeaders = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

const currentMonthLabel = computed(() => {
  return `${monthNames[currentMonth.value]} ${currentYear.value}`
})

// Calendar Grid Calculations
interface CalendarCell {
  day: number
  dateStr: string
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

const calendarGrid = computed<CalendarCell[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value

  const firstDayOfMonth = new Date(year, month, 1)
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  // ISO Monday is day 0 (Mon: 0, Tue: 1 ... Sun: 6)
  let firstDayIndex = firstDayOfMonth.getDay() - 1
  if (firstDayIndex < 0) firstDayIndex = 6

  const todayStr = toDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const cells: CalendarCell[] = []

  // 1. Previous Month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const prevMonthIdx = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const dStr = toDateString(prevYear, prevMonthIdx, day)

    const cellEvents = events.value.filter(
      (e) => e.date === dStr || (e.endDate && dStr >= e.date && dStr <= e.endDate)
    )

    cells.push({
      day,
      dateStr: dStr,
      isCurrentMonth: false,
      isToday: dStr === todayStr,
      isSelected: dStr === selectedDateStr.value,
      events: cellEvents,
    })
  }

  // 2. Current Month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dStr = toDateString(year, month, day)
    const cellEvents = events.value.filter(
      (e) => e.date === dStr || (e.endDate && dStr >= e.date && dStr <= e.endDate)
    )

    cells.push({
      day,
      dateStr: dStr,
      isCurrentMonth: true,
      isToday: dStr === todayStr,
      isSelected: dStr === selectedDateStr.value,
      events: cellEvents,
    })
  }

  // 3. Next Month leading days (Fill up to 35 or 42 cells)
  const totalCells = cells.length > 35 ? 42 : 35
  const remaining = totalCells - cells.length
  const nextMonthIdx = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  for (let day = 1; day <= remaining; day++) {
    const dStr = toDateString(nextYear, nextMonthIdx, day)
    const cellEvents = events.value.filter(
      (e) => e.date === dStr || (e.endDate && dStr >= e.date && dStr <= e.endDate)
    )

    cells.push({
      day,
      dateStr: dStr,
      isCurrentMonth: false,
      isToday: dStr === todayStr,
      isSelected: dStr === selectedDateStr.value,
      events: cellEvents,
    })
  }

  return cells
})

const selectDate = (cell: CalendarCell) => {
  selectedDateStr.value = cell.dateStr
}

// Events in the active month
const monthEventsCount = computed(() => {
  const currentMonthStr = `${currentYear.value}-${formatPad(currentMonth.value + 1)}`
  return events.value.filter((e) => e.date.startsWith(currentMonthStr)).length
})

// Selected Date Events
const selectedEvents = computed(() => {
  return events.value.filter(
    (e) =>
      e.date === selectedDateStr.value ||
      (e.endDate &&
        selectedDateStr.value >= e.date &&
        selectedDateStr.value <= e.endDate)
  )
})

</script>

<template>
  <Card id="mini-calendar-card" class="border-neutral-800 bg-neutral-900/60 p-5 shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between pb-3.5 border-b border-neutral-800">
      <div class="flex items-center gap-2.5">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <CalendarDays class="h-4 w-4" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-sm font-bold text-neutral-100 tracking-tight">
              {{ currentMonthLabel }}
            </h3>
            <Badge v-if="monthEventsCount > 0" variant="secondary"
              class="text-[10px] py-0 px-1.5 h-4.5 bg-neutral-800 text-emerald-400 font-semibold border-neutral-700">
              {{ monthEventsCount }} Acara
            </Badge>
          </div>
        </div>

      </div>
      <div class="flex items-center justify-between text-[11px] mb-2">
        <RouterLink to="/calendar"
          class="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 hover:underline">
          <span>Buka Kalender</span>
          <ArrowUpRight class="h-3 w-3" />
        </RouterLink>
      </div>

    </div>

    <!-- Mini Calendar Grid -->
    <div class="pt-3">
      <!-- Day Headers -->
      <div class="grid grid-cols-7 mb-1.5 text-center">
        <span v-for="header in dayHeaders" :key="header"
          class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider py-1">
          {{ header }}
        </span>
      </div>

      <!-- Dates Grid -->
      <div class="grid grid-cols-7 gap-1">
        <button v-for="cell in calendarGrid" :key="cell.dateStr" type="button" @click="selectDate(cell)" :class="[
          'relative flex flex-col items-center justify-center h-8 rounded-lg text-xs transition-all duration-150',
          !cell.isCurrentMonth ? 'text-neutral-600 hover:text-neutral-400' : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/60',
          cell.isToday && !cell.isSelected ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold' : '',
          cell.isSelected ? 'bg-emerald-500 text-neutral-950 font-extrabold shadow-md shadow-emerald-500/20' : '',
        ]">
          <span>{{ cell.day }}</span>

          <!-- Event Indicator Dot -->
          <div v-if="cell.events.length > 0" :class="[
            'absolute bottom-1 h-1 w-1 rounded-full',
            cell.isSelected
              ? 'bg-neutral-950'
              : cell.events[0]?.color === 'emerald'
                ? 'bg-emerald-400'
                : cell.events[0]?.color === 'sky'
                  ? 'bg-sky-400'
                  : cell.events[0]?.color === 'amber'
                    ? 'bg-amber-400'
                    : cell.events[0]?.color === 'purple'
                      ? 'bg-purple-400'
                      : 'bg-rose-400'
          ]"></div>
        </button>
      </div>
    </div>

    <!-- Selected Date Preview (Micro Agenda) -->
    <div class="mt-3.5 pt-3 border-t border-neutral-800/80">

      <!-- Events on Selected Date -->
      <div v-if="selectedEvents.length > 0" class="space-y-1.5">
        <div v-for="event in selectedEvents" :key="event.id"
          class="flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-950/70 border border-neutral-800 text-xs">
          <div class="min-w-0 flex-1">
            <p class="font-bold text-neutral-200 truncate">
              {{ event.title }}
            </p>
            <div class="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
              <span class="flex items-center gap-1 shrink-0">
                <Clock class="h-3 w-3 text-emerald-400" />
                {{ event.time.split(' ')[0] }}
              </span>
              <span class="truncate flex items-center gap-1">
                <MapPin class="h-3 w-3 text-neutral-500 shrink-0" />
                {{ event.location.split(',')[0] }}
              </span>
            </div>
          </div>
          <Badge variant="outline" :class="[
            'text-[10px] shrink-0 font-medium px-1.5 py-0 border',
            event.color === 'emerald'
              ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
              : event.color === 'sky'
                ? 'border-sky-500/30 text-sky-400 bg-sky-500/10'
                : event.color === 'amber'
                  ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                  : 'border-purple-500/30 text-purple-400 bg-purple-500/10'
          ]">
            {{ event.category }}
          </Badge>
        </div>
      </div>

      <div v-else class="py-2.5 px-3 rounded-lg bg-neutral-950/40 border border-neutral-800/60 text-center">
        <p class="text-[11px] text-neutral-500">
          Tidak ada acara terjadwal pada tanggal ini.
        </p>
      </div>
    </div>
  </Card>
</template>
