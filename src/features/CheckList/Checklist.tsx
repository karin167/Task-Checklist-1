import Accordion from "react-bootstrap/Accordion"
import CheckListStep from "./CheckListStep"
import { Icons } from "../../icons"
import AddItemModal from "./AddItemModal"
import { useContext, useEffect, useState } from "react"
import type { Step } from "../../types"
import { ThemeContext } from "../../App"
import clsx from "clsx"

const data = {
  checkList: [
    {
      id: 1,
      title: "Light Bulb 150S",
      steps: [
        {
          id: 1,
          title: "Step item 1",
          description: "Not started",
          status: "idle",
        },

        {
          id: 2,
          title: "Electrical connection, general, 3-pin. Electrical",
          description: "Blocked :Part installation done",
          status: "blocked",
        },

        {
          id: 3,
          title: "Step item 3",
          description: "Final installation done",
          status: "completed",
        },

        {
          id: 4,
          title: "L3.1 LED surface-mounted wall light Architech",
          description: "L3.1 LED surface-mounted wall light",
          status: "in-progress",
        },
      ],
    },
  ],
}

function Checklist() {
  const [showModal, setShowModal] = useState(false)
  const currentCheckListId = 1

  const { theme } = useContext(ThemeContext)

  console.log({ theme })
  const [step, setStep] = useState<Step>()

  const currentItem = data.checkList.find(
    item => item.id === currentCheckListId,
  )

  const [steps, setSteps] = useState(currentItem?.steps || [])

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  const handleAddItem = (values: Step) => {
    console.log(values)
    const isExist = steps.some(_step => _step?.id === values?.id)
    let updatedSteps = [...steps]
    if (isExist) {
      const stepIndex = steps.findIndex(step => step.id === values.id)

      if (stepIndex !== -1) {
        updatedSteps[stepIndex] = values
      }
    } else {
      const id = steps.length + 1
      const newStep = { ...values, id }

      updatedSteps = [newStep, ...steps]
    }

    const cachedListItem = { ...currentItem, steps: updatedSteps }

    // Save checklist to local storage
    localStorage.setItem(
      String(currentCheckListId),
      JSON.stringify(cachedListItem),
    )

    setSteps(updatedSteps)
    handleHideModal()
  }

  const handleDelete = (id: number) => {
    const updatedSteps = steps.filter(step => step.id !== id)

    const cachedListItem = { ...currentItem, steps: updatedSteps }

    // Save checklist to local storage
    localStorage.setItem(
      String(currentCheckListId),
      JSON.stringify(cachedListItem),
    )

    setSteps(updatedSteps)
  }
  const handleEdit = (id: number) => {
    const stepToEdit = steps.find(step => step.id === id)

    console.log({ stepToEdit })

    if (stepToEdit) {
      setStep(stepToEdit)
      handleShowModal()
    }
  }

  useEffect(() => {
    const cachedItem = localStorage.getItem(currentCheckListId.toString())

    if (cachedItem) {
      const currentItem = JSON.parse(cachedItem)

      setSteps(currentItem.steps)
    }
  }, [])
  return (
    <div className="w-25 p-4">
      <div className={clsx("fs-3", theme === "dark" && "text-white")}>
        Task Name
      </div>
      <div className="d-flex flex-row align-items-center">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "red",
          }}
        />
        <p className="text-danger">Ticket progress is blocked</p>
      </div>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="fs-5 fw-medium "> Checklist</div>
          </Accordion.Header>

          <Accordion.Body
            style={{ backgroundColor: theme === "light" ? "#fff" : "#000" }}
          >
            <div>
              <div
                className={clsx(
                  { "text-white": theme === "dark" },
                  { "text-dark": theme === "light" },
                )}
              >
                {currentItem?.title || ""}{" "}
              </div>
              {steps.map(step => (
                <CheckListStep
                  key={step.id}
                  {...step}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            <div
              onClick={() => {
                setStep(undefined)
                handleShowModal()
              }}
              className="my-2 d-flex flex-row align-items-center"
            >
              <Icons.AddNewItem />
              <h6 className="text-primary my-4 mx-2 ">Add new item</h6>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {showModal && (
        <AddItemModal
          isVisible={showModal}
          onClose={handleHideModal}
          onSubmit={handleAddItem}
          initialValues={step}
        />
      )}
    </div>
  )
}

export default Checklist
