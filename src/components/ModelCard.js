import React from "react"
import { Card } from "react-bootstrap"

const ModelCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Rate Per Mile</Card.Title>
        <Card.Subtitle>CatBoot Regressor</Card.Subtitle>
        <Card.Text className='lh-sm'>
          The more accurate model is being developed by some smarter people. I
          could get an R2 score of 74 while they got 79. With more data we
          should be able to get even a stronger model
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ModelCard
