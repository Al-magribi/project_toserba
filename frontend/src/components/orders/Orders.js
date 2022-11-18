import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { myOrders, clearError } from "../../action/orderAction";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const Orders = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.myOrder);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
  }, [Alert, dispatch, error]);

  const setOrder = () => {
    const data = {
      columns: [
        {
          label: "Order Id",
          field: "orderId",
          sort: "asc",
        },
        {
          label: "Item",
          field: "quantity",
          sort: "asc",
        },
        {
          label: "Pembayaran",
          field: "pembayaran",
          sort: "asc",
        },
        {
          label: "Status pembayaran",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Detail",
          field: "detail",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders &&
      orders.forEach((order) => {
        data.rows.push({
          orderId: order.infoPembayaran.order_id,
          quantity: order.orderItems.length,
          pembayaran: (
            <NumericFormat
              value={order.totalHarga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />
          ),
          paymentStatus: order.infoPembayaran.status,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          detail: (
            <Link to={`/order/${order._id}`}>
              <button className="btn btn-primary">
                <i className="fa fa-eye"></i>
              </button>
            </Link>
          ),
        });
      });
    return data;
  };

  return (
    <div className="order-screen">
      <MetaData title={"Pesanan"} />
      <h3>Order</h3>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrder()}
          className="px-3 mt-2"
          bordered
          striped
          hover
        />
      )}
    </div>
  );
};

export default Orders;
