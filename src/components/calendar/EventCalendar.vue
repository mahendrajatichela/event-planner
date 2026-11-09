<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-vue-next'
import { initialEvents, type CalendarEvent } from '@/data/mockEvents'

const events = ref<CalendarEvent[]>([...initialEvents])

// Date State
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

// Navigation
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else {
    currentMonth.value -= 1
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value += 1
  } else {
    currentMonth.value += 1
  }
}

const goToToday = () => {
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth()
  selectedDateStr.value = toDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
}

const jumpToEvent = (event: CalendarEvent) => {
  const parts = event.date.split('-').map(Number)
  if (parts.length >= 3 && parts[0] !== undefined && parts[1] !== undefined) {
    currentYear.value = parts[0]
    currentMonth.value = parts[1] - 1
    selectedDateStr.value = event.date
  }
}

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

  // In Indonesia / ISO Monday is day 0 (Mon: 0, Tue: 1 ... Sun: 6)
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

  // 3. Next Month leading days (fill up to 35 or 42 cells)
  const totalCellsNeeded = cells.length <= 35 ? 35 : 42
  const remainingCells = totalCellsNeeded - cells.length
  const nextMonthIdx = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  for (let day = 1; day <= remainingCells; day++) {
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

// Events happening on the selected date
const selectedDateEvents = computed(() => {
  return events.value.filter(
    (e) =>
      e.date === selectedDateStr.value ||
      (e.endDate &&
        selectedDateStr.value >= e.date &&
        selectedDateStr.value <= e.endDate)
  )
})

// Chronologically sorted upcoming events from today onwards
const upcomingEvents = computed(() => {
  const todayStr = toDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  return events.value
    .filter((e) => (e.endDate ? e.endDate >= todayStr : e.date >= todayStr))
    .sort((a, b) => a.date.localeCompare(b.date))
})

// Format readable date
const formatSelectedDateHeader = computed(() => {
  if (!selectedDateStr.value) return ''
  const parts = selectedDateStr.value.split('-').map(Number)
  const y = parts[0] ?? currentYear.value
  const m = parts[1] ?? (currentMonth.value + 1)
  const d = parts[2] ?? 1
  const dateObj = new Date(y, m - 1, d)
  return dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const getDaysUntil = (dateStr: string) => {
  const parts = dateStr.split('-').map(Number)
  const y = parts[0] ?? currentYear.value
  const m = parts[1] ?? (currentMonth.value + 1)
  const d = parts[2] ?? 1
  const target = new Date(y, m - 1, d)
  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Hari ini'
  if (diffDays === 1) return 'Besok'
  return `${diffDays} hari lagi`
}

// Color badges mappings
const colorClasses: Record<string, { pill: string; dot: string; text: string }> = {
  emerald: {
    pill: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25',
    dot: 'bg-emerald-400 shadow-sm shadow-emerald-400',
    text: 'text-emerald-400',
  },
  sky: {
    pill: 'bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500/25',
    dot: 'bg-sky-400 shadow-sm shadow-sky-400',
    text: 'text-sky-400',
  },
  amber: {
    pill: 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25',
    dot: 'bg-amber-400 shadow-sm shadow-amber-400',
    text: 'text-amber-400',
  },
  purple: {
    pill: 'bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25',
    dot: 'bg-purple-400 shadow-sm shadow-purple-400',
    text: 'text-purple-400',
  },
  rose: {
    pill: 'bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25',
    dot: 'bg-rose-400 shadow-sm shadow-rose-400',
    text: 'text-rose-400',
  },
}
</script>

<template>
  <Card id="event-calendar" class="border-neutral-800 bg-neutral-900/60 shadow-xl overflow-hidden">
    <!-- Top Header & Controls -->
    <CardHeader class="p-5 md:p-6 pb-4 border-b border-neutral-800">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Title & Subtitle -->
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CalendarDays class="h-4 w-4" />
            </div>
            <CardTitle class="text-lg font-bold text-neutral-100">
              Kalender Acara & Jadwal
            </CardTitle>
          </div>
          <CardDescription class="text-xs text-neutral-400">
            Jadwal kegiatan terpadu dengan highlight tanggal acara dan timeline mendatang ala Google Calendar.
          </CardDescription>
        </div>

        <!-- Month Navigation Controls -->
        <div class="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            class="h-8 text-xs font-semibold border-neutral-800 text-neutral-300 hover:text-emerald-400 hover:border-neutral-700"
            @click="goToToday"
          >
            Hari Ini
          </Button>

          <div class="flex items-center rounded-lg border border-neutral-800 bg-neutral-950/60 p-0.5">
            <Button
              variant="ghost"
              size="icon"
              class="h-7 w-7 text-neutral-400 hover:text-white"
              title="Bulan Sebelumnya"
              @click="prevMonth"
            >
              <ChevronLeft class="h-4 w-4" />
            </Button>

            <span class="px-3 text-xs font-bold text-neutral-200 min-w-[130px] text-center">
              {{ currentMonthLabel }}
            </span>

            <Button
              variant="ghost"
              size="icon"
              class="h-7 w-7 text-neutral-400 hover:text-white"
              title="Bulan Berikutnya"
              @click="nextMonth"
            >
              <ChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-0">
      <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        <!-- Left: Month Calendar Grid (8 cols) -->
        <div class="lg:col-span-8 p-4 md:p-6 space-y-2">
          <!-- Day of Week Headers -->
          <div class="grid grid-cols-7 gap-1 text-center mb-2">
            <span
              v-for="d in dayHeaders"
              :key="d"
              class="text-[11px] font-bold uppercase tracking-wider text-neutral-500 py-1"
            >
              {{ d }}
            </span>
          </div>

          <!-- Calendar Days Grid -->
          <div class="grid grid-cols-7 gap-1.5">
            <div
              v-for="(cell, idx) in calendarGrid"
              :key="idx"
              class="min-h-[85px] md:min-h-[96px] rounded-xl p-1.5 md:p-2 border transition-all flex flex-col justify-between cursor-pointer group relative"
              :class="[
                cell.isCurrentMonth
                  ? 'bg-neutral-950/50 border-neutral-800/70 hover:border-neutral-700 hover:bg-neutral-900/60'
                  : 'bg-neutral-950/20 border-neutral-900 text-neutral-600 hover:bg-neutral-950/40',
                cell.isSelected ? 'ring-2 ring-emerald-500 border-emerald-500/60 bg-neutral-900/90 shadow-md shadow-emerald-500/10' : '',
              ]"
              @click="selectDate(cell)"
            >
              <!-- Cell Top: Day Number & Today Highlight -->
              <div class="flex items-center justify-between">
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors"
                  :class="[
                    cell.isToday
                      ? 'bg-emerald-500 text-neutral-950 font-extrabold shadow-sm shadow-emerald-500/40'
                      : cell.isSelected
                        ? 'text-emerald-400 font-bold'
                        : cell.isCurrentMonth
                          ? 'text-neutral-300 group-hover:text-white'
                          : 'text-neutral-600',
                  ]"
                >
                  {{ cell.day }}
                </span>

                <!-- Dot indicator for small screens if has event -->
                <div v-if="cell.events.length > 0" class="flex gap-1 md:hidden">
                  <span
                    v-for="ev in cell.events.slice(0, 2)"
                    :key="ev.id"
                    class="h-1.5 w-1.5 rounded-full"
                    :class="colorClasses[ev.color]?.dot || 'bg-emerald-400'"
                  ></span>
                </div>
              </div>

              <!-- Cell Content: Event Chips (Google Calendar Style) -->
              <div class="space-y-1 mt-1 hidden md:block overflow-hidden">
                <div
                  v-for="ev in cell.events.slice(0, 2)"
                  :key="ev.id"
                  class="rounded px-1.5 py-0.5 text-[10px] font-medium truncate transition-all flex items-center gap-1 leading-tight"
                  :class="colorClasses[ev.color]?.pill || 'bg-emerald-500/15 text-emerald-400'"
                  :title="`${ev.title} (${ev.time})`"
                >
                  <span class="h-1 w-1 rounded-full shrink-0" :class="colorClasses[ev.color]?.dot"></span>
                  <span class="truncate">{{ ev.title }}</span>
                </div>

                <span
                  v-if="cell.events.length > 2"
                  class="text-[9px] font-bold text-neutral-500 block pl-1"
                >
                  +{{ cell.events.length - 2 }} lainnya
                </span>
              </div>

              <!-- Subtle Indicator on active day -->
              <div
                v-if="cell.events.length > 0 && cell.events[0]"
                class="absolute bottom-1 right-1.5 hidden md:block"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full block"
                  :class="colorClasses[cell.events[0]?.color || 'emerald']?.dot || 'bg-emerald-400'"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Selected Date Agenda & Upcoming List (4 cols) -->
        <div class="lg:col-span-4 p-4 md:p-6 space-y-6 bg-neutral-950/40">
          <!-- 1. Agenda for Selected Date -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                  Agenda Terpilih
                </span>
                <h4 class="text-sm font-bold text-neutral-100">
                  {{ formatSelectedDateHeader }}
                </h4>
              </div>
              <Badge variant="outline" class="text-[10px] border-neutral-800 text-neutral-400">
                {{ selectedDateEvents.length }} Acara
              </Badge>
            </div>

            <!-- List of events on selected date -->
            <div v-if="selectedDateEvents.length > 0" class="space-y-2.5">
              <div
                v-for="ev in selectedDateEvents"
                :key="ev.id"
                class="rounded-xl border border-neutral-800/80 bg-neutral-900/80 p-3.5 space-y-2 hover:border-neutral-700 transition-all relative overflow-hidden"
              >
                <div
                  class="absolute left-0 top-0 h-full w-1"
                  :class="colorClasses[ev.color]?.dot || 'bg-emerald-500'"
                ></div>

                <div class="flex items-center justify-between gap-2">
                  <Badge variant="default" class="text-[10px] py-0 px-2" :class="colorClasses[ev.color]?.pill">
                    {{ ev.category }}
                  </Badge>
                  <span class="text-[10px] font-semibold text-neutral-400 flex items-center gap-1">
                    <Clock class="h-3 w-3 text-neutral-500" /> {{ ev.time }}
                  </span>
                </div>

                <h5 class="text-sm font-bold text-neutral-100 leading-snug">
                  {{ ev.title }}
                </h5>

                <p v-if="ev.description" class="text-xs text-neutral-400 leading-relaxed">
                  {{ ev.description }}
                </p>

                <div class="flex items-center gap-1 text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/60">
                  <MapPin class="h-3 w-3 text-emerald-400 shrink-0" />
                  <span class="truncate">{{ ev.location }}</span>
                </div>
              </div>
            </div>

            <!-- Empty State for Selected Date -->
            <div
              v-else
              class="rounded-xl border border-dashed border-neutral-800/80 p-6 text-center space-y-2 bg-neutral-950/30"
            >
              <CalendarIcon class="h-8 w-8 text-neutral-600 mx-auto" />
              <p class="text-xs font-semibold text-neutral-400">
                Tidak ada agenda pada tanggal ini.
              </p>
              <p class="text-[11px] text-neutral-500">
                Pilih tanggal bertanda warna di kalender untuk melihat jadwal acara.
              </p>
            </div>
          </div>

          <div class="h-px bg-neutral-800"></div>

          <!-- 2. Upcoming Events List (Acara Mendatang) -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <Sparkles class="h-3.5 w-3.5 text-emerald-400" />
                <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Acara Mendatang
                </h4>
              </div>
              <span class="text-[10px] text-neutral-500">Timeline Lengkap</span>
            </div>

            <div class="space-y-2">
              <div
                v-for="item in upcomingEvents.slice(0, 4)"
                :key="item.id"
                class="group flex items-center justify-between gap-3 p-2.5 rounded-lg border border-neutral-800/60 bg-neutral-900/40 hover:bg-neutral-800/40 hover:border-neutral-700 transition-all cursor-pointer"
                @click="jumpToEvent(item)"
              >
                <div class="flex items-start gap-2.5 min-w-0">
                  <div
                    class="h-2 w-2 rounded-full mt-1.5 shrink-0"
                    :class="colorClasses[item.color]?.dot || 'bg-emerald-400'"
                  ></div>
                  <div class="space-y-0.5 min-w-0">
                    <p class="text-xs font-semibold text-neutral-200 truncate group-hover:text-emerald-400 transition-colors">
                      {{ item.title }}
                    </p>
                    <div class="flex items-center gap-2 text-[10px] text-neutral-500">
                      <span>📅 {{ item.date }}</span>
                      <span>•</span>
                      <span class="truncate">📍 {{ item.location.split(',')[0] }}</span>
                    </div>
                  </div>
                </div>

                <div class="text-right shrink-0">
                  <Badge variant="outline" class="text-[10px] py-0 px-1.5 border-neutral-800 font-mono text-neutral-300">
                    {{ getDaysUntil(item.date) }}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
