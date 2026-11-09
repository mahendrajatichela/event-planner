import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-emerald-500 text-neutral-950 shadow hover:bg-emerald-400 hover:shadow-emerald-500/25 active:scale-[0.98]',
        destructive:
          'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
        outline:
          'border border-neutral-800 bg-neutral-900/60 text-neutral-200 hover:bg-neutral-800 hover:text-emerald-400 hover:border-neutral-700',
        secondary:
          'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:text-white',
        ghost:
          'text-neutral-300 hover:bg-neutral-800 hover:text-emerald-400',
        link: 'text-emerald-400 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
