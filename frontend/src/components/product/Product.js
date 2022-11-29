import React, { Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Fragment>
      <Row>
        <Col sm={6} md={4} lg={2} className="text-center">
          <Card style={{ width: "180px" }}>
            <Card.Img variant="top" src={product.gambar[0].url} />
            <Card.Header>
              <h6>
                <Link className="card-title-home" to={`/produk/${product._id}`}>
                  {product.nama}
                </Link>
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{product.jmlReviews} Ulasan</span>
              </div>
              <Card.Text>
                <NumericFormat
                  value={product.harga}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </Card.Text>
              <div className="g-grip gap-2 text-center">
                <Link to={`/produk/${product._id}`}>
                  <Button type="button" className="btn-produk text-white">
                    Detail produk
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Product;
