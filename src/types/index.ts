export type Status =
  | "idle"
  | "pending"
  | "in-progress"
  | "completed"
  | "blocked"

export interface Step {
  id?: number
  title: string
  description: string
  status: Status | string
}
