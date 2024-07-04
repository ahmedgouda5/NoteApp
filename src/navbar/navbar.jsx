import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Navigation() {
  const nav=useNavigate()
  function ProtectRoute(){
    localStorage.removeItem("token")
    nav("/login")
    
  }
  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center gap-2"><i class="fa-solid fa-note-sticky text-white"></i>Sticky App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto ">
            <Nav.Link> <NavLink to="/register" className="decoration">Register</NavLink></Nav.Link>
            <Nav.Link> <NavLink to="/login" className="decoration">Login</NavLink></Nav.Link>
            <Nav.Link onClick={ProtectRoute}className="decoration"> log out </Nav.Link>
            <Nav.Link> <NavLink to="" className="decoration"><i class="fa-brands fa-facebook"></i></NavLink></Nav.Link>
            <Nav.Link> <NavLink to="" className="decoration"><i class="fa-brands fa-linkedin"></i></NavLink></Nav.Link>
            <Nav.Link> <NavLink to="" className="decoration"><i class="fa-brands fa-twitter"></i></NavLink></Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
