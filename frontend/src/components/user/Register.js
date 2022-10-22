import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Container, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { register, clearError } from "../../action/usersAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Konfigurasi aplikasi
  const Alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const { nama, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

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

    const formData = new FormData();
    formData.set("nama", nama);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <MetaData title="Pengguna Baru" />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                Pengguna Baru
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      id="name_field"
                      type="text"
                      name="nama"
                      placeholder="Masukan Nama Lengkap"
                      value={nama}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      id="email_field"
                      type="email"
                      name="email"
                      placeholder="Masukan Email kamu"
                      value={email}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      id="password_field"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <div className="d-flex align-items-center">
                      <div>
                        <figure className="avatar mr-3 item-rtl">
                          <img
                            src={avatarPreview}
                            className="rounded-circle"
                            alt="Avatar"
                          />
                        </figure>
                      </div>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          name="avatar"
                          className="custom-file-input"
                          id="file-avatar"
                          accept="images/*"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <br />
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="btn btn-login"
                          disabled={loading ? true : false}
                        >
                          Daftarkan
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
