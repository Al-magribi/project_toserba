import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { NumericFormat } from "react-number-format";
import Steps from "./Steps";
import { useAlert } from "react-alert";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const Alert = useAlert();

  // konfigurasi otomatisasi cek ongkir, dari sini
  // List Provinsi
  const [province, setProvince] = useState([]);

  // list kota berdasarkan provinsi
  const [city, setCity] = useState([]);

  // list ongkir
  const [ongkir, setOngkir] = useState([]);

  // hasil ongkir
  const [endCost, setEndCost] = useState("");

  // Mendapatkan list seluruh prosinsi,
  // data diambil dari backend
  const getProvinces = async () => {
    const data = await fetch("/api/toserba/provinsi");
    const value = await data.json();
    const provinces = value.rajaongkir.results;

    setProvince(provinces.sort());
  };

  // Menampilkan list seluruh kab & kota berdasarkan provinsi
  const getCities = async (value) => {
    const data = await fetch(`/api/toserba/kota/${value}`);
    const values = await data.json();
    const cities = values.rajaongkir.results;

    setCity(cities.sort());
  };

  // Menghitung ongkir ke tujuan pengiriman\
  const costHandler = async (value) => {
    const asal = "78";
    const tujuan = value;
    const berat = cartItems.reduce(
      (acc, item) => acc + Number(item.weight) * item.quantity,
      0
    );
    const kurir = "jne";

    if (asal !== "" && tujuan !== "" && berat !== "" && kurir !== "") {
      const data = await fetch(
        `/api/toserba/ongkos/${asal}/${tujuan}/${berat}/${kurir}`
      );
      const values = await data.json();
      const estOngkir = values.rajaongkir.results[0].costs;

      setOngkir(estOngkir);
    }
  };
  // sampai sini

  //   perhitungan harga
  const totalPrice = cartItems.reduce(
    (quantity, item) => quantity + item.quantity * item.price,
    0
  );

  const totalPayment = cartItems.reduce(
    (quantity, item) => quantity + item.quantity * item.price,
    Number(endCost)
  );

  const NumericEndCost = (
    <NumericFormat
      value={endCost}
      displayType={"text"}
      thousandSeparator={true}
      prefix={" Rp "}
    />
  );

  const proceedToPayment = () => {
    const data = {
      totalPrice,
      endCost,
      totalPayment,
    };

    if (endCost) {
      navigate("/payment");
      localStorage.setItem("orderInfo", JSON.stringify(data));
    } else {
      Alert.error("Ongkir belum ada");
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div className="confirm-screen">
      <MetaData title={"Konfirmasi Pesanan"} />
      <Steps shipping confirmOrder />
      <Row className="mb-5">
        <h3>Detail Pengiriman</h3>
        <Col>
          <Row>
            <Col xs={3} lg={2}>
              Nama
            </Col>
            <Col xs={9} lg={10}>
              : {user && user.nama}
            </Col>
          </Row>
          <Row>
            <Col xs={3} lg={2}>
              No HandPhone
            </Col>
            <Col xs={9} lg={10}>
              : {shippingInfo.phone}
            </Col>
          </Row>
          <Row>
            <Col xs={3} lg={2}>
              Alamat
            </Col>
            <Col xs={9} lg={10}>
              : {shippingInfo.address}
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <h3>Barang Yang di beli</h3>
        {cartItems.map((item) => (
          <div key={item.product}>
            <hr />
            <Row>
              <Col xs={3} lg={2} className="m-auto">
                <img
                  src={item.image}
                  alt={item.product}
                  width="80"
                  className="align-self-center text-center m-2"
                />
              </Col>
              <Col className="align-self-center" xs={3} lg={2}>
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
              <Col className="align-self-center text-center" xs={3} lg={1}>
                {item.quantity}
              </Col>
              <Col className="align-self-center" xs={3} lg={5}>
                <NumericFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              </Col>
            </Row>
            <hr />
          </div>
        ))}
      </Row>
      <br />
      <Row className="mt-5">
        <Col xs={12} lg={6} className="mb-3">
          <Card>
            <Card.Header>Pengiriman</Card.Header>
            <Card.Body>
              <span className="mb-1">Provinsi</span>
              <Form.Select onChange={(e) => getCities(e.target.value)}>
                <option disabled="">-- Pilih Provinsi --</option>
                {province.map((data) => (
                  <option key={data.province_id} value={data.province_id}>
                    {data.province}
                  </option>
                ))}
              </Form.Select>
              <hr />
              <span className="mb-1">Kota</span>
              <Form.Select onChange={(e) => costHandler(e.target.value)}>
                <option disabled="">-- Pilih Kota --</option>
                {city.map((data) => (
                  <option key={data.city_id} value={data.city_id}>
                    {data.type} {data.city_name}
                  </option>
                ))}
              </Form.Select>
              <hr />
              <span className="mb-1">Kurir</span>
              <Form.Select onChange={(e) => setEndCost(e.target.value)}>
                <option disabled="">-- Pilih Kurir --</option>
                {ongkir.map((data) => (
                  <option key={data.service} value={data.cost[0].value}>
                    Layanan: {data.service} Estimasi: {data.cost[0].etd} Ongkir:
                    Rp {data.cost[0].value}
                  </option>
                ))}
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
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
                <Col>Ongkir</Col>
                <Col>:{NumericEndCost}</Col>
              </Row>
              <hr />
              <Row>
                <Col>Total Harga Item</Col>
                <Col>
                  :
                  <NumericFormat
                    value={totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" Rp "}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>Total</Col>
                <Col>
                  :
                  <NumericFormat
                    value={totalPayment}
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
                    <Button className="btn btn-out" onClick={proceedToPayment}>
                      Proses Pembayaran
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmOrder;
