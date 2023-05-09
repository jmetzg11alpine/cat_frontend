import Select from "react-select"
import { Container, Row, Col, Form } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import data from "../data/all_data.json"

const DataScatter = () => {
  const svgRef = useRef()
  const [xValue, setXValue] = useState()
  const [yValue, setYValue] = useState()
  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.7
  const bufferLeft = width * 0.1
  const bufferRight = width * 0.0
  const bufferTop = height * 0.05
  const bufferBottom = height * 0.05

  let processedData = ""
  if (xValue && yValue) {
    processedData = data.map((d) => ({
      x: d[xValue],
      y: d[yValue],
    }))
    console.log(processedData)
  }
  useEffect(() => {
    if (processedData.length) {
      console.log(processedData)
      const svg = d3.select(svgRef.current).select("svg")
      svg.selectAll("*").remove()
      svg.attr("width", width).attr("height", height)

      let xAxis = ""
      if (
        (xValue === "deliver_state") |
        (xValue === "pickup_state") |
        (xValue === "vehicle_size")
      ) {
        xAxis = d3
          .scalePoint()
          .range([0, width - bufferLeft - bufferRight])
          .domain([...new Set(processedData.map((d) => d.x))])
      } else {
        xAxis = d3
          .scaleLinear()
          .range([0, width - bufferLeft - bufferRight])
          .domain([0, d3.max(processedData, (d) => d.x)])
      }
      svg
        .append("g")
        .attr("transform", `translate(${bufferLeft}, ${height - bufferBottom})`)
        .call(d3.axisBottom(xAxis))
      let yAxis = ""
      if (
        (yValue === "deliver_state") |
        (yValue === "pickup_state") |
        (yValue === "vehicle_size")
      ) {
        console.log([...new Set(processedData.map((d) => d.y))])
        yAxis = d3
          .scalePoint()
          .range([height - bufferBottom - bufferTop, 0])
          .domain([...new Set(processedData.map((d) => d.y))])
      } else {
        yAxis = d3
          .scaleLinear()
          .range([height - bufferBottom - bufferTop, 0])
          .domain([0, d3.max(processedData, (d) => d.y)])
      }
      svg
        .append("g")
        .attr("transform", `translate(${bufferLeft}, ${bufferTop})`)
        .call(d3.axisLeft(yAxis))

      svg
        .selectAll("circle")
        .data(processedData)
        .join("circle")
        .attr("cx", (d) => bufferLeft + xAxis(d.x))
        .attr("cy", (d) => bufferTop + yAxis(d.y))
        .attr("r", 7)
        .attr("fill", "blue")
        .attr("opacity", ".2")
    }
  }, [xValue, yValue])
  const options = [
    { value: "deliver_state", label: "Delivery" },
    { value: "pickup_state", label: "Pickup" },
    { value: "vehicle_size", label: "Vehicle" },
    { value: "billed_miles", label: "Distance" },
    { value: "duration_hours", label: "Duration" },
    { value: "weight", label: "Weight" },
    { value: "total", label: "Cost" },
  ]

  return (
    <Container>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridEmail'>
          <Form.Label>X-Axis</Form.Label>
          <Select options={options} onChange={(e) => setXValue(e.value)} />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridPassword'>
          <Form.Label>Y-axis</Form.Label>
          <Select options={options} onChange={(e) => setYValue(e.value)} />
        </Form.Group>
      </Row>
      <Row ref={svgRef}>
        <svg></svg>
      </Row>
    </Container>
  )
}

export default DataScatter
