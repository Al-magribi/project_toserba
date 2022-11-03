import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);

  // tombol +
  const increase = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= cartItems.map((item) => item.stock)) {
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

  return (
    <Fragment>
      <Row className="mt-5 nama-item-cart cart-screen">
        <Col lg={8}>
          {cartItems.length === 0 ? (
            <h2>Kosong nih, Belanja yuk</h2>
          ) : (
            <Fragment>
              <h6 className="mt-2 mb-4">
                Ada {cartItems.length} barang, bayar langsung yuk
              </h6>

              <ListGroup>
                {cartItems.map((item) => (
                  <Fragment>
                    <ListGroupItem key={item.product}>
                      <Row>
                        <Col>
                          <img
                            src={item.image}
                            alt={item.product}
                            width="100"
                            className="align-self-center text-center m-4"
                          />
                        </Col>
                        <Col className="align-self-center">{item.name}</Col>
                        <Col className="align-self-center text-center">
                          <NumericFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp "}
                          />
                        </Col>
                        <Col className="align-self-center text-center">
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
                        <Col className="align-self-center text-center" lg={1}>
                          <i class="fa-solid fa-trash-can fa-trash"></i>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </Fragment>
                ))}
              </ListGroup>
            </Fragment>
          )}
        </Col>
        <Col>
          <Card>
            <Card.Header>Pesanan</Card.Header>
            <Card.Body>
              <Row>
                <Col>Subtotal</Col>
                <Col>: {cartItems.length} Item</Col>
              </Row>
              <hr />
              <Row>
                <Col>Total Harga</Col>
                <Col>
                  :
                  <NumericFormat
                    value={cartItems.reduce(
                      (quantity, item) => quantity + item.quantity * item.price,
                      0
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" Rp "}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <div className="text-center">
                    <Button className="btn btn-out">Check Out</Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Cart;
