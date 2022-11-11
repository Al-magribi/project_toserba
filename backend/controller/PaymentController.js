const midtransClient = require("midtrans-client");

// Pembayaran midtrans
exports.proceedPayment = (req, res, next) => {
  var snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLEINT_KEY,
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
