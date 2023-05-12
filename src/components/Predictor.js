import { useState } from "react"
import { Card, ListGroup } from "react-bootstrap"
import "../styles/predictor.css"

const Predictor = ({
  startLocation,
  endLocation,
  distance,
  weight,
  vehicleType,
  duration,
}) => {
  const [total, setTotal] = useState("")
  const [RPM, setRPM] = useState("")
  const body = {
    startLocation: startLocation,
    endLocation: endLocation,
    distance: distance,
    weight: weight,
    vehicleType: vehicleType,
    duration: duration,
  }
  const url = "https://cat-model-rpm-06.herokuapp.com/"
  // const url = "http://localhost:8000/"
  const handlePrediction = async (e) => {
    e.preventDefault()
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await response.json()
    setTotal(result.predicted_total)
    setRPM(result.predicted_rpm)
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>Jesse's weak model prediction</Card.Header>
      <ListGroup variant='flush'>
        <ListGroup.Item>Total: {total}</ListGroup.Item>
        <ListGroup.Item>Rate Per Mile: {RPM}</ListGroup.Item>
        <ListGroup.Item className='predictor-button' onClick={handlePrediction}>
          Predict
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Predictor
