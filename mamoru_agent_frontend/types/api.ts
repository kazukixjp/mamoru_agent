export interface ApiResponse {
  official_comment: string
  cited_law_articles: string[]
  disclaimers: string
  next_actions: string[]
}

export interface ApiError {
  message: string
  code?: string
}

