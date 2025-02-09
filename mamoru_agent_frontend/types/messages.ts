export interface WelcomeMessage {
  title: string
  description: string
  icon: string
}

export interface FollowUpMessage {
  type: "CONFIRMATION" | "ENCOURAGEMENT" | "NEXT_STEPS" | "CLOSING"
  content: string
  tone: "FRIENDLY" | "PROFESSIONAL" | "EMPATHETIC"
}

export const WELCOME_MESSAGES: WelcomeMessage[] = [
  {
    title: "まもる君",
    description: "みなさんの働く権利を守るお手伝いをする、労働相談AIアシスタントです！",
    icon: "👨‍⚖️",
  },
]

export const FOLLOW_UP_MESSAGES: Record<string, FollowUpMessage[]> = {
  WAGE_UNPAID: [
    {
      type: "CONFIRMATION",
      content: "お給料のことで困っているんですね。まもる君が一緒に解決方法を考えていきましょう！",
      tone: "EMPATHETIC",
    },
    {
      type: "NEXT_STEPS",
      content: "未払い賃金の請求には証拠が大切です。給与明細や勤務記録は持っていますか？",
      tone: "FRIENDLY",
    },
  ],
  OVERTIME: [
    {
      type: "CONFIRMATION",
      content: "残業が多くて大変そうですね。まもる君が適切なアドバイスをさせていただきます！",
      tone: "FRIENDLY",
    },
  ],
  // 他の相談タイプに対するフォローアップメッセージ...
}

