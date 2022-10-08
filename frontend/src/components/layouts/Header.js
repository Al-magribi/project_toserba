import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">TOSERBA</Navbar.Brand>
        <Form className="d-flex form-search">
          <Form.Control
            type="search"
            placeholder="Cari produk ..."
            className="mx-auto search"
            aria-label="Search"
          />
          <Button variant="btn btn-light b-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Form>
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
