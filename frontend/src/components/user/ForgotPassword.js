import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../action/usersAction";
import MetaData from "../layouts/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const Alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError);
    }

    if (message) {
      Alert.success(message);
    }
  }, [Alert, dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <div>
      <MetaData title={"Lupa Password"} />
      <Container className="forgot-password">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                Lupa Password
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      id="email_field"
                      type="email"
                      name="email"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn btn-send"
                      disabled={loading ? true : false}
                    >
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

export default ForgotPassword;
