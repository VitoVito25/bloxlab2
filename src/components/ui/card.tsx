import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-2xl bg-white text-gray-900 shadow-xl', className)} {...props} />
  )
)
Card.displayName = 'Card'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-8', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

export { Card, CardContent }
