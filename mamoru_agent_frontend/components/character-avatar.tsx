import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CharacterAvatarProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showSparkle?: boolean
  mood?: "normal" | "happy" | "thinking" | "concerned"
}

export function CharacterAvatar({ size = "md", className, showSparkle = true, mood = "normal" }: CharacterAvatarProps) {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
  }

  const moodEmojis = {
    normal: "👨‍⚖️",
    happy: "😊",
    thinking: "🤔",
    concerned: "😟",
  }

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        className={cn("filter drop-shadow-lg inline-block", sizeClasses[size])}
        animate={{ rotate: mood === "thinking" ? [0, -5, 5, 0] : 0 }}
        transition={{
          duration: 2,
          repeat: mood === "thinking" ? Number.POSITIVE_INFINITY : 0,
        }}
      >
        {moodEmojis[mood]}
      </motion.span>
      {showSparkle && (
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1"
        >
          <span className="text-lg">✨</span>
        </motion.div>
      )}
    </motion.div>
  )
}

