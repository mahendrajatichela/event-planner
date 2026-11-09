<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot, type AvatarRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<
  AvatarRootProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <AvatarRoot
    v-bind="props"
    :class="
      cn(
        'relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-emerald-500/30',
        props.class
      )
    "
  >
    <slot />
  </AvatarRoot>
</template>
