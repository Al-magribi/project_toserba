import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import * as GrIcons from "react-icons/gr";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteReview,
  getReviews,
} from "../../action/productsAction";
import { Col, Row, Form } from "react-bootstrap";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstant";

const Reviews = () => {
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }

    if (productId !== "") {
      dispatch(getReviews(productId));
    }

    if (isDeleted) {
      Alert.success("Review berhasil dihapus");
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    if (deleteError) {
      Alert.error("Review tidak berhasil dihapus");
      dispatch(clearError());
    }
  }, [Alert, dispatch, error, productId, isDeleted, deleteError]);

  const deleteHandler = (id) => {
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2"
            onClick={() => deleteHandler(review._id)}
          >
            <GrIcons.GrTrash />
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Product Reviews"} />
      <div className="mt-3">
        <Row>
          <Col className="d-flex justify-content-center text-center">
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Masukan id Produk</Form.Label>
                <Form.Control
                  type="text"
                  className="mb-5 w-100"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Reviews;
