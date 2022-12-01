import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  updateProduct,
  getProductDetail,
} from "../../action/productsAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productsConstant";
import MetaData from "../layouts/MetaData";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [prevImg, setPrviewImg] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [weight, setWeight] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Alert = useAlert();
  const params = useParams();

  const { error: updateError, loading, isUpdated } = useSelector(
    (state) => state.product
  );
  const { error, product } = useSelector((state) => state.productDetail);
  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setName(product.nama);
      setPrice(product.harga);
      setDes(product.deskripsi);
      setCategory(product.ketegori);
      setStock(product.stok);
      setSeller(product.penjual);
      setOldImage(product.gambar);
      setWeight(product.berat);
    }

    if (isUpdated) {
      navigate("/admin/products");
      Alert.success("Product is updated");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      Alert.error(updateError);
      dispatch(clearError());
    }
  }, [
    error,
    Alert,
    dispatch,
    isUpdated,
    navigate,
    updateError,
    product,
    productId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nama", name);
    formData.set("harga", price);
    formData.set("deskripsi", des);
    formData.set("kategori", category);
    formData.set("penjual", seller);
    formData.set("stok", stock);
    formData.set("berat", weight);

    images.forEach((image) => {
      formData.append("gambar", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setPrviewImg([]);
    setImages([]);
    setOldImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPrviewImg((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Produk"} />
      <div className="admin-screen">
        <div className="container">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="row align-items-start">
              <div className="col-md-12 col-sm-6 col-lg-6">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Pilih Gambar
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={onChange}
                    multiple
                  />
                </div>
                {oldImage &&
                  oldImage.map((img) => (
                    <img
                      src={img.url}
                      key={img.url}
                      alt="Preview"
                      className="mt-3 mr-2"
                      width="250"
                      height="248"
                    />
                  ))}

                {prevImg.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Preview"
                    className="mt-3 mr-2"
                    width="250"
                    height="248"
                  />
                ))}
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="productName" className="from-label">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        id="productName"
                        className="form-control"
                        placeholder="Masukan nama produk"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="from-label">
                        Harga
                      </label>
                      <input
                        type="text"
                        id="price"
                        className="form-control"
                        placeholder="0000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="from-label">
                        Deskripsi Produk
                      </label>
                      <textarea
                        type="text"
                        id="description"
                        className="form-control"
                        placeholder="deskripsi"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="from-label">
                        Jenis Produk
                      </label>
                      <select
                        name="slecer"
                        id="category"
                        className="form-select"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Pilih Jenis Produk</option>
                        <option value="Electronics">Elektronik</option>
                        <option value="Cameras">Kamera</option>
                        <option value="Laptops">Laptop</option>
                        <option value="Accessories">Aksesoris</option>
                        <option value="Headphones">Smart Phone</option>
                        <option value="Food">Makanan / Minuman</option>
                        <option value="Clothes/Shoes">Fashion</option>
                        <option value="Beauty/Health">Kesehatan</option>
                        <option value="Sports">Sport</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Home">Rumah</option>
                        <option value="Others">Lainnya</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="seller" className="from-label">
                        Penjual
                      </label>
                      <input
                        type="text"
                        id="seller"
                        className="form-control"
                        placeholder="penjual"
                        value={seller}
                        onChange={(e) => setSeller(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="stock" className="from-label">
                        Stok
                      </label>
                      <input
                        type="text"
                        id="stock"
                        className="form-control"
                        placeholder="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="weight" className="from-label">
                        Berat
                      </label>
                      <input
                        type="text"
                        id="weight"
                        className="form-control"
                        placeholder="Satuan berat gram contoh: 1000"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="text-end">
                      <button
                        className="btn btn-primary"
                        disabled={loading ? true : false}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
