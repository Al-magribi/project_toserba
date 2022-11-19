import React, { useEffect, useState, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getOrderDetails } from "../../action/orderAction";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { NumericFormat } from "react-number-format";
import { useReactToPrint } from "react-to-print";

const OrderDetails = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    createdAt,
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
                          String(order.orderStatus).includes(
                            "DELIVERED",
                            "COMPLETE"
                          )
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderStatus}
                      </strong>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleShow}
                    >
                      INVOICE
                    </button>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Card className="m-2">
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
                <Col sm={12} md={12} lg={6} className={"mb-3"}>
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
                        <Col>Tagihan</Col>
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
                <Col sm={12} md={12} lg={6}>
                  <Card className="mx-2">
                    <Card.Header className="bg-primary text-white">
                      <strong>Detail Pembelian</strong>
                    </Card.Header>
                    <Card.Body>
                      {orderItems &&
                        orderItems.map((order) => (
                          <div className="my-2">
                            <Row key={order.product}>
                              <Col>
                                <div className="align-items-center">
                                  <img
                                    src={order.image}
                                    alt={order.name}
                                    width="150"
                                    className="rounded mx-auto my-auto d-block mt-4"
                                  />
                                </div>
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
                                      value={order.price * order.quantity}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"Rp "}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <hr />
                          </div>
                        ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        )}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>INVOICE</Modal.Title>
          </Modal.Header>
          <Modal.Body ref={componentRef}>
            <div className="container fs-6">
              <div className="m-3">
                <div className="d-flex align-items-center">
                  <strong>TOSERBA</strong>
                  <div className="ms-auto">
                    <p className="text-end m-0">
                      <strong>Invoice</strong>
                    </p>
                    <p className="text -end fst-italic m-0">
                      {infoPembayaran && infoPembayaran.id}
                    </p>
                  </div>
                </div>

                <div className="my-2">
                  <p className="m-0 p-0">Pembeli : {user && user.nama}</p>
                  <p className="m-0 p-0">
                    Tanggal Terbit {String(createdAt).substring(0, 10)}
                  </p>
                </div>
                <hr />
                <div className="my-2 px-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Produk</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Harga Satuan</th>
                        <th scope="col">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems &&
                        orderItems.map((order) => (
                          <tr key={order.product}>
                            <td>{order.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                            <td>
                              <NumericFormat
                                value={order.price * order.quantity}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp "}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <hr />

                <div
                  className="d-flex align-items-center px-5"
                  key={order.product}
                >
                  <p className="text-start m-0">
                    <strong>
                      {`Total Harga ${orderItems &&
                        orderItems.reduce(
                          (quantity, item) => quantity + Number(item.quantity),
                          0
                        )} item`}
                    </strong>
                  </p>
                  <div className="ms-auto">
                    <p className="text-end m-0">
                      <strong>
                        <NumericFormat
                          value={hargaProduk}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                        />
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center px-5">
                  <p className="text-start m-0">Total Ongkir</p>
                  <div className="ms-auto">
                    <p className="text-end m-0">
                      <NumericFormat
                        value={ongkir}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp "}
                      />
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center px-5">
                  <p className="text-start m-0">
                    <strong>Total Tagihan</strong>
                  </p>
                  <div className="ms-auto">
                    <p className="text-end m-0">
                      <strong>
                        <NumericFormat
                          value={totalHarga}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                        />
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePrint}>
              Print / Download
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default OrderDetails;
