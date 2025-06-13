import { cn } from '@/lib/utils'

const CONTAINER_SIZES = {
  '3xs': 'max-w-3xs', // 16rem (256px)
  '2xs': 'max-w-2xs', // 18rem (288px)
  'xs': 'max-w-xs',   // 20rem (320px)
  'sm': 'max-w-sm',   // 24rem (384px)
  'md': 'max-w-md',   // 28rem (448px)
  'lg': 'max-w-lg',   // 32rem (512px)
  'xl': 'max-w-xl',   // 36rem (576px)
  '2xl': 'max-w-2xl', // 42rem (672px)
  '3xl': 'max-w-3xl', // 48rem (768px)
  '4xl': 'max-w-4xl', // 56rem (896px)
  '5xl': 'max-w-5xl', // 64rem (1024px)
  '6xl': 'max-w-6xl', // 72rem (1152px)
  '7xl': 'max-w-7xl', // 80rem (1280px)
  'full': 'max-w-full',
  'none': ''
}

export function Container({ 
  children, 
  size = '7xl', 
  className = '',
  as: Component = 'div'
}) {
  return (
    <Component 
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        CONTAINER_SIZES[size] || CONTAINER_SIZES['7xl'],
        className
      )}
    >
      {children}
    </Component>
  )
} 