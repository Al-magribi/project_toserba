import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { NumericFormat } from "react-number-format";
import Steps from "./Steps";
import { useSelector } from "react-redux";

const Payment = () => {
  // const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  // data dari sesion storage
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.endCost = orderInfo.endCost;
    order.totalPrice = orderInfo.totalPrice;
    order.totalPayment = orderInfo.totalPayment;
  }

  const shipment = (
    <NumericFormat
      value={orderInfo.endCost}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" Rp "}
    />
  );
  const itemPrice = (
    <NumericFormat
      value={orderInfo.totalPrice}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" Rp "}
    />
  );
  const payment = (
    <NumericFormat
      value={orderInfo.totalPayment}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" Rp "}
    />
  );

  return (
    <div className="payment-screen">
      <MetaData title={"Pembayaran"} />
      <h3>Proses Pembayaran</h3>
      <Container>
        <Steps shipping confirmOrder payment />
        <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header>Konfirmasi Pembayaran</Card.Header>
              <Card.Body>
                <Row>
                  <Col>Pengiriman</Col>
                  <Col>: {shipment}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Total Pembelian</Col>
                  <Col>: {itemPrice}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Pembayaran</Col>
                  <Col>: {payment}</Col>
                </Row>
                <div className="mt-3 text-center my-2 d-grid gap-2">
                  <Button type="button" className="btn btn-out">
                    Selesaikan Pembayaran
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
