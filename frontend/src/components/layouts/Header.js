import { useAlert } from "react-alert";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Search from "./Search";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/usersAction";

const Header = () => {
  // Konfigurasi aplikasi
  const Alert = useAlert();
  const dispatch = useDispatch();

  // data user dari state
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    Alert.success("Berhasil Logout");
  };

  return (
    <Fragment>
      <Navbar bg="primary" expand="lg">
        <Container>
          <LinkContainer to="/" className="Brand">
            <Navbar.Brand className="text-white">TOSERBA</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-white"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Search />
              <br />
              <Link
                to="/cart"
                className="cart-link"
                style={{ textDecoration: "none" }}
              >
                <span className="fa-solid fa-cart-shopping fa-lg text-white">
                  {" "}
                </span>
                {user ? (
                  <span className="ml-1" id="cart_count">
                    {cartItems.reduce(
                      (quantity, item) => quantity + Number(item.quantity),
                      0
                    )}
                  </span>
                ) : (
                  <span className="ml-1" id="cart_count">
                    0
                  </span>
                )}
              </Link>
              <br />
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <figure className="avatar  avatar-nav">
                      <img
                        className="rounded-circle"
                        src={user.avatar && user.avatar.url}
                        alt={user.nama}
                      />
                    </figure>
                    {user && user.nama}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    id="dropdown-item-button"
                    className="dropdown-menu"
                  >
                    <LinkContainer to="/me">
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </LinkContainer>

                    {user && user.role === "admin" ? (
                      <LinkContainer to="/dashboard">
                        <Dropdown.Item>Dasboard</Dropdown.Item>
                      </LinkContainer>
                    ) : (
                      <LinkContainer to="/orders/me">
                        <Dropdown.Item>Pesanan</Dropdown.Item>
                      </LinkContainer>
                    )}
                    <Dropdown.Item
                      className="text-danger"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                !loading && (
                  <LinkContainer to="/login" className="login">
                    <span type="button" className="btn btn-login text-white">
                      Login
                    </span>
                  </LinkContainer>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
