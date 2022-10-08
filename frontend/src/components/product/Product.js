import React, { Fragment } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Fragment>
      <Col
        sm={6}
        md={6}
        lg={4}
        xl={3}
        key={product._id}
        className="card-product"
      >
        <Card style={{ width: "15rem" }}>
          <Card.Img variant="top" src={product.gambar[0].url} />
          <Card.Header>
            <h6>
              <Link className="card-title-home" to={`/produk/${product._id}`}>
                {product.nama}
              </Link>
            </h6>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{product.jmlReviews} Reviews</span>
              </div>
            </Card.Text>
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
                <Link className="details" to={`/produk/${product._id}`}>
                  Detail produk
                </Link>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default Product;
