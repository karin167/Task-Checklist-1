import React from "react"
import type { Step } from "../../types"
import StatusIndicator from "./StatusIndicator"
import { Icons } from "../../icons"

interface CheckListStepProps extends Step {
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}
function CheckListStep({
  title,
  description,
  status,
  id,
  onDelete,
  onEdit,
}: CheckListStepProps) {
  const iconSvg = {
    blocked: <Icons.Blocked />,
    completed: <Icons.Done />,
    "in-progress": <Icons.Pending />,

    idle: <Icons.Idle />,
  }
  return (
    <div className="my-2 d-flex flex-row align-items-center justify-content-between ">
      <div className="d-flex flex-row align-items-center">
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
      <div className="d-flex flex-row align-items-center ">
        <button className="btn btn-outline p-1" onClick={() => onEdit(id)}>
          <Icons.Edit />
        </button>

        <button className="btn btn-outline p-1" onClick={() => onDelete(id)}>
          <Icons.Bin />
        </button>
      </div>
    </div>
  )
}

export default CheckListStep
