import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getOrders } from "../../action/orderAction";
import { Link } from "react-router-dom";
import * as GrIcons from "react-icons/gr";
import { NumericFormat } from "react-number-format";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { Col, Row } from "react-bootstrap";

const OrdersList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getOrders());

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, Alert, Error]);

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
              <Link
                to={`#`}
                className="btn btn-primary py-1 px-2 btn-action text-white"
              >
                <GrIcons.GrUpdate />
              </Link>
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
    </Fragment>
  );
};

export default OrdersList;
