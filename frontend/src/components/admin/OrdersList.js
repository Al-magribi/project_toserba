import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getOrders,
  getOrderDetails,
  updateOrder,
  deleteOrder,
} from "../../action/orderAction";
import * as GrIcons from "react-icons/gr";
import { NumericFormat } from "react-number-format";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import {
  DELETE_ORDERS_RESET,
  UPDATE_ORDERS_RESET,
} from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { order = {} } = useSelector((state) => state.orderDetails);
  const { isUpdated, isDeleted } = useSelector((state) => state.order);

  const { detailPengiriman, orderItems, user, ongkir } = order;

  const orderId = orders && orders.map((order) => order._id);

  // Update Order Status
  const [show, setShow] = useState(false);

  const [status, setStatus] = useState("");
  const [resi, setResi] = useState("");

  const handleShow = (id) => {
    dispatch(getOrderDetails(id));

    setShow(true);
  };

  const handleClose = () => setShow(false);

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const updateStatus = (id) => {
    const formData = new FormData();
    formData.set("status", status);
    formData.set("resi", resi);

    dispatch(updateOrder(id, formData));

    setShow(false);
  };

  useEffect(() => {
    dispatch(getOrders());

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      Alert.success("Order Berhasil diperbarui");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }

    if (isDeleted) {
      Alert.success("Order berhasil dihapus");
      dispatch({ type: DELETE_ORDERS_RESET });
    }
  }, [dispatch, Alert, Error, isUpdated, isDeleted]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "order Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Items",
          field: "item",
          sort: "asc",
        },
        {
          label: "Tagihan",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Pembayaran",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Status order",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Resi",
          field: "resi",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          id: order._id,
          item: order.orderItems.length,
          amount: (
            <NumericFormat
              value={order.totalHarga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />
          ),
          paymentStatus: (
            <strong>
              {order.infoPembayaran.status &&
              order.infoPembayaran.status === "settlement" ? (
                <p style={{ color: "green" }}>
                  <strong>{order.infoPembayaran.status}</strong>
                </p>
              ) : (
                <p style={{ color: "red" }}>
                  <strong>{order.infoPembayaran.status}</strong>
                </p>
              )}
            </strong>
          ),
          orderStatus:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>
                <strong>{order.orderStatus}</strong>
              </p>
            ) : (
              <p style={{ color: "red" }}>
                <strong>{order.orderStatus}</strong>
              </p>
            ),
          resi: order.resi,
          action: (
            <div>
              <button
                className="btn btn-primary py-1 px-2 btn-action text-white"
                onClick={() => handleShow(order._id)}
              >
                <GrIcons.GrUpdate />
              </button>
              <button
                className="btn btn-danger py-1 px-2"
                onClick={() => deleteHandler(order._id)}
              >
                <GrIcons.GrTrash />
              </button>
            </div>
          ),
        });
      });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Pesanan"} />
      <h3>Pesanan</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="admin-screen">
          <Row>
            <Col>
              <MDBDataTable data={setOrders()} bordered striped hover />
            </Col>
          </Row>
        </div>
      )}
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order id #{orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col>
                  <strong>Detail Pengiriman</strong>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>{user && user.nama}</Col>
              </Row>
              <Row>
                <Col>{detailPengiriman && detailPengiriman.address}</Col>
              </Row>
              <Row>
                <Col>{detailPengiriman && detailPengiriman.phone}</Col>
              </Row>
              <Row>
                <Col>
                  Ongkir:{" "}
                  <NumericFormat
                    value={ongkir}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp "}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <strong>Detail Item</strong>
                </Col>
              </Row>
              <hr />
              {orderItems &&
                orderItems.map((item) => (
                  <div key={item.product}>
                    <Row className="mb-3">
                      <Col>
                        <strong>{item.name}</strong>
                      </Col>
                    </Row>
                    <Row className="text-end">
                      <Col>
                        <i>{item.quantity} pcs</i>
                      </Col>
                      <Col>
                        <strong>
                          <i>
                            <NumericFormat
                              value={item.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp "}
                            />
                          </i>
                        </strong>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
            </Col>
            <Col>
              <Row>
                <Col>
                  <strong>Update Status</strong>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Form>
                    <Form.Select
                      className="mb-3"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                    <Form.Group>
                      <Form.Label>Resi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukan Resi"
                        value={resi}
                        onChange={(e) => setResi(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateStatus(order._id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default OrdersList;
