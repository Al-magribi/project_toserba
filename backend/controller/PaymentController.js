const midtransClient = require("midtrans-client");
const catchError = require("../middlewares/catchError");

// Pembayaran midtrans
exports.proceedPayment = (req, res, next) => {
  var snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
  });

  snap
    .createTransaction(req.body)
    .then((transaction) => {
      const dataPayment = {
        id: transaction.rder_id,
        productId: req.body.productId,
        name: req.body.name,
        midtransResponse: JSON.stringify(transaction),
      };

      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;

      res.status(200).json({
        status: true,
        message: "berhasil",
        dataPayment,
        url: transactionRedirectUrl,
        token: transactionToken,
      });
    })
    .catch((e) => {
      console.log("Error occured:", e.message);
      res.status(400).json({
        status: false,
        message: "Pembayaran gagal",
        error: e.message,
      });
    });
};

// Mendapatkan respone transaksi
exports.getResponseTransaction = (req, res, next) => {
  var snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
  });

  snap.transaction.status(req.params.order_id).then((response) => {
    res.status(200).json({
      success: true,
      response,
    });
  });
};

// Mengirim API ke frontend
exports.midtransApi = catchError(async (req, res, next) => {
  res.status(200).json({
    clientKey: process.env.CLIENT_KEY,
  });
});
