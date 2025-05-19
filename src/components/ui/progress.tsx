
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: "var(--progress-background, var(--primary))"
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-full w-[1px] bg-white/5 mx-1 hidden sm:block" 
           style={{left: "25%"}}/>
      <div className="h-full w-[1px] bg-white/5 mx-1 hidden sm:block" 
           style={{left: "50%"}}/>
      <div className="h-full w-[1px] bg-white/5 mx-1 hidden sm:block" 
           style={{left: "75%"}}/>
    </div>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
