<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppNavbar from './AppNavbar.vue'
import AppFooter from './AppFooter.vue'

const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}
</script>

<template>
  <div id="app-layout" class="flex min-h-screen w-full bg-neutral-950 text-neutral-100">
    <!-- Backdrop for mobile drawer -->
    <div
      v-if="isMobileSidebarOpen"
      class="fixed inset-0 z-45 bg-neutral-950/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
      @click="closeMobileSidebar"
    ></div>

    <!-- Sidebar -->
    <AppSidebar
      :is-collapsed="isSidebarCollapsed"
      :is-mobile-open="isMobileSidebarOpen"
      @close-mobile="closeMobileSidebar"
      @toggle-collapse="toggleSidebar"
    />

    <!-- Main Wrapper (Navbar + Content + Footer) -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300">
      <!-- Navbar -->
      <AppNavbar
        :is-sidebar-collapsed="isSidebarCollapsed"
        :is-mobile-sidebar-open="isMobileSidebarOpen"
        @toggle-sidebar="toggleSidebar"
        @toggle-mobile-sidebar="toggleMobileSidebar"
      />

      <!-- Content Area with subtle glow gradient -->
      <main
        id="main-content"
        class="flex-1 p-4 md:p-8 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(66,184,131,0.08),rgba(255,255,255,0))]"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade-page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
