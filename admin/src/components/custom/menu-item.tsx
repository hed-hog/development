import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { useState } from 'react'
import { ButtonProps } from '@/components/ui/button'

type MenuItemProps = ButtonProps & {
  icon?: React.ReactNode
  label: string
}

const buttonVariants = cva(
  'flex cursor-pointer items-center px-4 py-4 text-base transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'text-primary shadow hover:text-primary/90',
        destructive: 'text-destructive shadow-sm hover:text-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'text-secondary shadow-sm hover:text-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
)

export default function MenuItem(
  { icon, label, variant, size, className, ...props }: MenuItemProps = {
    label: 'Menu Item',
  }
) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      className={`${cn(buttonVariants({ variant, size, className }))} ${
        isPressed ? 'bg-primary/10' : 'bg-background'
      }`}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      {...props}
    >
      {icon && <span className='mr-1'>{icon}</span>}
      <span className='font-medium'>{label}</span>
    </button>
  )
}
