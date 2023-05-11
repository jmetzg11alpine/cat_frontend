import React from "react"
import { Table, Card } from "react-bootstrap"
import * as d3 from "d3"
import "../styles/sample-display.css"

const ErrorData = ({ data, label }) => {
  let colorScale = ""
  if (label > 0) {
    data.sort((a, b) => b.error - a.error)
    colorScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.error), d3.max(data, (d) => d.error)])
      .range(["#e4fde1", "#ffb400"])
  } else {
    data.sort((a, b) => a.error - b.error)
    colorScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.error), d3.max(data, (d) => d.error)])
      .range(["#ffb400", "#e4fde1"])
  }

  return (
    <Card className='sample-container mt-1 ms-5 me-5'>
      <Card.Title className='p-1 mb-0'>{data.length} Examples</Card.Title>
      <Card.Body className='pt-1'>
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
              <th>RPM</th>
              <th>Predicted RPM</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              const color = colorScale(d.error)
              return (
                <tr key={i}>
                  <td>{d.pickup_state}</td>
                  <td>{d.deliver_state}</td>
                  <td>{d.duration_hours}</td>
                  <td>{d.vehicle_size}</td>
                  <td>{d.weight}</td>
                  <td>{d.billed_miles}</td>
                  <td>{d.total}</td>
                  <td>{Math.round(d.rpm * 100) / 100}</td>
                  <td style={{ backgroundColor: "#30d5c8" }}>
                    {Math.round(d.predicted_rpm * 100) / 100}
                  </td>
                  <td style={{ backgroundColor: color }}>
                    {Math.round(d.error * 100) / 100}
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

export default ErrorData
