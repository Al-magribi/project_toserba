import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const Profile = () => {
  // Data user dari state
  const { user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Container className="profile">
        <Row>
          <Col sm={12} md={5} className="block-profile">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-circle"
                src={user.avatar.url}
                alt={user.name}
              />
            </figure>
            <div className="g-grip gap-2 text-center">
              <Link to="/me/update">
                <Button type="button" id="edit_profile">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <Row className="mt-5">
              <Col>
                <h5>Nama</h5>
                {user.nama}
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <h5>Email</h5>
                {user.email}
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <h5>Bergabung</h5>
                {String(user.dibuat).substring(0, 10)}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={3}>
                {user.role !== "admin" && (
                  <div className="g-grip gap-2 text-center">
                    <Link to="/orders/me">
                      <Button className="btn btn-danger w-100">Pesanan</Button>
                    </Link>
                  </div>
                )}
              </Col>
              <Col lg={3}>
                <div className="g-grip gap-2 text-center">
                  <Link to="/password/update">
                    <Button className="btn btn-primary w-100">
                      Ubah Password
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Profile;
