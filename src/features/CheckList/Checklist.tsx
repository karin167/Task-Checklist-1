import Accordion from "react-bootstrap/Accordion"
import CheckListStep from "./CheckListStep"
import { Icons } from "../../icons"
import AddItemModal from "./AddItemModal"
import { useState } from "react"
import { Check } from "../../types"

const data = {
  checkList: [
    {
      id: 1,
      title: "Light Bulb 150S",
      steps: [
        {
          id: 1,
          title: "Check item 1",
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
          title: "Check item 3",
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

  const currentItem = data.checkList.find(
    item => item.id === currentCheckListId,
  )

  const [steps, setSteps] = useState(currentItem?.steps || [])

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  const handleAddItem = (values: Omit<Check, "id">) => {
    const id = steps.length + 1
    const newStep = { ...values, id }

    console.log([newStep, ...steps])
    setSteps([newStep, ...steps])
    handleHideModal()
  }
  return (
    <div className="w-25 p-4">
      <div className="fs-3"> Task Name</div>
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
            {" "}
            <div className="fs-5 fw-medium "> Checklist</div>
          </Accordion.Header>

          <Accordion.Body>
            <div>
              <div> {currentItem.title} </div>
              {steps.map(step => (
                <CheckListStep key={step.id} {...step} />
              ))}
            </div>

            <div
              onClick={handleShowModal}
              className="my-2 d-flex flex-row align-items-center"
            >
              <Icons.AddNewItem />
              <h6 className="text-primary my-4">Add new item</h6>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <AddItemModal
        isVisible={showModal}
        onClose={handleHideModal}
        onSubmit={handleAddItem}
      />
    </div>
  )
}

export default Checklist
