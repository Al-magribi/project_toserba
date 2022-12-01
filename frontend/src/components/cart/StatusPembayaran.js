import React, { Fragment } from "react";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";

const StatusPembayaran = () => {
  return (
    <Fragment>
      <MetaData title={"Pesanan"} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Pesanan Berhasil dibuat</h2>

          <Link to="/">Kembali</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default StatusPembayaran;
