import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import Select from "react-select"
import HistoGraph from "./components/HistoGraph"
import DataScatter from "./components/DataScatter"

const Data = () => {
  const [data, setData] = useState({
    costs: [],
    deliver_states: [],
    distances: [],
    durations: [],
    pickup_states: [],
    vehicles: [],
    weights: [],
    all_data: [],
  })
  const [startDate, setStartDate] = useState("2021-01-04")
  const [endDate, setEndDate] = useState("2023-03-02")
  const [xValue, setXValue] = useState()
  const [yValue, setYValue] = useState()
  const options = [
    { value: "deliver_state", label: "Delivery" },
    { value: "pickup_state", label: "Pickup" },
    { value: "vehicle_size", label: "Vehicle" },
    { value: "billed_miles", label: "Distance" },
    { value: "duration_hours", label: "Duration" },
    { value: "weight", label: "Weight" },
    { value: "total", label: "Cost" },
  ]
  const body = {
    startDate: startDate,
    endDate: endDate,
  }
  const getData = async () => {
    const response = await fetch(
      "https://cat-model-rpm-06.herokuapp.com/data",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const results = await response.json()
    setData(results)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Container className='m-0' style={{ maxWidth: "100%" }}>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridEmail'>
          <Form.Label>Start - delivery date</Form.Label>
          <Form.Control
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId='formGridPassword'>
          <Form.Label>End - deliver date</Form.Label>
          <Form.Control
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId='formGridEmail'>
          <Form.Label>X-Axis</Form.Label>
          <Select options={options} onChange={(e) => setXValue(e.value)} />
        </Form.Group>
        <Form.Group as={Col} controlId='formGridPassword'>
          <Form.Label>Y-axis</Form.Label>
          <Select options={options} onChange={(e) => setYValue(e.value)} />
        </Form.Group>
        <Col xs={2} className='d-flex p-4 justify-content-center'>
          <Button onClick={getData}>Update</Button>
        </Col>
      </Row>
      <Row>
        {xValue && yValue ? (
          <DataScatter xValue={xValue} yValue={yValue} data={data.all_data} />
        ) : (
          <div>Pick an X-axis and Y-axis to view a scatter plot</div>
        )}
      </Row>
      {data.costs.length ? (
        <>
          <Row>
            <Col className='p-0 ps-2'>
              <HistoGraph
                data={data.deliver_states}
                text={"Delivery States"}
                size={"big"}
              />
            </Col>
            <Col className='p-0'>
              <HistoGraph
                data={data.pickup_states}
                text={"Pickup States"}
                size={"big"}
              />
            </Col>
            <Col className='p-0'>
              <HistoGraph
                data={data.vehicles}
                text={"Vehicle Type"}
                size={"big"}
              />
            </Col>
          </Row>
          <Row style={{ height: "35vh" }}>
            <Col className='p-0 ps-2'>
              <HistoGraph
                data={data.distances}
                text={"Distance in hundres of miles"}
                size={"small"}
              />
            </Col>
            <Col className='p-0'>
              <HistoGraph
                data={data.weights}
                text={"Weight in thousands of pounds"}
                size={"small"}
              />
            </Col>
            <Col className='p-0'>
              <HistoGraph
                data={data.durations}
                text={"Deliver minus pickup in hours"}
                size={"small"}
              />
            </Col>
            <Col className='p-0'>
              <HistoGraph
                data={data.costs}
                text={"Total cost in thousands of dollars"}
                size={"small"}
              />
            </Col>
          </Row>
        </>
      ) : (
        <h2>Loading</h2>
      )}

      <div>
        The data used to train the model. Out of the 50,000+ plus samples only
        16,445 were used to build the model. These are the distributions of the
        seven features used to train the model.
      </div>
    </Container>
  )
}

export default Data
