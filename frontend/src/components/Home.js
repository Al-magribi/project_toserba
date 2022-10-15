import React, { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../action/productsAction";
import Pagination from "react-js-pagination";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Home = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Filter by price
  const [harga, setHarga] = useState([1, 60000000]);

  // Filter by categories
  const [kategori, setKategori] = useState("");

  // Filter by rating
  const [rating, setRating] = useState(0);

  // Data from backend in redux store
  const {
    loading,
    products,
    error,
    productsCount,
    productPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  // Search Function
  const keyword = params.keyword;

  // Categories
  const kategories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, harga, kategori, rating));
  }, [dispatch, Alert, error, keyword, currentPage, harga, kategori, rating]);

  // pagination setCurrentPage
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // menghitung pagination untuk setiap filter
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"UMKM INDONESIA"} />
          <h1>Produk Terbaru</h1>
          {keyword ? (
            <>
              <Row>
                <Col sm={3} md={3} lg={3}>
                  <Slider
                    range
                    dots
                    step={2000000}
                    marks={{
                      1: "1",
                      2000000: "2jt",
                      4000000: "4jt",
                      6000000: "6jt",
                      8000000: "8jt",
                      10000000: "10jt",
                      12000000: "12jt",
                      14000000: "14jt",
                      16000000: "16jt",
                      18000000: "18jt",
                    }}
                    min={1}
                    max={18000000}
                    defaultValue={(1, 10000000)}
                    tipFormatter={(value) => `Rp ${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={harga}
                    onChange={(harga) => setHarga(harga)}
                  />
                  <hr className="my-5" />
                  <div className="mt-5">
                    <h4 className="mb-3">Kategori</h4>
                    <ul className="ps-0">
                      {kategories.map((kategori) => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={kategori}
                          onClick={() => setKategori(kategori)}
                        >
                          {kategori}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr className="my-3" />
                  <div className="mt-5">
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="ps-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{ width: `${star * 20}%` }}
                            ></div>
                          </div>
                          {kategori}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
                {products &&
                  products.map((product) => (
                    <Col
                      key={product._id}
                      sm={6}
                      md={4}
                      lg={3}
                      className="card-product"
                    >
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <Row>
              {products &&
                products.map((product) => (
                  <Col
                    key={product._id}
                    sm={6}
                    md={4}
                    lg={3}
                    className="card-product"
                  >
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
          )}
          <Row>
            {productPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={productPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={">"}
                  prevPageText={"<"}
                  firstPageText={"<<"}
                  lastPageText={">>"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </Row>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
