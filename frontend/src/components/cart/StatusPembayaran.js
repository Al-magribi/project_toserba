import React from "react";
import { useAlert } from "react-alert";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../action/orderAction";
import MetaData from "../layouts/MetaData";

const StatusPembayaran = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { result } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.auth);

  const order = {
    orderItems: cartItems,
    detailPengiriman: shippingInfo,
  };

  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.ongkir = orderInfo.endCost;
    order.hargaProduk = orderInfo.totalPrice;
    order.totalHarga = orderInfo.totalPayment;
  }

  order.infoPembayaran = {
    id: result.transaction_id,
    status: result.transaction_status,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(order);

    dispatch(createOrder(order));

    Alert.success("transaksi berhasil dikirim");
  };

  return (
    <div className="status-screen mt-5 ">
      <MetaData title={"Status Transaksi"} />
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header>Status Transaksi</Card.Header>
              <Card.Body>
                <Row>
                  <Col>{user && user.nama}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Id Transaksi</Col>
                  <Col>: {result.transaction_id}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>VA Bank</Col>
                  <Col>: {result.bill_key}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Total</Col>
                  <Col>
                    :{" "}
                    <NumericFormat
                      value={result.gross_amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" Rp "}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>Satus</Col>
                  <Col>
                    : {result.transaction_status}, {result.status_message}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={submitHandler}>
                      Kirim data transaksi
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StatusPembayaran;
