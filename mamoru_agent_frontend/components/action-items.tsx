"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, X } from "lucide-react"
import { useState } from "react"

interface ActionItem {
  id: string
  content: string
  status: "pending" | "completed" | "skipped"
}

interface ActionItemsProps {
  actions: string[]
}

export function ActionItems({ actions }: ActionItemsProps) {
  const [items, setItems] = useState<ActionItem[]>(
    actions.map((action) => ({
      id: Math.random().toString(36).substr(2, 9),
      content: action,
      status: "pending",
    })),
  )

  const handleStatusChange = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const nextStatus = {
          pending: "completed",
          completed: "skipped",
          skipped: "pending",
        } as const
        return { ...item, status: nextStatus[item.status] }
      }),
    )
  }

  const getStatusIcon = (status: ActionItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "skipped":
        return <X className="h-5 w-5 text-gray-400" />
      default:
        return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card/50 p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span className="font-medium">次のステップ</span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <button
              onClick={() => handleStatusChange(item.id)}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="shrink-0 mt-0.5">
                {getStatusIcon(item.status)}
              </motion.div>
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    item.status === "completed"
                      ? "line-through text-muted-foreground"
                      : item.status === "skipped"
                        ? "text-muted-foreground"
                        : ""
                  }`}
                >
                  {item.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.status === "completed"
                    ? "完了済み"
                    : item.status === "skipped"
                      ? "対応不要"
                      : "クリックして状態を変更"}
                </p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

