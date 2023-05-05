import { Row, Col, Form, Card } from "react-bootstrap"
import Select from "react-select"

import pickup_at from "../data/pickup_at.json"
import deliver_to from "../data/deliver_to"
import vehicle_type from "../data/vehicle_types"

const Inputs = ({
  setStartLocation,
  setEndLocation,
  setDistance,
  setWeight,
  setVehicleType,
  setDuration,
}) => {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Start Location</Form.Label>
              <Select
                options={pickup_at}
                onChange={(e) => setStartLocation(e.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Vehicle Type</Form.Label>
              <Select
                options={vehicle_type}
                onChange={(e) => setVehicleType(e.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>End Location</Form.Label>
              <Select
                options={deliver_to}
                onChange={(e) => setEndLocation(e.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setDistance(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Duration (hours)</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setDuration(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Inputs
