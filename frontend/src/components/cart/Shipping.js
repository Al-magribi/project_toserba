import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../action/cartAction";
import MetaData from "../layouts/MetaData";
import Steps from "./Steps";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [phone, setPhone] = useState(shippingInfo.phone);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, phone }));
    navigate("/confirm");
  };

  return (
    <div className="shipping-screen">
      <Steps shipping />
      <MetaData title={"alamat pengiriman"} />
      <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <Col md={8} lg={6} xs={12}>
          <Card>
            <Card.Header>Detail alamat pengiriman</Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Almat Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>No HandPhone</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <div className="mt-3 text-center my-2 d-grid gap-2">
                  <Button type="submit" className="btn btn-confirm">
                    Konfirmasi Pesanan
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Shipping;
