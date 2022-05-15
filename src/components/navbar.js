import React from 'react';
import '../styles/navstyle.css'
import { Navbar, Nav,NavDropdown,Container} from 'react-bootstrap';

class navbar extends React.Component {
  render() {
    return (
      <Navbar expand="lg">
      <Container >
        <Navbar.Brand href="#home" className='text-white'>Currency Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-white">
            <Nav.Link className="pl-5 text-white"href="#home">Portfolio</Nav.Link>
            <Nav.Link className="text-white"href="#link">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
}

export default navbar;