import { useState } from "react"
import { Container, Row } from "react-bootstrap"
import ErrorHistoGraph from "./components/ErrorHistoGraph"
import ErrorData from "./components/ErrorData"

const Model = () => {
  const [label, setLabel] = useState()
  const [labelData, setLabelData] = useState()

  return (
    <>
      <ErrorHistoGraph setLabelData={setLabelData} setLabel={setLabel} />
      {labelData ? (
        <ErrorData data={labelData} label={label} />
      ) : (
        <div>Click a bar to see data</div>
      )}
    </>
  )
}

export default Model
