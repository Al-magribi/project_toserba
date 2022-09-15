const APIfeatures = require("../utilities/apiFeatures");
const asyncHandler = require("express-async-handler");
const catchError = require("../middlewares/catchError");
const ErrorHandler = require("../utilities/ErrorHandler");
const Product = require("../models/product");

// Menambahkan produk baru => Admin
// Creating product
exports.addNewProduct = catchError(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Mengupdate produk => Admin
// Updating product
exports.updateProduct = catchError(async (req, res) => {
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
});

// Menghapus produk => Admin
// Deleting product
exports.deleteProduct = catchError(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Berhasil dihapus",
  });
});

// Menampilkan seluruh produk => Client
// Showing products
exports.getProducts = catchError(async (req, res) => {
  // menentukan produk yang tampil ber halaman
  const productPerPage = 8;

  // fitur search menggunakan keyword nama produk, diharapkan seluruh produk yang memiliki huruf yang
  // sama akan muncul
  // url /api/toserba/produk?ketword="nama_produk"
  const apiFeatures = new APIfeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// Menampilan produk berdasarkan ID => Client
// Showing products based on Id
exports.productById = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  } else {
    return next(new ErrorHandler("Produk tidak ditemukan", 404));
  }
});
