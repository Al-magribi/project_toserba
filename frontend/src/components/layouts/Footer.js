import React from "react";
import Container from "react-bootstrap/esm/Container";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <Container className="footer">
        copyright &copy; almagribi {year}
        <br />
        almagribi.appdev@gmail.com
      </Container>
    </>
  );
};

export default Footer;
