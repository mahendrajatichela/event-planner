<script setup lang="ts">
import { ref } from 'vue'
import { useFeatures } from '@/composables/useFeatures'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Menu,
  Search,
  Plus,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-vue-next'

const { features } = useFeatures()

const props = defineProps<{
  isSidebarCollapsed: boolean
  isMobileSidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
  (e: 'toggleMobileSidebar'): void
}>()

const showNotifications = ref(false)
const showProfileMenu = ref(false)
const searchQuery = ref('')

const notifications = ref([
  {
    id: 1,
    title: 'Konfirmasi RSVP Baru',
    desc: 'Budi Santoso telah mengonfirmasi kehadiran (VIP).',
    time: '5 menit lalu',
    unread: true,
  },
  {
    id: 2,
    title: 'Pembayaran Vendor Disetujui',
    desc: 'Invoice Sound System #INV-204 telah dibayarkan.',
    time: '1 jam lalu',
    unread: true,
  },
  {
    id: 3,
    title: 'Checklist Mendekati Deadline',
    desc: 'Finalisasi layout panggung utama H-3.',
    time: '3 jam lalu',
    unread: false,
  },
])

const toggleNotificationPopover = () => {
  showNotifications.value = !showNotifications.value
  if (showNotifications.value) showProfileMenu.value = false
}

const toggleProfileDropdown = () => {
  showProfileMenu.value = !showProfileMenu.value
  if (showProfileMenu.value) showNotifications.value = false
}
</script>

<template>
  <header id="app-navbar"
    class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-800/80 bg-neutral-950/80 px-4 md:px-6 backdrop-blur-md transition-all">
    <!-- Left: Hamburger / Toggle Button -->
    <div class="flex items-center gap-3">
      <div class="hidden sm:flex items-center gap-2 text-sm text-neutral-400">
        <span class="font-medium text-neutral-200">Event</span>
        <span class="text-neutral-600">/</span>
        <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
          <Sparkles class="h-3.5 w-3.5 text-emerald-400" /> Planner
        </span>
      </div>
    </div>

    <!-- Center: Search Command Bar -->
    <div class="hidden md:flex flex-1 max-w-md mx-6">
      <div class="relative w-full">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input v-model="searchQuery" id="navbar-search-input" type="text"
          placeholder="Cari acara, jadwal, atau tugas... (⌘K)"
          class="w-full h-9 pl-9 pr-12 rounded-lg border border-neutral-800 bg-neutral-900/60 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
        <kbd
          class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rounded border border-neutral-700 bg-neutral-800 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400">
          ⌘K
        </kbd>
      </div>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-2.5">
      <!-- Create New Event Quick CTA -->
      <Button v-if="features.quickActions && features.events" id="btn-create-event"
        class="bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold shadow-md shadow-emerald-500/20 gap-1.5 h-9 px-3.5">
        <Plus class="h-4 w-4 stroke-[2.5]" />
        <span class="hidden sm:inline">Buat Acara</span>
      </Button>

      <!-- Notifications Popover -->
      <div v-if="features.notifications" class="relative">
        <Button id="btn-notifications" variant="outline" size="icon"
          class="relative h-9 w-9 border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:text-emerald-400"
          :class="{ 'border-emerald-500/50 text-emerald-400': showNotifications }" title="Notifikasi"
          @click="toggleNotificationPopover">
          <Bell class="h-4 w-4" />
          <span
            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-extrabold text-neutral-950 border-2 border-neutral-950">
            2
          </span>
        </Button>

        <!-- Notification Panel Card -->
        <div v-if="showNotifications"
          class="absolute right-0 mt-2.5 w-80 rounded-xl border border-neutral-800 bg-neutral-900 p-0 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div class="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900/90">
            <h4 class="text-sm font-bold text-neutral-100">Notifikasi Acara</h4>
            <Badge variant="default" class="text-[11px] py-0 px-2 font-medium">2 Baru</Badge>
          </div>

          <div class="max-h-72 divide-y divide-neutral-800/60 overflow-y-auto">
            <div v-for="item in notifications" :key="item.id"
              class="flex items-start gap-3 p-3.5 hover:bg-neutral-800/50 transition-colors"
              :class="{ 'bg-emerald-950/20': item.unread }">
              <div class="mt-1.5 h-2 w-2 rounded-full shrink-0"
                :class="item.unread ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-neutral-600'"></div>
              <div class="flex-1 space-y-1">
                <p class="text-xs font-semibold text-neutral-200">{{ item.title }}</p>
                <p class="text-[11px] text-neutral-400 leading-tight">{{ item.desc }}</p>
                <span class="text-[10px] text-neutral-500 block">{{ item.time }}</span>
              </div>
            </div>
          </div>

          <div class="border-t border-neutral-800 bg-neutral-950/50 px-3 py-2 text-center">
            <button class="text-xs font-semibold text-emerald-400 hover:underline">
              Tandai semua sudah dibaca
            </button>
          </div>
        </div>
      </div>

      <!-- User Profile Dropdown -->
      <div class="relative">
        <button id="btn-user-profile"
          class="flex items-center gap-2.5 rounded-full border border-neutral-800 bg-neutral-900/60 p-1 pr-3 hover:border-neutral-700 hover:bg-neutral-800/80 transition-all cursor-pointer"
          @click="toggleProfileDropdown">
          <div class="relative">
            <Avatar class="h-7 w-7 border border-emerald-500/40">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Sarah Adelia" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <span class="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-neutral-950"></span>
          </div>

          <div class="hidden sm:flex flex-col text-left">
            <span class="text-xs font-bold text-neutral-200 leading-none">Sarah Adelia</span>
            <span class="text-[10px] text-emerald-400 font-medium">Event Lead</span>
          </div>

          <ChevronDown class="h-3.5 w-3.5 text-neutral-400 hidden sm:block" />
        </button>

        <!-- Profile Panel -->
        <div v-if="showProfileMenu"
          class="absolute right-0 mt-2.5 w-56 rounded-xl border border-neutral-800 bg-neutral-900 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div class="px-2.5 py-2">
            <p class="text-xs font-bold text-neutral-100">Sarah Adelia</p>
            <p class="text-[11px] text-neutral-400 truncate">sarah.adelia@vueevent.id</p>
            <Badge variant="default" class="mt-2 text-[10px] font-bold py-0 px-1.5">PRO PLAN</Badge>
          </div>

          <div class="h-px bg-neutral-800 my-1.5"></div>

          <div class="space-y-0.5">
            <a href="#profil"
              class="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-300 rounded-lg hover:bg-neutral-800 hover:text-emerald-400 transition-colors">
              <User class="h-4 w-4" />
              Profil Saya
            </a>
            <a href="#pengaturan"
              class="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-300 rounded-lg hover:bg-neutral-800 hover:text-emerald-400 transition-colors">
              <Settings class="h-4 w-4" />
              Pengaturan Akun
            </a>
          </div>

          <div class="h-px bg-neutral-800 my-1.5"></div>

          <button
            class="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-red-400 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer">
            <LogOut class="h-4 w-4" />
            Keluar
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
