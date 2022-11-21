import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  createReview,
  getProductDetail,
} from "../../action/productsAction";
import { Button, Col, Row, Modal, Carousel } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { addToCart } from "../../action/cartAction";
import * as FaIcons from "react-icons/fa";

// submit Review popup Using Modal from bootstrap modul

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  // Pop-up Review product
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductDetail(params.id));
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, params.id, Alert, error]);

  // kirim produk ke cart
  const toCart = () => {
    dispatch(addToCart(params.id, quantity));
    Alert.success("Item berhasil ditambahkan");
  };

  // tombol +
  const increase = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stok) {
      return;
    } else {
      const qty = count.valueAsNumber + 1;
      setQuantity(qty);
    }
  };

  // tombol -
  const decrease = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) {
      return;
    } else {
      const qty = count.valueAsNumber - 1;
      setQuantity(qty);
    }
  };

  // Star in review & comment
  const stars = Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(undefined);

  const clickHandler = (value) => {
    setRating(value);
  };

  const mouseOver = (hoverColor) => {
    setHover(hoverColor);
  };

  const mouseOut = () => {
    setHover(undefined);
  };

  const submitHandler = () => {
    const data = new FormData();
    data.set("rating", rating);
    data.set("comment", comment);
    data.set("productId", params.id);

    dispatch(createReview(data));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.nama} />
          <Row className="detail-page">
            <Col sm={12} md={6}>
              <Carousel>
                {product.gambar &&
                  product.gambar.map((gambar) => (
                    <Carousel.Item key={gambar._id}>
                      <img
                        className="d-block w-100 detail-img"
                        src={gambar.url}
                        alt={product.nama}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col sm={12} md={6}>
              <h5>{product.nama}</h5>
              <small>produk id #{product._id}</small>
              <hr />
              <h3>
                <NumericFormat
                  value={product.harga}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </h3>
              <Row>
                <Col>
                  <div className="stockCounter d-inline text-center">
                    <span
                      className="btn btn-outline-light minus"
                      onClick={decrease}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={quantity}
                      readOnly
                    />
                    <span
                      className="btn btn-outline-light plus"
                      onClick={increase}
                    >
                      +
                    </span>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <Button
                      type="button"
                      className="btn btn-cart text-white"
                      onClick={toCart}
                      disabled={product.stok === 0}
                    >
                      + Keranjang
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <Button type="button" className="btn btn-buy text-white">
                      Beli Langsung
                    </Button>
                  </div>
                </Col>
              </Row>
              <hr />
              <Col className={product.stok > 0 ? "greenColor" : "redColor"}>
                Status: {product.stok > 0 ? "Tersedia" : "Habis"} {product.stok}{" "}
                item
              </Col>
              <hr />
              <Col>Detail : {product.deskripsi}</Col>
              <hr />
              <Col>Berat : {product.berat} gr</Col>
              <hr />
              <Col>Penjual : {product.penjual}</Col>
              <Col>
                {user ? (
                  <div className="btn-review-position">
                    <Button
                      type="button"
                      className="btn btn-review"
                      data-toggle="modal"
                      data-target="#ratingModal"
                      onClick={handleShow}
                    >
                      Beri Ulasan
                    </Button>
                  </div>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login untuk melihat dan memberikan review
                  </div>
                )}

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  className="kolom-review"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Kasih ulasan mu</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div style={style.container}>
                      <div style={style.stars}>
                        {stars.map((_, index) => {
                          return (
                            <FaIcons.FaStar
                              key={index}
                              size={80}
                              style={{ marginRight: 10, cursor: "pointer" }}
                              onClick={() => clickHandler(index + 1)}
                              onMouseOver={() => mouseOver(index + 1)}
                              color={
                                hover > index ? colors.orange : colors.grey
                              }
                              onMouseOut={mouseOut}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <textarea
                      name="review"
                      className="form-control mt-3"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>
                      Batal
                    </Button>
                    <Button className="btn btn-review" onClick={submitHandler}>
                      Kirim
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default ProductDetail;
