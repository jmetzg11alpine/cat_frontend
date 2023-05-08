import { Link, NavLink } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"

const NavBar = () => {
  return (
    <Navbar bg='light' variant='dark'>
      <Container>
        <Nav>
          <NavLink to='/'>Home</NavLink>
        </Nav>
        <Nav>
          <NavLink to='/data'>Data</NavLink>
        </Nav>
        <Nav>
          <NavLink to='/model'>Model</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
