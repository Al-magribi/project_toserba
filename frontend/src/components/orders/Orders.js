import React, { useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { myOrders, clearError } from "../../action/orderAction";

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
          field: "id",
          sort: "asc",
        },
        {
          label: "Jumlah Item",
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
          label: "Update",
          field: "update",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        quantity: order.orderItems.length,
        pembayaran: order.totalHarga,
        paymentStatus: order.infoPembayaran.status,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        update: <i className="fa fa-eye"></i>,
      });
    });
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
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </div>
  );
};

export default Orders;
