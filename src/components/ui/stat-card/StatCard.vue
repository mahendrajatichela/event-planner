<script setup lang="ts">
import type { Component } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge, type BadgeVariants } from '@/components/ui/badge'

export interface StatCardProps {
  title: string
  value: string | number
  badgeText?: string
  badgeVariant?: BadgeVariants['variant']
  description?: string
  icon?: Component
  iconVariant?: 'emerald' | 'amber' | 'sky' | 'purple' | 'red' | 'default'
}

withDefaults(defineProps<StatCardProps>(), {
  badgeVariant: 'default',
  iconVariant: 'emerald',
})

const iconVariantClasses: Record<NonNullable<StatCardProps['iconVariant']>, string> = {
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-400',
  default: 'bg-neutral-800 border-neutral-700 text-neutral-300',
}
</script>

<template>
  <Card
    class="border-neutral-800/80 bg-neutral-900/50 hover:border-neutral-700/80 hover:bg-neutral-900/80 transition-all group"
  >
    <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
      <CardTitle class="text-xs font-bold uppercase tracking-wider text-neutral-400">
        {{ title }}
      </CardTitle>

      <div
        v-if="icon || $slots.icon"
        class="flex h-9 w-9 items-center justify-center rounded-lg border transition-transform group-hover:scale-110"
        :class="iconVariantClasses[iconVariant]"
      >
        <slot name="icon">
          <component :is="icon" class="h-4 w-4" />
        </slot>
      </div>
    </CardHeader>

    <CardContent class="p-5 pt-0">
      <div class="flex items-baseline justify-between gap-2">
        <span class="text-2xl font-extrabold text-neutral-100">
          <slot name="value">{{ value }}</slot>
        </span>

        <slot name="badge">
          <Badge
            v-if="badgeText"
            :variant="badgeVariant"
            class="text-[11px] font-bold"
          >
            {{ badgeText }}
          </Badge>
        </slot>
      </div>

      <p
        v-if="description || $slots.description"
        class="text-xs text-neutral-500 mt-2 border-t border-neutral-800/80 pt-2"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </CardContent>
  </Card>
</template>
