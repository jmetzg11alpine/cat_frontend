import { Container, Row, Col, Form } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"

const DataScatter = ({ startDate, endDate, xValue, yValue, data }) => {
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
        .text("donkey carrot")
        .style("background", "#FCD3DE")
        .style("visibility", "hidden")
        .style("width", "15vw")

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
          const deliveryDate = d.delivery_date.split("T", 1)[0]
          tooltip
            .style("visibility", "visible")
            .text(
              `duration-${d.duration_hours},
             start-${d.pickup_state},
             end-${d.deliver_state},
             distance-${d.billed_miles},
             cost-${d.total},
             weight: ${d.weight},
             vehicle: ${d.vehicle_size}, delivery date: ${deliveryDate}`
            )
            .style("top", e.pageY - 160 + "px")
            .style("left", e.pageX - 70 + "px")
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
