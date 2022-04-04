import React from 'react';
import { Navbar, Nav,NavDropdown,Container} from 'react-bootstrap';

class navbar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Currency Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Portfolio</Nav.Link>
            <Nav.Link href="#link">Github</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
}

export default navbar;