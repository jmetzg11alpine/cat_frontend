import * as d3 from "d3"
import { useRef, useEffect } from "react"

const HistoGraph = ({ data, text, size }) => {
  const svgRef = useRef()
  let width = ""
  if (size === "small") {
    width = window.innerWidth / 4.1
  } else {
    width = window.innerWidth / 3.2
  }

  const height = window.innerHeight / 3.2
  const bufferLeft = width * 0.1
  const bufferRight = width * 0.01
  const bufferTop = height * 0.1
  const bufferBottom = height * 0.079
  const barWidth = (width - bufferLeft - bufferRight) / data.length - 1

  useEffect(() => {
    const svg = d3.select(svgRef.current).select("svg")
    svg.selectAll("*").remove()
    svg.attr("width", width).attr("height", height)

    // add title
    svg
      .append("text")
      .attr("transform", `translate(40, 20)`)
      .attr("font-size", "20px")
      .text(text)

    //   x axis
    const xAxis = d3
      .scaleBand()
      .range([0, width - bufferLeft - bufferRight])
      .domain(data.map((d) => d.key))
    svg
      .append("g")
      .attr("transform", `translate(${bufferLeft}, ${height - bufferBottom})`)
      .call(d3.axisBottom(xAxis).tickSizeOuter([]))

    //   y axis
    const yAxis = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((d) => d.value))])
      .range([height - bufferBottom - bufferTop, 0])

    svg
      .append("g")
      .attr("transform", `translate(${bufferLeft}, ${bufferTop})`)
      .call(d3.axisLeft(yAxis).tickSizeOuter([]))

    //   bars
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xAxis(d.key) + bufferLeft + 2)
      .attr("y", (d) => yAxis(d.value) + bufferTop - 1)
      .attr("width", barWidth - 4)
      .attr("height", (d) => height - yAxis(d.value) - bufferTop - bufferBottom)
      .attr("fill", "#30d5c8")
  }, [data])
  return (
    <div ref={svgRef}>
      <svg></svg>
    </div>
  )
}

export default HistoGraph
