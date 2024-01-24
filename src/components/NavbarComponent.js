import React from 'react'
import { Navbar, Container } from "react-bootstrap"

export default function NavbarComponent() {
  return (
    <Navbar>
      <Container className='justify-content-center'>
        <Navbar.Brand href="/">
          <h1 className='nb-header' >filming  location  finder</h1>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
