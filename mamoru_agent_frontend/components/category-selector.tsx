import { Button } from "@/components/ui/button"
import type { ConsultationType } from "../types/core"
import { motion } from "framer-motion"

interface CategorySelectorProps {
  onSelect: (category: ConsultationType) => void
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const categories = [
    {
      id: "WAGE_UNPAID",
      label: "給与のお悩み",
      icon: "💰",
      description: "未払い賃金・残業代について",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      id: "OVERTIME",
      label: "働き方の相談",
      icon: "⏰",
      description: "残業・休日出勤について",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "HEALTH_HAZARD",
      label: "健康の不安",
      icon: "🏥",
      description: "職場での健康被害について",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "WRONGFUL_DISMISSAL",
      label: "解雇の相談",
      icon: "📝",
      description: "解雇・雇止めについて",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      id: "SAFETY_MANAGEMENT",
      label: "職場環境",
      icon: "🛡️",
      description: "安全衛生・ハラスメントについて",
      gradient: "from-purple-500 to-violet-500",
    },
  ] as const

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className={`relative w-full h-auto p-6 flex flex-col items-center justify-center space-y-3 overflow-hidden group
              border-2 hover:border-transparent transition-all duration-300`}
            onClick={() => onSelect(category.id)}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${category.gradient}`}
            />

            <motion.span
              className="text-4xl filter drop-shadow-md"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            >
              {category.icon}
            </motion.span>

            <div className="text-center space-y-1">
              <h3 className="font-bold">{category.label}</h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-xs text-muted-foreground"
              >
                相談する →
              </motion.div>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

