"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, MessageCircle } from "lucide-react"
import type { Response } from "../types/core"
import { CharacterAvatar } from "./character-avatar"
import { motion } from "framer-motion"
import { TypingText } from "./typing-text"
import { useState } from "react"
import { LegalReference } from "./legal-reference"
import { ActionItems } from "./action-items"

interface MessageBubbleProps {
  type: "user" | "agent"
  content: string
  response?: Response
  isLoading?: boolean
  isTyping?: boolean
}

export function MessageBubble({ type, content, response, isLoading, isTyping }: MessageBubbleProps) {
  const [isContentComplete, setIsContentComplete] = useState(false)
  const [isResponseVisible, setIsResponseVisible] = useState(false)

  return (
    <div className={cn("flex gap-3 w-full md:max-w-[85%]", type === "user" ? "ml-auto flex-row-reverse" : "")}>
      {type === "agent" ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          <CharacterAvatar size="sm" mood={isTyping ? "thinking" : "normal"} showSparkle={!isTyping} />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: isTyping ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
          />
        </motion.div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <MessageCircle className="h-4 w-4 text-white" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "flex-1 rounded-2xl p-4 shadow-sm space-y-4",
          type === "user" ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white" : "bg-card border",
        )}
      >
        {type === "agent" && isTyping ? (
          <TypingText text={content} onComplete={() => setIsContentComplete(true)} className="leading-relaxed" />
        ) : (
          <div className="leading-relaxed">{content}</div>
        )}

        {response && (isContentComplete || !isTyping) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => setIsResponseVisible(true)}
            className="space-y-4"
          >
            {response.relevantLaws && response.relevantLaws.length > 0 && (
              <LegalReference laws={response.relevantLaws} />
            )}

            {response.next_actions && response.next_actions.length > 0 && (
              <ActionItems actions={response.next_actions} />
            )}

            {response.disclaimers && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
              >
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 shrink-0" />
                  <p>{response.disclaimers}</p>
                </div>
              </motion.div>
            )}

            {response.type === "ESCALATION" && isResponseVisible && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3"
              >
                <div className="p-1.5 rounded-full bg-red-500/10 shrink-0">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <TypingText
                  text="緊急性の高い案件です。直ちに労働基準監督署への相談をお勧めします。"
                  className="text-red-500 font-medium"
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 mt-2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <span className="text-sm">...</span>
            </motion.div>
            <span className="text-sm text-muted-foreground">回答を生成中</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}







// "use client"

// import { cn } from "@/lib/utils"
// import { AlertTriangle, Info, MessageCircle } from "lucide-react"
// import type { Response } from "../types/core"
// import { CharacterAvatar } from "./character-avatar"
// import { motion } from "framer-motion"
// import { TypingText } from "./typing-text"
// import { useState } from "react"
// import { TaskChecklist } from "./task-checklist"

// interface MessageBubbleProps {
//   type: "user" | "agent"
//   content: string
//   response?: Response & { next_actions?: string[] }
//   isLoading?: boolean
//   isTyping?: boolean
// }

// export function MessageBubble({ type, content, response, isLoading, isTyping }: MessageBubbleProps) {
//   const [isContentComplete, setIsContentComplete] = useState(false)
//   const [isResponseVisible, setIsResponseVisible] = useState(false)

//   return (
//     <div className={cn("flex gap-3 w-full md:max-w-[85%]", type === "user" ? "ml-auto flex-row-reverse" : "")}>
//       {type === "agent" ? (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           className="relative"
//         >
//           <CharacterAvatar size="sm" mood={isTyping ? "thinking" : "normal"} showSparkle={!isTyping} />
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: isTyping ? [0.5, 1, 0.5] : 0,
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//             className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
//           />
//         </motion.div>
//       ) : (
//         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//           <MessageCircle className="h-4 w-4 text-white" />
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         className={cn(
//           "flex-1 rounded-2xl p-4 shadow-sm",
//           type === "user" ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white" : "bg-card border",
//         )}
//       >
//         {type === "agent" && isTyping ? (
//           <TypingText text={content} onComplete={() => setIsContentComplete(true)} className="mb-2 leading-relaxed" />
//         ) : (
//           <div className="mb-2 leading-relaxed">{content}</div>
//         )}

//         {response && (isContentComplete || !isTyping) && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             transition={{ duration: 0.3 }}
//             onAnimationComplete={() => setIsResponseVisible(true)}
//             className="mt-4 space-y-4 text-sm"
//           >
//             {response.next_actions && <TaskChecklist tasks={response.next_actions} />}

//             {response.relevantLaws && (
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-full bg-blue-500/10 shrink-0">
//                   <Info className="h-4 w-4 text-blue-500" />
//                 </div>
//                 <div>
//                   <div className="font-medium mb-2">関連法令</div>
//                   {isTyping ? (
//                     <TypingText text={response.relevantLaws.join("\n")} className="space-y-1 text-muted-foreground" />
//                   ) : (
//                     <ul className="space-y-1 text-muted-foreground">
//                       {response.relevantLaws.map((law, i) => (
//                         <li key={i} className="flex items-center gap-2">
//                           <span className="w-1 h-1 rounded-full bg-blue-500" />
//                           {law}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             )}

//             {response.type === "ESCALATION" && isResponseVisible && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3"
//               >
//                 <div className="p-1.5 rounded-full bg-red-500/10 shrink-0">
//                   <AlertTriangle className="h-4 w-4 text-red-500" />
//                 </div>
//                 <TypingText
//                   text="緊急性の高い案件です。直ちに労働基準監督署への相談をお勧めします。"
//                   className="text-red-500 font-medium"
//                 />
//               </motion.div>
//             )}
//           </motion.div>
//         )}

//         {isLoading && (
//           <div className="flex items-center gap-2 mt-2">
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 1, 0.5],
//               }}
//               transition={{
//                 duration: 1,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             >
//               <span className="text-sm">...</span>
//             </motion.div>
//             <span className="text-sm text-muted-foreground">回答を生成中</span>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   )
// }

