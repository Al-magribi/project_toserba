import React from "react";
import { Link } from "react-router-dom";

const StatusPembayaran = () => {
  return (
    <div>
      Pembayaran sukses / pending <Link to="/">Klik disini untuk kembali</Link>
    </div>
  );
};

export default StatusPembayaran;
