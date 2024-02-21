import React from "react"
import { Status } from "../../types"

type StatusIndicatorProps = {
  status: Status
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  const colors: { [key: string]: string } = {
    blocked: "red",
    completed: "green",
    "in-progress": "#FFBE3F",
    idle: "gray",
  }
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors[status],
      }}
    />
  )
}

export default StatusIndicator
