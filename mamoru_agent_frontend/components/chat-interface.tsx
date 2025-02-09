"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Smile, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CategorySelector } from "./category-selector"
import type { ConsultationType, Response } from "../types/core"
import { Header } from "./header"
import { OfficeFinder } from "./office-finder"
import { WelcomeScreen } from "./welcome-screen"
import { ChatMessage } from "./chat-message"
import { SmartSuggest } from "./smart-suggest"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { AutoResizeTextarea } from "./auto-resize-textarea"
import { askQuestion } from "../services/api"

interface Message {
  id: string
  type: "user" | "agent"
  content: string
  response?: Response
  consultationType?: ConsultationType
  status?: "sent" | "delivered" | "read"
}

const SMART_SUGGESTIONS = {
  WAGE_UNPAID: ["残業代の計算方法を知りたい", "未払い賃金の請求手続きについて", "給与明細の確認ポイント"],
  OVERTIME: ["残業時間の上限について", "休日出勤の扱いについて", "長時間労働の改善方法"],
  // 他のカテゴリーのサジェスト...
}

export default function ChatInterface() {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [showOfficeFinder, setShowOfficeFinder] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
    setShowScrollButton(!isNearBottom)
  }

  useEffect(() => {
    if (!isLoading && !isTyping) {
      scrollToBottom()
    }
  }, [isLoading, isTyping, scrollToBottom]) // Added scrollToBottom to dependencies

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const consultationType = analyzeConsultationType(input)
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      consultationType,
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsLoading(true)
    setIsTyping(true)

    // Update message status to delivered
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg)),
      )
    }, 1000)

    try {
      // Call the API service
      const apiResponse = await askQuestion(input)

      // Create agent message with API response
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: apiResponse.official_comment,
        response: {
          type: "FAQ",
          content: apiResponse.official_comment,
          relevantLaws: apiResponse.cited_law_articles,
          next_actions: apiResponse.next_actions,
          disclaimers: apiResponse.disclaimers,
        },
      }

      setIsLoading(false)
      setMessages((prev) => [...prev, agentMessage])

      // Update original message status to read
      setTimeout(
        () => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" as const } : msg)),
          )
          setIsTyping(false)
        },
        apiResponse.official_comment.length * 80 + 1000,
      )
    } catch (error) {
      console.error("Error in chat:", error)
      setIsLoading(false)
      setIsTyping(false)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "申し訳ありません。エラーが発生しました。しばらく経ってからもう一度お試しください。",
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleCategorySelect = (category: ConsultationType) => {
    const categoryMessages = {
      WAGE_UNPAID: "給与に関して相談があります。残業代が支払われていないのですが、どうしたらよいでしょうか？",
      OVERTIME: "残業が多くて体調が悪くなってきました。どのような対策がありますか？",
      HEALTH_HAZARD: "職場の安全対策に不安があります。改善をお願いしたいのですが。",
      WRONGFUL_DISMISSAL: "突然解雇を言い渡されました。これは法的に問題ないのでしょうか？",
      SAFETY_MANAGEMENT: "職場でハラスメントを受けています。どこに相談すればよいですか？",
    }

    setInput(categoryMessages[category] || "")
  }

  const handleSuggestionSelect = (suggestion: string) => {
    setInput(suggestion)
  }

  const lastMessage = messages[messages.length - 1]
  const currentSuggestions = lastMessage?.consultationType ? SMART_SUGGESTIONS[lastMessage.consultationType] : []

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setShowOfficeFinder(!showOfficeFinder)}
          >
            {showOfficeFinder ? "チャットに戻る" : "監督署を探す"}
          </Button>
        </div>
      </Header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className={`space-y-6 ${showOfficeFinder ? "hidden md:block" : "block"}`}>
            <Card className="mb-6">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">どのようなお悩みでしょうか？</h2>
                <CategorySelector onSelect={handleCategorySelect} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="space-y-4 mb-4 h-[350px] md:h-[400px] overflow-y-auto scroll-smooth"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isLatest={index === messages.length - 1}
                        isTyping={isTyping && index === messages.length - 1}
                      />
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                <AnimatePresence>
                  {showScrollButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-24 right-8"
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={scrollToBottom}
                        className="rounded-full shadow-lg"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  onSubmit={handleSubmit}
                  className="relative sticky bottom-0 bg-background/80 backdrop-blur-sm pt-4"
                >
                  <div className="flex items-start gap-2">
                    <Button type="button" variant="ghost" size="icon" className="shrink-0">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <AutoResizeTextarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="気軽にお話しください..."
                      className="flex-1 min-h-[44px] resize-none py-3 px-4"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          if (input.trim()) {
                            handleSubmit(e)
                          }
                        }
                      }}
                    />
                    <motion.div
                      animate={
                        input.trim()
                          ? {
                              scale: [1, 1.02, 1],
                              transition: {
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              },
                            }
                          : {}
                      }
                    >
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={cn(
                          "relative overflow-hidden transition-all duration-300",
                          input.trim()
                            ? "w-28 md:w-32 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl"
                            : "w-20 md:w-24",
                        )}
                      >
                        {isLoading ? (
                          <div className="animate-pulse">...</div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Send className="h-4 w-4" />
                            <span
                              className={cn(
                                "transition-opacity duration-200",
                                input.trim() ? "opacity-100" : "opacity-0 md:opacity-100",
                              )}
                            >
                              送信
                            </span>
                          </div>
                        )}
                        {input.trim() && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white to-transparent"
                            initial={{ x: "-100%", opacity: 0.5 }}
                            animate={{ x: "100%", opacity: 0 }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                              repeatDelay: 1,
                            }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  {currentSuggestions.length > 0 && !input && (
                    <SmartSuggest suggestions={currentSuggestions} onSelect={handleSuggestionSelect} />
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className={`space-y-6 ${showOfficeFinder ? "block md:block" : "hidden md:block"}`}>
            <OfficeFinder />
          </div>
        </div>
      </main>
    </div>
  )
}

const analyzeConsultationType = (input: string): ConsultationType | undefined => {
  // Implement your logic to analyze the input and return the appropriate ConsultationType
  // For now, return undefined as a placeholder
  return undefined
}

