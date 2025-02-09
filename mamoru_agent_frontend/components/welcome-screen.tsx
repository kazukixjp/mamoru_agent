"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scale, Shield, Heart, BookOpen } from "lucide-react"

const CHARACTER_FEATURES = [
  {
    icon: Shield,
    text: "労働者の味方",
    description: "労働法に基づいて適切なアドバイスを提供します",
  },
  {
    icon: Heart,
    text: "親身な相談",
    description: "あなたの状況に寄り添ったサポートを心がけます",
  },
  {
    icon: BookOpen,
    text: "わかりやすい説明",
    description: "専門用語をできるだけ避けて解説します",
  },
  {
    icon: Scale,
    text: "公平な判断",
    description: "中立的な立場でアドバイスを提供します",
  },
]

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background flex items-center justify-center">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[1fr,1.5fr]">
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                  animate={
                    isHovered
                      ? {
                          y: [0, -10, 0],
                          rotate: [0, -5, 5, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="relative z-10"
                >
                  <span className="text-8xl filter drop-shadow-lg cursor-pointer inline-block">👨‍⚖️</span>
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
                    className="absolute top-0 right-0"
                  >
                    <span className="text-2xl">✨</span>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <h1 className="text-4xl font-bold mb-2">まもる君</h1>
                  <p className="text-blue-100">労働に関するお悩み相談AI AGENT</p>
                </motion.div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600/50 to-transparent" />
              </div>

              <div className="p-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">働く人の権利を守るために</h2>
                  <p className="text-muted-foreground">
                    労働法や各種制度について、わかりやすくアドバイスさせていただきます。
                    一緒に解決策を見つけていきましょう！
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {CHARACTER_FEATURES.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <feature.icon className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">{feature.text}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      onClick={onStart}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                        text-white text-lg h-auto py-4 relative group overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white to-transparent"
                        initial={{ x: "-100%", opacity: 0.5 }}
                        animate={{
                          x: "100%",
                          opacity: 0,
                          transition: {
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            repeatDelay: 1,
                          },
                        }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        まもる君に相談する
                        <motion.span
                          animate={{
                            x: [0, 3, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          👉
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    ※ご相談内容は匿名で安全に処理されます
                  </p>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

