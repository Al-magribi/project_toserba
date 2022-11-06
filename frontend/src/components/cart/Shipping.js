import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const Shipping = () => {
  // List Provinsi
  const [province, setProvince] = useState([]);

  // list kota berdasarkan provinsi
  const [city, setCity] = useState([]);

  // Mendapatkan list seluruh prosinsi,
  // data diambil dari backend
  const getProvinces = async () => {
    const data = await fetch("/api/toserba/provinsi");
    const value = await data.json();
    const provinces = value.rajaongkir.results;
    setProvince(provinces.sort());
  };

  const getCities = async (value) => {
    const data = await fetch(`/api/toserba/kota/${value}`);
    const values = await data.json();
    const cities = values.rajaongkir.results;
    setCity(cities.sort());
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div>
      <Form.Select onChange={(e) => getCities(e.target.value)}>
        <option disabled="">-- Pilih Provinsi --</option>
        {province.map((data) => (
          <option key={data.province_id} value={data.province_id}>
            {data.province}
          </option>
        ))}
      </Form.Select>
      <Form.Select onChange={(e) => console.log(e.target.value)}>
        <option disabled="">-- Pilih Kota --</option>
        {city.map((data) => (
          <option key={data.city_id} value={data.city_id}>
            {data.city_name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Shipping;
