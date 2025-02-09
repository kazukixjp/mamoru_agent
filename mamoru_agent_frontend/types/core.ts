// 基本的なデータ型の定義
export type ConsultationType =
  | "WAGE_UNPAID"
  | "OVERTIME"
  | "HEALTH_HAZARD"
  | "WRONGFUL_DISMISSAL"
  | "PAID_LEAVE"
  | "SAFETY_MANAGEMENT"
  | "DISCRIMINATION"
  | "CHILDCARE_NURSING"
  | "LABOR_CONTRACT"
  | "OTHER"

export interface Consultation {
  id: string
  type: ConsultationType
  description: string
  timestamp: string
  status: "INITIAL" | "IN_PROGRESS" | "ESCALATED" | "RESOLVED"
}

export interface User {
  id: string
  sessionId: string
  consultationHistory: Consultation[]
}

export interface Response {
  type: "FAQ" | "GUIDELINE" | "ESCALATION" | "FOLLOWUP_QUESTION"
  content: string
  relevantLaws?: string[]
  next_actions?: string[]
  disclaimers?: string
}

export type Either<E, A> = Left<E> | Right<A>

interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

