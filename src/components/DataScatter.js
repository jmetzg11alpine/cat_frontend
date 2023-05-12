import { Container, Row, Col, Form } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"

const DataScatter = ({ xValue, yValue, data }) => {
  const svgRef = useRef()
  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.7
  const bufferLeft = width * 0.1
  const bufferRight = width * 0.0
  const bufferTop = height * 0.09
  const bufferBottom = height * 0.05

  useEffect(() => {
    if (xValue && yValue) {
      const svg = d3.select(svgRef.current).select("svg")
      svg.selectAll("*").remove()
      svg.attr("width", width).attr("height", height)

      const tooltip = d3
        .select(svgRef.current)
        .append("div")
        .style("position", "absolute")
        .style("background", "#FCD3DE")
        .style("visibility", "hidden")
        .style("width", "20vw")

      function showToolTip(e, d) {
        const deliveryDate = d.delivery_date.split("T", 1)[0]
        tooltip
          .style("visibility", "visible")
          .style("top", e.pageY - height / 2.8 + "px")
          .style("left", e.pageX - width / 10 + "px")
          .html(`<b>DELIVERY DATE</b>: ${deliveryDate} <br>
                 <b>PICKUP STATE</b>: ${d.pickup_state} <br>
                 <b>Delivery State</b>: ${d.deliver_state} <br>
                 <b>Duration</b>: ${d.duration_hours} <br>
                 <b>Vehicle size</b>: ${d.vehicle_size} <br>
                 <b>Weight:</b> ${d.weight} <br>
                 <b>Distance:</b> ${d.billed_miles} <br>
                 <b>Cost</b>: ${d.total}`)
        console.log(d)
      }

      let xAxis = ""
      if (
        (xValue === "deliver_state") |
        (xValue === "pickup_state") |
        (xValue === "vehicle_size")
      ) {
        xAxis = d3
          .scalePoint()
          .range([0, width - bufferLeft - bufferRight])
          .domain([...new Set(data.map((d) => d[xValue]))])
      } else {
        xAxis = d3
          .scaleLinear()
          .range([0, width - bufferLeft - bufferRight])
          .domain([0, d3.max(data, (d) => d[xValue])])
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
        yAxis = d3
          .scalePoint()
          .range([height - bufferBottom - bufferTop, 0])
          .domain([...new Set(data.map((d) => d[yValue]))])
      } else {
        yAxis = d3
          .scaleLinear()
          .range([height - bufferBottom - bufferTop, 0])
          .domain([0, d3.max(data, (d) => d[yValue])])
      }
      svg
        .append("g")
        .attr("transform", `translate(${bufferLeft}, ${bufferTop})`)
        .call(d3.axisLeft(yAxis))

      // make like this: https://stackoverflow.com/questions/63918899/how-to-break-line-in-d3-js-tooltip
      svg
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => bufferLeft + xAxis(d[xValue]))
        .attr("cy", (d) => bufferTop + yAxis(d[yValue]))
        .attr("r", 7)
        .attr("fill", "#9883E5")
        .attr("opacity", ".2")
        .on("mouseover", function (e, d) {
          d3.select(this).attr("opacity", ".7").attr("r", 12)
          showToolTip(e, d)
        })
        .on("mouseout", function (e, d) {
          d3.select(this).attr("opacity", ".2").attr("r", 7)
          tooltip.style("visibility", "hidden")
        })
    }
  }, [data, xValue, yValue])

  return (
    <Container>
      <Row ref={svgRef}>
        <svg></svg>
      </Row>
    </Container>
  )
}

export default DataScatter
