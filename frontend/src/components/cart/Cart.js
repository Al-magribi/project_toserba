import React, { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../action/cartAction";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // tombol +
  const increase = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) {
      return;
    } else {
      dispatch(addToCart(id, newQty));
    }
  };

  // tombol -
  const decrease = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty < 0) {
      return;
    } else {
      dispatch(addToCart(id, newQty));
    }
  };

  const removeHandler = (id) => {
    dispatch(removeItem(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="cart-screen">
      <MetaData title={"Keranjang"} />
      {cartItems.length === 0 ? (
        <h2>Kosong nih, Belanja yuk</h2>
      ) : (
        <Fragment>
          <h6>Ada {cartItems.length} barang, bayar langsung yuk</h6>
          <Row className="mt-3 mb-5 nama-item-cart">
            <Col xs={12} lg={8} className="mb-3">
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col>
                        <img
                          src={item.image}
                          alt={item.product}
                          width="150"
                          className="align-self-center text-center m-2"
                        />
                      </Col>
                      <Col className="align-self-center">
                        <Link
                          to={`/produk/${item.product}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {item.name}
                        </Link>
                      </Col>
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
                            onClick={() =>
                              decrease(item.product, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-outline-light plus"
                            onClick={() =>
                              increase(item.product, item.quantity, item.stock)
                            }
                          >
                            +
                          </span>
                        </div>
                      </Col>
                      <Col className="align-self-center text-center" lg={1}>
                        <div className="btn">
                          <i
                            className="fa-solid fa-trash-can fa-trash"
                            onClick={() => removeHandler(item.product)}
                          ></i>
                        </div>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} lg={4}>
              <Card>
                <Card.Header>Pesanan</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col>
                      :{" "}
                      {cartItems.reduce(
                        (quantity, item) => quantity + Number(item.quantity),
                        0
                      )}{" "}
                      Item
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>Total Harga Item</Col>
                    <Col>
                      :
                      <NumericFormat
                        value={cartItems.reduce(
                          (quantity, item) =>
                            quantity + item.quantity * item.price,
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
                        <LinkContainer to="/shipping">
                          <Button
                            className="btn btn-out"
                            onClick={checkoutHandler}
                          >
                            Check Out
                          </Button>
                        </LinkContainer>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
