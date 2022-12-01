import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  //   pengaturan pencarian
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Form className="d-flex form-search" onSubmit={searchHandler}>
        <Form.Control
          type="search"
          placeholder="Cari produk ..."
          className="mx-auto search"
          aria-label="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="btn btn-light b-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </Form>
    </div>
  );
};

export default Search;
