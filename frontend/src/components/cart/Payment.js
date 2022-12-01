import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import Steps from "./Steps";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";
import { clearError, createOrder } from "../../action/orderAction";
import { clearCart } from "../../action/cartAction";

const Payment = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.newOrder);

  const Alert = useAlert();
  const dispatch = useDispatch();

  // data dari sesion storage
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

  // Proses pembayaran dengan metode snap midtrans
  // pembuatan order id

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

    const orderId = `TOSERBA-${parseInt(Math.floor(Math.random() * 10000))}`;
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
        order.infoPembayaran = {
          order_id: result.order_id,
          id: result && result.transaction_id,
          status: result.transaction_status,
        };
        dispatch(createOrder(order));
        dispatch(clearCart(cartItems));
      },
      onPending: function(result) {
        /* You may add your own implementation here */
        order.infoPembayaran = {
          order_id: result.order_id,
          id: result && result.transaction_id,
          status: result.transaction_status,
        };

        dispatch(createOrder(order));
        dispatch(clearCart(cartItems));
      },
      onError: function(result) {
        /* You may add your own implementation here */
        Alert.error(result);
      },
      onClose: function() {
        /* You may add your own implementation here */
        Alert.error("you closed the popup without finishing the payment");
      },
    });
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);

      dispatch(clearError());
    }

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
  }, [Alert, clearError, dispatch]);

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
