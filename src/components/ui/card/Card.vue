<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm text-neutral-100 shadow-sm transition-all duration-200',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
