import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProductDetail } from "../../action/productsAction";
import { Button, Col, Row, Modal, Carousel } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

// submit Review popup Using Modal from bootstrap modul

const ProductDetail = () => {
  // Pop-up Review product
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const alert = useAlert;
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(getProductDetail(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, params.id, alert, error]);

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
                    <span className="btn btn-outline-light minus">-</span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value="10"
                      readOnly
                    />
                    <span className="btn btn-outline-light plus">+</span>
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <Button type="button" className="btn btn-cart text-white">
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
                Status: {product.stok > 0 ? "Tersedia" : "Habis"}
              </Col>
              <hr />
              <Col>Detail : {product.deskripsi}</Col>
              <hr />
              <Col>Penjual : {product.penjual}</Col>
              <hr />
              <Col>
                <div className="btn-review-position">
                  <Button
                    type="button"
                    className="btn btn-review"
                    onClick={handleShow}
                  >
                    Beri Ulasan
                  </Button>
                </div>
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
                    <ul className="stars">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                    <textarea
                      name="review"
                      className="form-control mt-3"
                    ></textarea>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>
                      Batal
                    </Button>
                    <Button className="btn btn-review">Kirim</Button>
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

export default ProductDetail;
