import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, createProducts } from "../../action/productsAction";
import { CREATE_PRODUCTS_RESET } from "../../constants/productsConstant";
import MetaData from "../layouts/MetaData";

const CreateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [prevImg, setPrviewImg] = useState([]);
  const [weight, setWeight] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Alert = useAlert();

  const { error, loading, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (success) {
      Alert.success("Produk berhasil ditambahkan");

      dispatch({ type: CREATE_PRODUCTS_RESET });

      navigate("/admin/tambah");

      window.location.reload(false);
    }
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, success, navigate]);

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

    dispatch(createProducts(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setPrviewImg([]);
    setImages([]);

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
      <MetaData title={"Tambah Produk"} />
      <div className="admin-screen">
        <h3>Tambah Produk</h3>
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
                        defaultValue={"DEFAULT"}
                      >
                        <option disabled value={"DEFAULT"}>
                          Pilih Jenis Produk
                        </option>
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
                        Create
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

export default CreateProducts;
