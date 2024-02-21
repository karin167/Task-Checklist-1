export type Status =
  | "idle"
  | "pending"
  | "in-progress"
  | "completed"
  | "blocked"

export interface Check {
  id: number
  title: string
  description: string
  status: Status
}
