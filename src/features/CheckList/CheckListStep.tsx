import React from "react"
import type { Check } from "../../types"
import StatusIndicator from "./StatusIndicator"
import { Icons } from "../../icons"

interface CheckListStepProps extends Check {}
function CheckListStep({ title, description, status }: CheckListStepProps) {
  const iconSvg = {
    blocked: <Icons.Blocked />,
    completed: <Icons.Done />,
    "in-progress": <Icons.Pending />,

    idle: <Icons.Idle />,
  }
  return (
    <div className="my-2 d-flex flex-row align-items-center">
      {iconSvg[status]}
      <div className="px-2">
        <div> {title}</div>

        <div className="d-flex flex-row align-items-center ">
          <div>
            <StatusIndicator status={status} />
          </div>
          <div className="mx-2"> {description} </div>
        </div>
      </div>
    </div>
  )
}

export default CheckListStep
