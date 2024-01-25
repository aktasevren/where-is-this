import React from 'react'
import { Navbar, Container } from "react-bootstrap"
import githubLogo from "../assets/github.png";
import tmdbLogo from "../assets/tmdb.svg";

export default function NavbarComponent() {
  return (
    <Container>
      <Navbar>
        <Navbar.Brand href="/">
          <h1 className='nb-header' >where is this ?</h1>
        </Navbar.Brand>
        <div className="w-100 d-flex justify-content-end">
          <a href="https://github.com/aktasevren/where-is-this" target="blank" >
            <img src={githubLogo} alt="" className="logo" />
          </a>
          <a href="https://www.themoviedb.org/" target="blank" >
            <img src={tmdbLogo} alt="" className="logo" />
          </a>
        </div>
      </Navbar>
      <hr className='hr-line'></hr>
    </Container>

  )
}
