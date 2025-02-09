import { Check, CheckCheck } from "lucide-react"
import { motion } from "framer-motion"

interface MessageStatusProps {
  status: "sent" | "delivered" | "read"
}

export function MessageStatus({ status }: MessageStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1 text-xs text-muted-foreground"
    >
      {status === "sent" && <Check className="h-3 w-3" />}
      {status === "delivered" && <CheckCheck className="h-3 w-3" />}
      {status === "read" && <CheckCheck className="h-3 w-3 text-primary" />}
      <span className="sr-only">
        メッセージは{status === "sent" ? "送信済み" : status === "delivered" ? "配信済み" : "既読"}です
      </span>
    </motion.div>
  )
}

