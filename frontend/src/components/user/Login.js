import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";

const Login = () => {
  // Pop-up Register
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="login-page">
      <MetaData title={"Login"} />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Masukan Email kamu" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Row>
          <Col>
            <div className="text-center">
              <Link>
                <Button type="button" className="btn btn-login">
                  Login
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <Button
                type="button"
                className="btn btn-login"
                onClick={handleShow}
              >
                Daftar
              </Button>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              className="register"
            >
              <Modal.Header closeButton>
                <Modal.Title>Registrasi Pengguna Baru</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan Nama Lengkap"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Masukan Email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-secondary" onClick={handleClose}>
                  Tutup
                </Button>
                <Button className="btn btn-review">Daftar</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
