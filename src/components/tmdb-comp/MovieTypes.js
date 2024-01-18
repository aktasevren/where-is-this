import React from 'react'
import { Button, Container, Col, Row } from "react-bootstrap"

export default function MovieTypes() {
  return (


    <Container>
      <Row className='my-5'>
        <Col className='text-center'>
          <Button className='m-types-btn' href='/popular'>Popular Movies</Button>
        </Col >
        <Col className='text-center'>
          <Button variant='dark' href='/toprated' className='m-types-btn'>Top Rated Movies</Button>
        </Col>
        <Col className='text-center'>
          <Button variant='dark' href='/upcoming' className='m-types-btn'>Upcoming Movies</Button>
        </Col>
      </Row>
    </Container>

  )
}
