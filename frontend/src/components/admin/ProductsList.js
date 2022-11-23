import React, { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import {
  getAdminProducts,
  clearError,
  deleteProduct,
} from "../../action/productsAction";
import * as GrIcons from "react-icons/gr";
import { Col, Row } from "react-bootstrap";
import "./index.css";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstant";

const ProductsList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      Alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      Alert.success("Produk berhasil dihapus");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [Alert, dispatch, error, isDeleted, deleteError]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Nama Produk",
          field: "name",
          sort: "asc",
        },
        {
          label: "Harga",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stok",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };

    products &&
      products.forEach((product) => {
        data.rows.push({
          id: product._id,
          name: product.nama,
          price: (
            <NumericFormat
              value={product.harga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp "}
            />
          ),
          stock: product.stok,
          action: (
            <div>
              <Link
                to={`/admin/update/${product._id}`}
                className="btn btn-primary py-1 px-2 btn-action text-white"
              >
                <GrIcons.GrUpdate />
              </Link>
              <button
                className="btn btn-danger py-1 px-2 "
                onClick={() => deleteHandler(product._id)}
              >
                <GrIcons.GrTrash />
              </button>
            </div>
          ),
        });
      });
    return data;
  };

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"Produk"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin-screen">
          <Row>
            <Col>
              <MDBDataTable data={setProducts()} bordered striped hover />
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default ProductsList;
