import React from 'react'
import { Navbar, Container } from "react-bootstrap"
import siteLogo from "../assets/film.png"

export default function NavbarComponent() {
  return (
    <Navbar className="">
      <Container className='justify-content-center'>
        <Navbar.Brand href="/" className=''>
          <div className='d-flex justify-content-center align-items-center '>
            <img alt="siteLogo" src={siteLogo} width="80" height="80" className="d-inline-block align-top" />
            <span className='align-items-center row ms-2' style={{fontWeight:'bolder',fontSize:'36px',color:'#DBC8AC'}}>filming  location  finder</span>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
