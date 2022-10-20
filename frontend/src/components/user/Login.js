import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { login, clearError } from "../../action/usersAction";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Pop-up Register
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Application
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const Alert = useAlert();
  const navigate = useNavigate();

  const { authenticatedUser, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authenticatedUser) {
      navigate("/");
    }

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, Alert, error, authenticatedUser, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="login-page">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukan Email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <div className="text-center my-2 d-grid gap-2">
                  <Button type="submit" className="btn btn-login">
                    Login
                  </Button>
                </div>

                <Link to="/password/forgot">
                  <div className="btn-forgot">
                    <Button className="btn btn-light" type="button">
                      Lupa Password
                    </Button>
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center my-2 d-grid gap-2">
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
                        <Form.Control
                          type="email"
                          placeholder="Masukan Email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
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
            <Row>
              <Col>
                <div className="text-center my-2 d-grid gap-2">
                  <Button className="btn">Facebook</Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-center my-2 d-grid gap-2">
                  <Button className="btn btn-light">Google</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Fragment>
      )}
    </div>
  );
};

export default Login;
