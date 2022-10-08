import React, { Fragment, useEffect } from "react";
import { Row } from "react-bootstrap";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../action/productsAction";
import Product from "./product/Product";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <Fragment>
          <MetaData title={"UMKM INDONESIA"} />
          <h1>Produk Terbaru</h1>
          <Row>
            {products &&
              products.map((product) => <Product product={product} />)}
          </Row>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
