import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link className="Brand" to="/">
          <Navbar.Brand>TOSERBA</Navbar.Brand>
        </Link>
        <Search />
        <Nav className="me">
          <Nav.Link href="#">
            <span className="fa-solid fa-cart-shopping"> </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </Nav.Link>
          <Button type="button" className="btn btn-login">
            Login
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
