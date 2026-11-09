import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-emerald-500/30 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25',
        secondary:
          'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700',
        destructive:
          'border-red-500/30 bg-red-500/15 text-red-400 hover:bg-red-500/25',
        outline: 'text-neutral-300 border-neutral-700',
        warning:
          'border-amber-500/30 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25',
        info:
          'border-sky-500/30 bg-sky-500/15 text-sky-400 hover:bg-sky-500/25',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
