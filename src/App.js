import Inputs from "./components/Inputs"
import ModelCard from "./components/ModelCard"
import Predictor from "./components/Predictor"
import SampleData from "./components/SampleData"
import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

const App = () => {
  const [startLocation, setStartLocation] = useState("CI")
  const [endLocation, setEndLocation] = useState()
  const [distance, setDistance] = useState()
  const [weight, setWeight] = useState()
  const [vehicleType, setVehicleType] = useState()
  const [duration, setDuration] = useState()
  return (
    <Container className='mt-2'>
      <Row>
        <Col>
          <ModelCard />
        </Col>
        <Col>
          <Inputs
            startLocation={startLocation}
            setStartLocation={setStartLocation}
            endLocation={endLocation}
            setEndLocation={setEndLocation}
            distance={distance}
            setDistance={setDistance}
            weight={weight}
            setWeight={setWeight}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            duration={duration}
            setDuration={setDuration}
          />
        </Col>
        <Col>
          <Predictor
            startLocation={startLocation}
            endLocation={endLocation}
            distance={distance}
            weight={weight}
            vehicleType={vehicleType}
            duration={duration}
          />
        </Col>
      </Row>
      <Row>
        <SampleData
          setStartLocation={setStartLocation}
          setEndLocation={setEndLocation}
          setDistance={setDistance}
          setWeight={setWeight}
          setVehicleType={setVehicleType}
          setDuration={setDuration}
        />
      </Row>
    </Container>
  )
}

export default App
