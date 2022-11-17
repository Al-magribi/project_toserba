import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getOrderDetails } from "../../action/orderAction";

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
      <h4>Order #{order._id}</h4>
    </div>
  );
};

export default OrderDetails;
