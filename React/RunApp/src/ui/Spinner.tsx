import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "circle" | "dots" | "pulse"
  color?: "primary" | "secondary" | "white"
  className?: string
}

export default function Spinner({ 
  size = "md", 
  variant = "circle", 
  color = "primary", 
  className 
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colorClasses = {
    primary: "text-pink-500",
    secondary: "text-black",
    white: "text-white",
  }

  const variants = {
    circle: (
      <div className={cn(
        "border-2 rounded-full animate-spin",
        sizeClasses[size],
        colorClasses[color],
        {
          "border-t-transparent": color !== "white",
          "border-t-gray-800": color === "white",
        },
        className
      )} />
    ),
    dots: (
      <div className={cn("flex space-x-1", sizeClasses[size], className)}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "animate-pulse rounded-full",
              colorClasses[color],
              {
                "w-1 h-1": size === "sm",
                "w-2 h-2": size === "md",
                "w-3 h-3": size === "lg",
              }
            )}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    ),
    pulse: (
      <div className={cn(
        "animate-pulse rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}>
        <div className={cn(
          "h-full w-full rounded-full",
          {
            "bg-pink-500 opacity-75": color === "primary",
            "bg-black opacity-75": color === "secondary",
            "bg-white opacity-75": color === "white",
          }
        )} />
      </div>
    ),
  }

  return (
    <div role="status" aria-label="Loading">
      {variants[variant]}
      <span className="sr-only">Loading...</span>
    </div>
  )
}