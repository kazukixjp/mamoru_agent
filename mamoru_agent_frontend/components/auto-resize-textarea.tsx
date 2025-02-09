"use client"

import { useEffect, useRef, useCallback } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useDebouncedCallback } from "use-debounce"

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onHeightChange?: (height: number) => void
}

export function AutoResizeTextarea({ value, className, onHeightChange, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Store the current scroll position
    const scrollPos = window.scrollY

    // Reset height temporarily to get the correct scrollHeight
    textarea.style.height = "auto"

    // Calculate required height
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, 44), // minimum 44px
      window.innerHeight * 0.4, // maximum 40vh
    )

    // Set new height
    textarea.style.height = `${newHeight}px`

    // Restore scroll position
    window.scrollTo(0, scrollPos)

    // Notify parent of height change
    onHeightChange?.(newHeight)
  }, [onHeightChange])

  // Debounce the adjustment to prevent rapid firing
  const debouncedAdjustHeight = useDebouncedCallback(adjustHeight, 10)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Create ResizeObserver with error handling
    const resizeObserver = new ResizeObserver((entries) => {
      try {
        if (entries[0]) {
          debouncedAdjustHeight()
        }
      } catch (error) {
        console.error("ResizeObserver error:", error)
      }
    })

    // Start observing with error handling
    try {
      resizeObserver.observe(textarea)
    } catch (error) {
      console.error("Failed to observe textarea:", error)
    }

    // Initial adjustment
    debouncedAdjustHeight()

    // Cleanup
    return () => {
      debouncedAdjustHeight.cancel()
      try {
        resizeObserver.disconnect()
      } catch (error) {
        console.error("Failed to disconnect ResizeObserver:", error)
      }
    }
  }, [debouncedAdjustHeight])

  // Adjust height when value changes
  useEffect(() => {
    debouncedAdjustHeight()
  }, [debouncedAdjustHeight])

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      className={cn("transition-height duration-200 ease-out overflow-hidden", className)}
      {...props}
    />
  )
}

