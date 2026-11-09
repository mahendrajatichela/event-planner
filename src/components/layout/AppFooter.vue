<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="app-footer"
    class="border-t border-neutral-800/80 bg-neutral-950 px-4 md:px-6 py-3.5 text-xs text-neutral-400 mt-auto transition-colors">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <!-- Left: Brand & Copyright -->
      <div class="flex items-center gap-2 flex-wrap text-center sm:text-left">
        <span class="font-bold text-neutral-200 flex items-center gap-1.5">
          <span class="text-emerald-400 text-[10px]">▲</span> Event Planner
        </span>
        <span class="text-neutral-700 hidden sm:inline">•</span>
        <span class="text-neutral-400">
          © {{ currentYear }} Hak Cipta Dilindungi. Platform Event Organizer & Perencanaan Acara.
        </span>
      </div>

      <!-- Center / Right: System Status & Links -->
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <!-- Status Indicator -->
        <div
          class="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-300">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Sistem Operasional</span>
        </div>

        <!-- Links -->
        <a href="#panduan" class="hover:text-emerald-400 transition-colors">Panduan</a>
        <a href="#vendor" class="hover:text-emerald-400 transition-colors">Portal Vendor</a>
        <a href="#bantuan" class="hover:text-emerald-400 transition-colors">Bantuan</a>

        <Badge variant="outline" class="font-mono text-[10px] py-0 px-1.5 text-emerald-400 border-neutral-800">
          v1.2.0
        </Badge>
      </div>
    </div>
  </footer>
</template>
