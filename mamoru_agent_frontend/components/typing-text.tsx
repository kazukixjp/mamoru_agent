"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingTextProps {
  text: string
  onComplete?: () => void
  className?: string
}

export function TypingText({ text, onComplete, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (currentIndex >= text.length) {
      onComplete?.()
      return
    }

    // 句読点での一時停止
    if ([".", "。", "、", "！", "？"].includes(text[currentIndex - 1])) {
      setIsPaused(true)
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
      }, 500)
      return () => clearTimeout(pauseTimer)
    }

    if (!isPaused) {
      const timer = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
          // ランダムな遅延を追加して自然なタイピング感を演出
        },
        Math.random() * 50 + 30,
      ) // 30-80ms のランダムな遅延

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, isPaused, onComplete])

  return (
    <div className={className}>
      <span className="whitespace-pre-wrap">{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle"
      />
    </div>
  )
}

