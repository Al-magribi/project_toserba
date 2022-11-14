import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import Steps from "./Steps";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Payment = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const Alert = useAlert();

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  // data dari sesion storage
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.endCost = orderInfo.endCost;
    order.totalPrice = orderInfo.totalPrice;
    order.totalPayment = orderInfo.totalPayment;
  }

  // Proses pembayaran dengan metode snap midtrans
  // pembuatan order id
  const orderId = `TOSERBA-${parseInt(Math.floor(Math.random() * 10000))}`;
  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization:
          "Basic U0ItTWlkLXNlcnZlci1UdmdTNU45SHBZR2o4bGd4M2h2RlBTRmg6",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const data = {
      order_id: orderId,
      payment: orderInfo.totalPayment,
      name: user.nama,
      email: user.email,
    };

    const response = await axios.post("/api/toserba/transaction", data, config);
    const token = response.data.token;

    window.snap.pay(token, {
      onSuccess: function(result) {
        localStorage.setItem("statusPembayaran", JSON.stringify(result));

        document.querySelector("#pay_btn").disabled = true;
        Alert.success("Pembayaran Berhasil");
      },
      onPending: function(result) {
        localStorage.setItem("statusPembayaran", JSON.stringify(result));

        Alert.error("Pembayaran tertunda");
      },
      onError: function(result) {
        Alert.error(result);
      },
      onClose: function() {
        navigate("/");
      },
    });
  };

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-RGHlGALHJ5YF5uma";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute(
      "SB-Mid-client-RGHlGALHJ5YF5uma",
      myMidtransClientKey
    );

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="payment-screen">
      <MetaData title={"Pembayaran"} />
      <h3>Proses Pembayaran</h3>
      <Container>
        <Steps shipping confirmOrder payment />
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header>Detail Pembayaran</Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user && user.nama}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={user && user.email}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Pembayaran</Form.Label>
                    <Form.Control
                      type="number"
                      name="name"
                      value={orderInfo && orderInfo.totalPayment}
                      readOnly
                    />
                  </Form.Group>
                  <br />
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button
                          id="btn_pay"
                          type="submit"
                          className="btn btn-pay"
                        >
                          Selesaikan Pembayaran
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

export default Payment;
