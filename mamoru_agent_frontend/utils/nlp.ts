import type { ConsultationType } from "../types/core"

// 純粋関数: テキスト入力から相談タイプを分類
export const classifyConsultation = (input: string): ConsultationType => {
  const keywords = new Map([
    ["賃金", "WAGE_UNPAID"],
    ["残業", "OVERTIME"],
    ["健康", "HEALTH_HAZARD"],
    ["解雇", "WRONGFUL_DISMISSAL"],
    ["有給", "PAID_LEAVE"],
    ["安全", "SAFETY_MANAGEMENT"],
    ["差別", "DISCRIMINATION"],
    ["育児", "CHILDCARE_NURSING"],
    ["契約", "LABOR_CONTRACT"],
  ])

  for (const [key, value] of keywords) {
    if (input.includes(key)) {
      return value as ConsultationType
    }
  }

  return "OTHER"
}

// 純粋関数: 入力の緊急度を評価
export const evaluateUrgency = (input: string): number => {
  const urgentKeywords = ["死", "事故", "緊急", "重大", "危険"]
  return urgentKeywords.reduce((acc, keyword) => (input.includes(keyword) ? acc + 1 : acc), 0)
}

