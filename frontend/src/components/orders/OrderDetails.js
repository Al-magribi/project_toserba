import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getOrderDetails } from "../../action/orderAction";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { NumericFormat } from "react-number-format";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const params = useParams();

  const { error, loading, order = {} } = useSelector(
    (state) => state.orderDetails
  );

  const {
    detailPengiriman,
    orderItems,
    infoPembayaran,
    user,
    ongkir,
    hargaProduk,
    totalHarga,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));

    if (error) {
      dispatch(clearError());
    }
  }, [Alert, error, dispatch, params.id]);

  return (
    <div className="orderDetails-scren">
      <Container>
        <MetaData title={"Detail Pesanan"} />
        <h2 className="mt-3">Detail Pesanan</h2>
        {loading ? (
          <Loader />
        ) : (
          <Container>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <strong>Order #{order._id}</strong>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p style={{ fontSize: "4rem" }}>
                      <strong
                        className={
                          order.orderStatus &&
                          String(order.orderStatus).includes("Delivered")
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderStatus}
                      </strong>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Card className="mx-2">
                  <Card.Header className="bg-primary text-white">
                    Detail Pengiriman
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <div className="mb-2">
                          {user && user.nama}
                          <br />
                          {detailPengiriman && detailPengiriman.phone}
                          <br />
                          {detailPengiriman && detailPengiriman.address}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>JNE</Col>
                    </Row>
                    Ongkir :
                    <NumericFormat
                      value={ongkir}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="mt-3">
              <Row>
                <Col>
                  <Card className="mx-2">
                    <Card.Header className="bg-primary text-white">
                      <strong>Data Transaksi</strong>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col>Id Transaksi</Col>
                        <Col>: {infoPembayaran && infoPembayaran.id}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>Id Pesanan</Col>
                        <Col>: {infoPembayaran && infoPembayaran.order_id}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>Bank</Col>
                        <Col>: {infoPembayaran && infoPembayaran.bank}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>Virtual Account</Col>
                        <Col>: {infoPembayaran && infoPembayaran.va}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>Pembayaran</Col>
                        <Col>
                          :{" "}
                          <NumericFormat
                            value={totalHarga}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp "}
                          />
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>Status Transaksi</Col>
                        <Col>: {infoPembayaran && infoPembayaran.status}</Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="mx-2">
                    <Card.Header className="bg-primary text-white">
                      <strong>Detail Pembelian</strong>
                    </Card.Header>
                    <Card.Body>
                      {orderItems &&
                        orderItems.map((order) => (
                          <Row key={order.product}>
                            <Col>
                              <img
                                src={order.image}
                                alt={order.name}
                                width="250"
                              />
                            </Col>

                            <Col>
                              <Row>
                                <Col>{order.name}</Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col>{order.quantity} item</Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col>
                                  <NumericFormat
                                    value={hargaProduk}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rp "}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default OrderDetails;
