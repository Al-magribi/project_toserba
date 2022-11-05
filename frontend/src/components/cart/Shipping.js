import React, { useEffect, useState } from "react";
import Select from "react-select";

const Shipping = () => {
  // List Provinsi
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState();

  // list kota berdasarkan provinsi
  const [city, setCity] = useState([]);

  // Mendapatkan list seluruh prosinsi,
  // data diambil dari backend
  const getProvinces = async () => {
    const data = await fetch("/api/toserba/provinsi");
    const value = await data.json();
    const provinces = value.rajaongkir.results.map((data) => {
      return {
        value: data.province_id,
        label: data.province,
      };
    });
    setProvince(provinces.sort());
  };

  const idHandler = (value) => {
    setIdProvince(value);
  };

  const getProvinceId = async () => {
    const data = await fetch(`/api/toserba/kota/${idProvince}`);
    const value = await data.json();
    const cities = value.rajaongkir.results.map((data) => {
      return {
        value: data.city_id,
        label: data.city_name,
      };
    });
    setCity(cities.sort());
  };

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <div>
      {<Select options={province} onChange={(e) => idHandler(e.value)} />}
      <hr />
      <span className="btn" onClick={() => getProvinceId()}>
        pilih provinsi
      </span>
      <hr />
      {<Select options={city} />}
    </div>
  );
};

export default Shipping;
