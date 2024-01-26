import React from 'react'
import { Navbar, Container, Col, Row } from "react-bootstrap"
import githubLogo from "../assets/githubwhite.png";
import tmdbLogo from "../assets/tmdb.svg";

export default function NavbarComponent() {
  return (
    <Container>
      <Row className='m-4' >
        <Col xl={6} md={12}>
          <Navbar.Brand href="/">
            <h1 className='nb-header' >where is this ?</h1>
          </Navbar.Brand>
        </Col>
        <Col xl={6} md={12} className="logos-col">
          <div >
            <a href="https://github.com/aktasevren/where-is-this" target="blank" >
              <img src={githubLogo} alt="" className="logo" />
            </a>
            <a href="https://www.themoviedb.org/" target="blank" >
              <img src={tmdbLogo} alt="" className="logo" />
            </a>
          </div>
        </Col>
      </Row>
      <hr className='hr-line'></hr>
    </Container>
  )
}
