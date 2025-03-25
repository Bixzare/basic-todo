"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group bg-black"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:animate-in group-[.toaster]:slide-in-from-top-full group-[.toaster]:data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] group-[.toaster]:data-[swipe=cancel]:translate-x-0 group-[.toaster]:data-[swipe=cancel]:transition-[transform_200ms_ease-out] group-[.toaster]:data-[state=closed]:animate-out group-[.toaster]:data-[state=closed]:slide-out-to-bottom-full group-[.toaster]:data-[swipe=end]:animate-out group-[.toaster]:data-[swipe=end]:slide-out-to-right",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }