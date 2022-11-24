import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getOrders,
  getOrderDetails,
  updateOrder,
} from "../../action/orderAction";
import * as GrIcons from "react-icons/gr";
import { NumericFormat } from "react-number-format";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { order = {} } = useSelector((state) => state.orderDetails);
  const { isUpdated } = useSelector((state) => state.order);

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
  }, [dispatch, Alert, Error, isUpdated]);

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
          label: "Status Pembayaran",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Status order",
          field: "orderStatus",
          sort: "asc",
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
          paymentStatus: order.infoPembayaran.status,
          orderStatus: order.orderStatus,
          action: (
            <div>
              <button
                className="btn btn-primary py-1 px-2 btn-action text-white"
                onClick={() => handleShow(order._id)}
              >
                <GrIcons.GrUpdate />
              </button>
              <button className="btn btn-danger py-1 px-2 ">
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
      <MetaData title={"Produk"} />
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
                      <Col>{item.name}</Col>
                    </Row>
                    <Row>
                      <Col>{item.quantity} pcs</Col>
                      <Col>
                        <NumericFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp "}
                        />
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
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
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
