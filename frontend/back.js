import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Button, Container, Navbar, NavDropdown, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <div className="navbar-background">
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <Link to="/" className="Brand">
            <div className="navbar-brand text-white">TOSERBA</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <span className="fa-solid fa-cart-shopping"> </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
          <Link to="/login">
            <button className="btn btn-login text-white" id="login_btn">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
