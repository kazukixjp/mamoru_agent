"use client"

import { Scale, Phone } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { HotlineDialog } from "./hotline-dialog"

export function Header() {
  const [showHotline, setShowHotline] = useState(false)
  const [isWaving, setIsWaving] = useState(false)

  // More human-like idle animation sequence
  const idleAnimation = {
    y: [0, -3, 0],
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  }

  // Friendly wave animation sequence
  const waveAnimation = {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  }

  return (
    <header className="border-b bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative cursor-pointer"
              animate={isWaving ? waveAnimation : idleAnimation}
              onHoverStart={() => setIsWaving(true)}
              onHoverEnd={() => setIsWaving(false)}
              onClick={() => setIsWaving(true)}
              onAnimationComplete={() => setIsWaving(false)}
            >
              <span className="text-4xl filter drop-shadow-md inline-block">👨‍⚖️</span>
              <motion.div
                initial={{ scale: 0 }}
                animate={
                  isWaving
                    ? {
                        scale: [0, 1, 0],
                        transition: { duration: 0.5, times: [0, 0.5, 1] },
                      }
                    : {}
                }
                className="absolute -top-2 -right-2 text-xl"
              >
                ✨
              </motion.div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">まもる君</h1>
              <p className="text-sm text-blue-100">労働に関するお悩み相談AI AGENT</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Scale className="h-5 w-5" />
            <span className="text-sm hidden sm:inline">労働基準法に基づく相談対応</span>
            <button
              onClick={() => setShowHotline(true)}
              className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">緊急ホットライン</span>
              <span className="sm:hidden">緊急</span>
            </button>
          </div>
        </div>
      </div>

      <HotlineDialog open={showHotline} onOpenChange={setShowHotline} />
    </header>
  )
}

