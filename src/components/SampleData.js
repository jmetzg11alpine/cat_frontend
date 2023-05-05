import { Table, Card } from "react-bootstrap"

import sample_data from "../data/sample_data.json"
console.log(sample_data)

const SampleData = () => {
  return (
    <Card>
      <Card.Title>40 Random Examples</Card.Title>
      <Card.Body>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
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
                <tr key={i}>
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
