import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../action/productsAction";
import { NumericFormat } from "react-number-format";

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
      <MetaData title={"UMKM INDONESIA"} />
      <h1>Produk Terbaru</h1>

      <Row>
        {products &&
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={product.gambar[0].url} />
                <Card.Header>
                  <h6>{product.nama}</h6>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{product.jmlReviews} Rating</Card.Text>
                  <Card.Text>
                    <NumericFormat
                      value={product.harga}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp "}
                    />
                  </Card.Text>
                  <div className="g-grip gap-2 text-center">
                    <Button
                      type="button"
                      size="sm"
                      className="btn-produk btn-outline-light text-white"
                    >
                      Detail produk
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Home;
