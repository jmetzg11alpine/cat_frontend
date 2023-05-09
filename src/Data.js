import { Container, Row, Col } from "react-bootstrap"
import HistoGraph from "./components/HistoGraph"
import DataScatter from "./components/DataScatter"

import deliver from "./data/deliver_data.json"
import pickup from "./data/pickup_data.json"
import distance from "./data/distance_data.json"
import duration from "./data/duration_data.json"
import total from "./data/total_data.json"
import vehicle from "./data/vehicle_data.json"
import weight from "./data/weight_data.json"

const Data = () => {
  return (
    <Container className='m-0' style={{ maxWidth: "100%" }}>
      <div>
        The data used to train the model. Out of the 50,000+ plus samples only
        16,445 were used to build the model. These are the distributions of the
        seven features used to train the model.
      </div>
      <Row style={{ height: "35vh" }}>
        <Col className='p-0 ps-2'>
          <HistoGraph data={deliver} text={"Delivery States"} size={"big"} />
        </Col>
        <Col className='p-0'>
          <HistoGraph data={pickup} text={"Pickup States"} size={"big"} />
        </Col>
        <Col className='p-0'>
          <HistoGraph data={vehicle} text={"Vehicle Type"} size={"big"} />
        </Col>
      </Row>
      <Row style={{ height: "35vh" }}>
        <Col className='p-0 ps-2'>
          <HistoGraph
            data={distance}
            text={"Distance in hundres of miles"}
            size={"small"}
          />
        </Col>
        <Col className='p-0'>
          <HistoGraph
            data={weight}
            text={"Weight in thousands of pounds"}
            size={"small"}
          />
        </Col>
        <Col className='p-0'>
          <HistoGraph
            data={duration}
            text={"Difference between deliver and pickup in hours"}
            size={"small"}
          />
        </Col>
        <Col className='p-0'>
          <HistoGraph
            data={total}
            text={"Total cost in thousands of dollars"}
            size={"small"}
          />
        </Col>
      </Row>
      <Row>
        <DataScatter />
      </Row>
    </Container>
  )
}

export default Data
