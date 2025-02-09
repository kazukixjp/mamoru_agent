export interface Response {
  type: "FAQ" | "GUIDELINE" | "ESCALATION" | "FOLLOWUP_QUESTION"
  content: string
  nextSteps?: string[]
  relevantLaws?: string[]
}

