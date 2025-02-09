import { motion, AnimatePresence } from "framer-motion"
import { MessageBubble } from "./message-bubble"
import { FOLLOW_UP_MESSAGES } from "../types/messages"
import type { ConsultationType } from "../types/core"
import { MessageStatus } from "./message-status"
import { TypingIndicator } from "./typing-indicator"

interface ChatMessageProps {
  message: {
    id: string
    type: "user" | "agent"
    content: string
    consultationType?: ConsultationType
    status?: "sent" | "delivered" | "read"
  }
  isLatest: boolean
  isTyping?: boolean
}

export function ChatMessage({ message, isLatest, isTyping }: ChatMessageProps) {
  const followUps = message.consultationType ? FOLLOW_UP_MESSAGES[message.consultationType] : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div className="flex items-end gap-2">
        <MessageBubble type={message.type} content={message.content} />
        {message.type === "user" && message.status && <MessageStatus status={message.status} />}
      </div>

      <AnimatePresence>
        {isLatest && message.type === "user" && followUps && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2"
          >
            {isTyping ? (
              <div className="w-16">
                <TypingIndicator />
              </div>
            ) : (
              <MessageBubble type="agent" content={followUps[0].content} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

