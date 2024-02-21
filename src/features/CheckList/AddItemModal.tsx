import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useState } from "react"
import type { Step } from "../../types"

type AddItemModalProps = {
  isVisible: boolean
  onClose: () => void
  onSubmit: (values: Omit<Step, "id">) => void
  initialValues?: Step
}

const Statuses = [
  { value: "idle", label: "Idle" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "InProgress" },
  { value: "completed", label: "Completed" },
  { value: "blocked", label: "Blocked" },
]

function AddItemModal({
  isVisible,
  onClose,
  onSubmit,
  initialValues,
}: AddItemModalProps) {
  const defaultValues: Step = {
    title: "",
    description: "",
    status: "idle",
  }
  const [values, setValues] = useState<Step>(
    initialValues ? initialValues : defaultValues,
  )

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value

    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const handleSubmit = () => {
    let _errors = {
      ...errors,
    }
    if (values.title.length === 0) {
      _errors["title"] = "Title is required"
    }

    if (values.title.length > 0 && values.title.length <= 3) {
      _errors["title"] = "Title must be at least 4 characters"
    }

    if (values.description.length === 0) {
      _errors["description"] = "Description is required"
    }

    if (values.description.length > 0 && values.description.length <= 3) {
      _errors["description"] = 'Description must be at least 4 characters"'
    }

    const hasErrors = Object.values(_errors).some(Boolean)

    if (hasErrors) {
      return setErrors(_errors)
    }

    onSubmit(values)
    // Reset form
    setValues({ title: "", description: "", status: "idle" })
  }

  return (
    <Modal show={isVisible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title> {initialValues ? "Update" : "Add"} Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={values.title}
              placeholder="Install Light Bulb"
              onChange={handleChange}
              name="title"
              isInvalid={errors.title.length > 0}
              isValid={values.title.length > 3}
            />
            <Form.Text className="text-danger"> {errors.title}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Setup electric wires for dinning room"
              onChange={handleChange}
              name="description"
              value={values.description}
              isInvalid={errors.description.length > 0}
              isValid={values.description.length > 3}
            />

            <Form.Text className="text-danger">{errors.description}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select status:</Form.Label>
            <Form.Select
              defaultValue={values.status}
              onChange={handleChange}
              name="status"
            >
              {Statuses.map(status => (
                <option value={status.value}> {status.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialValues ? "Update" : "Add"} item
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddItemModal
