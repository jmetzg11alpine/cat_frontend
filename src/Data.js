import { Container, Row, Col } from "react-bootstrap"
import HistoGraph from "./components/HistoGraph"

import deliver from "./data/deliver_data.json"
import pickup from "./data/pickup_data.json"
import distance from "./data/distance_data.json"
import total from "./data/total_data.json"
import vehicle from "./data/vehicle_data.json"
import weight from "./data/weight_data.json"

const Data = () => {
  console.log(deliver)
  return (
    <Container className='m-0' style={{ maxWidth: "100%" }}>
      <div>
        The data used to train the model. Out of the 50,000+ plus samples only
        16,445 were used to build the model. These are the distributions of the
        six features used to train the model.
      </div>
      <Row style={{ height: "35vh" }}>
        <Col>
          <HistoGraph data={deliver} text={"Delivery States"} />
        </Col>
        <Col>
          <HistoGraph data={pickup} text={"Pickup States"} />
        </Col>
        <Col>
          <HistoGraph data={vehicle} text={"Vehicle Type"} />
        </Col>
      </Row>
      <Row style={{ height: "35vh" }}>
        <Col>
          <HistoGraph data={distance} text={"Distance in hundres of miles"} />
        </Col>
        <Col>
          <HistoGraph data={weight} text={"Weight in thousands of pounds"} />
        </Col>
        <Col>
          <HistoGraph
            data={total}
            text={"Total cost in thousands of dollars"}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Data
