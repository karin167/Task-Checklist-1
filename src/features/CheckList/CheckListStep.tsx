import React from "react"
import type { Step } from "../../types"
import StatusIndicator from "./StatusIndicator"
import { Icons } from "../../icons"
import { ThemeContext } from "../../App"
import { useContext } from "react"
import clsx from "clsx"

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
  const { theme } = useContext(ThemeContext)

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
        <div className={clsx("px-2", theme === "dark" && "text-white")}>
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
          <Icons.Edit
            viewBox={theme === "light" ? "#fff" : "#000"}
            stroke={theme === "light" ? "#000" : "#fff"}
          />
        </button>

        <button className="btn btn-outline p-1" onClick={() => onDelete(id)}>
          <Icons.Bin
            viewBox={theme === "light" ? "#fff" : "#000"}
            stroke={theme === "light" ? "#000" : "#fff"}
          />
        </button>
      </div>
    </div>
  )
}

export default CheckListStep
