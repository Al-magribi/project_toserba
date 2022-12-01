import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, resetPassword } from "../../action/usersAction";
import MetaData from "../layouts/MetaData";

const NewPassword = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      Alert.success("Password berhasil diperbarui");
      navigate("/");
    }
  }, [Alert, dispatch, error, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, params.token));
  };

  return (
    <div>
      <MetaData title={"Reset Password"} />
      <Container className="reset-password">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                Reset Password
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      id="password_field"
                      type="password"
                      name="password"
                      value={password || ""}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Konfirmasi Password</Form.Label>
                    <Form.Control
                      id="confirmPassword_field"
                      type="password"
                      name="password"
                      value={confirmPassword || ""}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit" className="btn btn-send">
                      Kirim
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

export default NewPassword;
