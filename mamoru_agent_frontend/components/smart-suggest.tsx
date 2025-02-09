import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface SmartSuggestProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export function SmartSuggest({ suggestions, onSelect }: SmartSuggestProps) {
  if (!suggestions.length) return null

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((suggestion, i) => (
        <motion.div
          key={suggestion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Button variant="secondary" size="sm" onClick={() => onSelect(suggestion)} className="text-sm">
            {suggestion}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}

