import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Container, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { clearError, updatePassword } from "../../action/usersAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  // Konfigurasi aplikasi
  const Alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdate, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (isUpdate) {
      Alert.success("Password Berhasil diperbarui");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, Alert, error, isUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <div>
      <MetaData title="Update Password" />
      <Container className="update-profile">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                Perbarui Password
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Form.Group className="mb-3">
                    <Form.Label>Password Lama</Form.Label>
                    <Form.Control
                      id="oldPassword_field"
                      type="password"
                      name="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password Baru</Form.Label>
                    <Form.Control
                      id="password_field"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn btn-login"
                      disabled={loading ? true : false}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdatePassword;
