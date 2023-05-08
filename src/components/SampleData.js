import { Table, Card } from "react-bootstrap"

import sample_data from "../data/sample_data.json"
import "../styles/40_samples.css"

const SampleData = ({
  setStartLocation,
  setEndLocation,
  setDistance,
  setWeight,
  setVehicleType,
  setDuration,
}) => {
  const upDateFeatures = (d) => {
    setStartLocation(d.pickup_state)
    setEndLocation(d.deliver_state)
    setDistance(d.billed_miles)
    setWeight(d.weight)
    setVehicleType(d.vehicle_size)
    setDuration(d.duration_hours)
  }

  return (
    <Card className='sample_container mt-1'>
      <Card.Title>200 Random Examples (rows are clickable)</Card.Title>
      <Card.Body>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr
              style={{ position: "sticky", top: "-1px", background: "white" }}
            >
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>Vehicle</th>
              <th>Weight</th>
              <th>Distance</th>
              <th>Total</th>
              <th>Predicted Total</th>
              <th>RPM</th>
              <th>Predicted RPM</th>
            </tr>
          </thead>
          <tbody>
            {sample_data.map((d, i) => {
              return (
                <tr key={i} onClick={() => upDateFeatures(d)}>
                  <td>{d.pickup_state}</td>
                  <td>{d.deliver_state}</td>
                  <td>{d.duration_hours}</td>
                  <td>{d.vehicle_size}</td>
                  <td>{d.weight}</td>
                  <td>{d.billed_miles}</td>
                  <td>{d.total}</td>
                  <td style={{ backgroundColor: "#30d5c8" }}>
                    {Math.round(d.predicted)}
                  </td>
                  <td>{Math.round(d.rpm * 100) / 100}</td>
                  <td style={{ backgroundColor: "#30d5c8" }}>
                    {Math.round(d.predicted_rpm * 100) / 100}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default SampleData
