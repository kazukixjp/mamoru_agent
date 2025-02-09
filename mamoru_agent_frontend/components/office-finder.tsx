"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, ExternalLink, Building2 } from "lucide-react"
import { PREFECTURE_OFFICES, type LaborOffice } from "../types/office"
import { motion, AnimatePresence } from "framer-motion"

export function OfficeFinder() {
  const [selectedOffice, setSelectedOffice] = useState<LaborOffice | null>(null)

  const handlePrefectureChange = (prefectureId: string) => {
    const office = PREFECTURE_OFFICES.find((p) => p.id === prefectureId)
    setSelectedOffice(office || null)
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />

      <CardHeader className="relative space-y-1">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="p-2 rounded-full bg-blue-500/10">
            <MapPin className="h-5 w-5 text-blue-500" />
          </div>
          <span>お近くの監督署</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">あなたの地域の労働基準監督署をご案内します</p>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-4">
          <div className="space-y-2">
            <Select onValueChange={handlePrefectureChange}>
              <SelectTrigger className="w-full bg-background/60 backdrop-blur-sm">
                <SelectValue placeholder="都道府県を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <div className="max-h-[300px] overflow-y-auto">
                  {PREFECTURE_OFFICES.map((office) => (
                    <SelectItem key={office.id} value={office.id}>
                      {office.name}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence mode="wait">
            {selectedOffice ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg border bg-card/50 backdrop-blur-sm p-4"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-500/10 shrink-0">
                      <Building2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{selectedOffice.name}の監督署</h3>
                      <p className="text-sm text-muted-foreground">各監督署の所在地や連絡先をご確認いただけます</p>
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                      text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href={selectedOffice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>監督署の情報を見る</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 px-4"
              >
                <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-4">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  お住まいの都道府県を選択すると、
                  <br />
                  管轄の労働基準監督署をご案内します
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

