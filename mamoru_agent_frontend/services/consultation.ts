import type { Either } from "../types/core"
import * as NLP from "../utils/nlp"
import type { ConsultationType, Response } from "../types/consultation" // Import ConsultationType

// 純粋関数: 相談内容の分析と応答生成
export const analyzeAndRespond = (input: string): Either<Error, Response> => {
  try {
    const consultationType = NLP.classifyConsultation(input)
    const urgencyLevel = NLP.evaluateUrgency(input)

    if (urgencyLevel >= 2) {
      return {
        _tag: "Right",
        right: {
          type: "ESCALATION",
          content: "緊急性が高い案件と判断されました。直ちに労働基準監督署への相談をお勧めします。",
          nextSteps: ["最寄りの労働基準監督署に連絡する", "関連する証拠や資料を準備する"],
          relevantLaws: ["労働安全衛生法", "労働基準法"],
        },
      }
    }

    return {
      _tag: "Right",
      right: generateResponse(consultationType),
    }
  } catch (error) {
    return {
      _tag: "Left",
      left: new Error("相談内容の分析に失敗しました"),
    }
  }
}

// 純粋関数: 相談タイプに基づく応答生成
const generateResponse = (type: ConsultationType): Response => {
  const responses = new Map([
    [
      "WAGE_UNPAID",
      {
        type: "FAQ",
        content: "未払い賃金に関する相談について、以下の情報を確認させていただきます。",
        nextSteps: ["労働時間の記録を確認", "給与明細の保管", "事業主との話し合い"],
        relevantLaws: ["労働基準法第24条", "最低賃金法"],
      },
    ],
    // 他の相談タイプに対する応答もここに追加
  ])

  return (
    responses.get(type) || {
      type: "FOLLOWUP_QUESTION",
      content: "より詳しい状況を教えていただけますか？",
    }
  )
}

