"use client"

import { motion } from "framer-motion"
import { Scale, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface LegalReferenceProps {
  laws: string[]
}

export function LegalReference({ laws }: LegalReferenceProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card/50 p-4 space-y-3"
    >
      <Button variant="ghost" className="w-full justify-between" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-blue-500" />
          <span className="font-medium">関連する法令</span>
        </div>
        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <div className="space-y-2 pt-2">
          {laws.map((law, index) => (
            <motion.div
              key={law}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm"
            >
              <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <span className="text-blue-500 text-xs">{index + 1}</span>
              </div>
              <p className="text-muted-foreground">{law}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

