import { useAlert } from "react-alert";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Search from "./Search";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/usersAction";
// Menu Bar in admin's side
import * as FaIcons from "react-icons/fa";
import { sidebarData } from "./SidebarData";
import { IconContext } from "react-icons/lib";

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

  // Menu bar
  const [show, setShow] = useState(false);

  const showHandler = () => setShow(!show);
  const closeHandler = () => setShow(false);

  return (
    <Fragment>
      <Navbar bg="primary" expand="lg" sticky="top">
        <Container>
          {user && user.role === "admin" ? (
            <IconContext.Provider value={{ color: "#fff" }}>
              <div className="navbar">
                <Link to="#" className="menu-bars">
                  <FaIcons.FaBars onClick={showHandler} />
                </Link>
              </div>
              <nav className={show ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={closeHandler}>
                  {sidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span className="span-icon"> {item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </IconContext.Provider>
          ) : (
            <LinkContainer to="/" className="Brand">
              <Navbar.Brand className="text-white">TOSERBA</Navbar.Brand>
            </LinkContainer>
          )}

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

                    {user && user.role === "admin" && (
                      <LinkContainer to="/dashboard">
                        <Dropdown.Item>Dasboard</Dropdown.Item>
                      </LinkContainer>
                    )}
                    <LinkContainer to="/orders/me">
                      <Dropdown.Item>Pesanan</Dropdown.Item>
                    </LinkContainer>

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
