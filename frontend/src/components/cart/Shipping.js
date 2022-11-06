import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { NumericFormat } from "react-number-format";

const Shipping = () => {
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
    const berat = "1000";
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

  // set ongkir
  const endCosts = (value) => {
    setEndCost(value);
  };
  // sampai sini

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div className="shipping-screen">
      <MetaData title={"Informasi Pengiriman"} />
      <Container>
        <h5>Detail Pengiriman</h5>
        <Row>
          <Col lg={8}>
            <div>
              <span>Provinsi</span>
              <Form.Select onChange={(e) => getCities(e.target.value)}>
                <option disabled="">-- Pilih Provinsi --</option>
                {province.map((data) => (
                  <option key={data.province_id} value={data.province_id}>
                    {data.province}
                  </option>
                ))}
              </Form.Select>
              <br />

              <span>Kota</span>
              <Form.Select onChange={(e) => costHandler(e.target.value)}>
                <option disabled="">-- Pilih Kota --</option>
                {city.map((data) => (
                  <option key={data.city_id} value={data.city_id}>
                    {data.type} {data.city_name}
                  </option>
                ))}
              </Form.Select>
              <br />

              <span>Kurir</span>
              <Form.Select onChange={(e) => endCosts(e.target.value)}>
                <option disabled="">-- Pilih Kurir --</option>
                {ongkir.map((data) => (
                  <option key={data.service} value={data.cost[0].value}>
                    Layanan: {data.service} Estimasi: {data.cost[0].etd} Ongkir:
                    Rp {data.cost[0].value}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Header>Rincian Pembayaran</Card.Header>
              <Card.Body>
                <Row>
                  <Col>Harga item</Col>
                  <Col>Rp 1,500,000</Col>
                </Row>
                <hr />
                <Row>
                  <Col>Ongkir</Col>
                  <Col>
                    <NumericFormat
                      value={endCost}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={" Rp "}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>total</Col>
                  <Col>...</Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <div className="align-self-center text-center">
                      <span className="btn btn-login text-white">Bayar</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shipping;
