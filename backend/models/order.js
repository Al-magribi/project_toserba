const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  detailPengiriman: {
    provinsi: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kodePos: {
      type: String,
      required: true,
    },
    tlp: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  orderItems: [
    {
      nama: {
        type: String,
        required: true,
      },
      jml: {
        type: Number,
        required: true,
      },
      gambar: {
        type: String,
        required: true,
      },
      harga: {
        type: Number,
        required: true,
      },
      produk: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },
    },
  ],
  infoPembayaran: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },

  hargaProduk: {
    type: Number,
    required: true,
    default: 0,
  },
  ongkir: {
    type: Number,
    required: true,
    default: 0,
  },
  totalHarga: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
