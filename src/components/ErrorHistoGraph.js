import { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import data from "../data/error_distribution.json"

const ErrorHistoGraph = ({ setLabelData, setLabel }) => {
  const svgRef = useRef()
  const width = window.innerWidth
  const height = window.innerHeight * 0.4
  const bufferLeft = width * 0.03
  const bufferRight = width * 0.01
  const bufferTop = height * 0.04
  const bufferBottom = height * 0.07
  const barWidth = (width - bufferLeft - bufferRight) / data.length - 1

  const url = "https://cat-model-rpm-06.herokuapp.com/error"
  // const url = "http://localhost:8000/error"
  const getData = async (label) => {
    setLabel(label)
    const resposne = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ label: label }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const results = await resposne.json()
    setLabelData(results)
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current).select("svg")
    svg.selectAll("*").remove()
    svg.attr("width", width).attr("height", height)

    const colorScale = d3
      .scaleLinear()
      .domain([0, 30])
      .range(["#78c3fb", "#da2c38"])

    const xAxis = d3
      .scaleBand()
      .range([0, width - bufferRight - bufferLeft])
      .domain(data.map((d) => d.error))

    svg
      .append("g")
      .attr("transform", `translate(${bufferLeft}, ${height - bufferBottom})`)
      .call(d3.axisBottom(xAxis).tickSizeOuter([]))
      .attr("class", "x-ticks")
    // need 0, 65, 32, 33
    let ticks_to_remove = []
    for (let i = 1; i < 33; i += 2) {
      ticks_to_remove.push(i)
    }
    for (let i = 34; i < 65; i += 2) {
      ticks_to_remove.push(i)
    }

    const labels = d3.selectAll(".x-ticks .tick text")
    labels.each(function (_, i) {
      if (ticks_to_remove.includes(i)) d3.select(this).remove()
    })
    const ticks = d3.selectAll(".x-ticks .tick")
    ticks.each(function (_, i) {
      if (ticks_to_remove.includes(i)) d3.select(this).remove()
    })

    const yAxis = d3
      .scaleLinear()
      .domain([-50, d3.max(data.map((d) => d.value))])
      .range([height - bufferTop - bufferBottom, 0])
    svg
      .append("g")
      .attr("transform", `translate(${bufferLeft}, ${bufferTop})`)
      .call(d3.axisLeft(yAxis).tickSizeOuter([]))

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xAxis(d.error) + bufferLeft)
      .attr("y", (d) => yAxis(d.value) + bufferTop)
      .attr("width", barWidth)
      .attr("height", (d) => height - bufferTop - bufferBottom - yAxis(d.value))
      .attr("fill", (d) => colorScale(Math.abs(d.label)))
      .attr("opacity", ".4")
      .on("mouseover", function () {
        d3.select(this).attr("opacity", "1")
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", ".4")
      })
      .on("click", (e, d) => getData(d.label))
  }, [])

  return (
    <div ref={svgRef}>
      <svg></svg>
    </div>
  )
}

export default ErrorHistoGraph
