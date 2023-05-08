import { Row, Col, Form, Card } from "react-bootstrap"
import { useEffect } from "react"

import pickup_at from "../data/pickup_at.json"
import deliver_to from "../data/deliver_to"
import vehicle_type from "../data/vehicle_types"

const Inputs = ({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
  distance,
  setDistance,
  weight,
  setWeight,
  vehicleType,
  setVehicleType,
  duration,
  setDuration,
}) => {
  return (
    <Card>
      <Card.Body>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setStartLocation(e.target.value)}
                value={startLocation}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setVehicleType(e.target.value)}
                value={vehicleType}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => setEndLocation(e.target.value)}
                value={endLocation}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Distance</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setDistance(e.target.value)}
                value={distance}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Duration (hours)</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type='number'
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Inputs
