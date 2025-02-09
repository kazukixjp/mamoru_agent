export type TaskStatus = "NEEDED" | "NOT_NEEDED" | "PENDING" | "COMPLETED"

export interface Task {
  id: string
  content: string
  status: TaskStatus
  notes?: string
}

export interface TaskProgress {
  total: number
  completed: number
  needed: number
  notNeeded: number
  pending: number
}

