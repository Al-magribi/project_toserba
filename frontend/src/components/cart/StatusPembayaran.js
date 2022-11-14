import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";

const StatusPembayaran = () => {
  const data = JSON.parse(localStorage.getItem("statusPembayaran"));
  const { user } = useSelector((state) => state.auth);

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
                  <Col>Order Id</Col>
                  <Col>: {data && data.order_id}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>VA Bank</Col>
                  <Col>: {data && data.bill_key}</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Total</Col>
                  <Col>
                    :{" "}
                    <NumericFormat
                      value={data && data.gross_amount}
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
                    : {data && data.transaction_status},{" "}
                    {data && data.status_message}
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
