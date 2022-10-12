import React, { Fragment, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../action/productsAction";
import Pagination from "react-js-pagination";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return Alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, Alert, error]);

  return (
    <div className="home">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"UMKM INDONESIA"} />
          <h1>Produk Terbaru</h1>
          <Row>
            {products &&
              products.map((product) => (
                <Col
                  key={product._id}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  className="card-product"
                >
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
