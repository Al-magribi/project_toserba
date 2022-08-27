const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ErrorHandler = require("../utilities/ErrorHandler");

// Menambahkan produk baru => Admin
exports.addNewProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Mengupdate produk => Admin
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Menghapus produk => Admin
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Berhasil dihapus",
  });
};

// Menampilkan seluruh produk => Client
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// Menampilan produk berdasarkan ID => Client
exports.productById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //   if (!product) {
  //     return next(new ErrorHandler("Produk tidak ditemukan", 404));
  //   }

  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });

  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return next(new ErrorHandler("produk tidak ditemukan", 404));
    // res.status(404).json({
    //   success: false,
    //   message: "Produk tidak ditemukan",
    // });
  }
};
