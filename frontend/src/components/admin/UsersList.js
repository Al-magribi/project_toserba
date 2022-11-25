import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getUsers,
  updateUser,
  userDetail,
} from "../../action/usersAction";
import MetaData from "../layouts/MetaData";
import * as GrIcons from "react-icons/gr";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { error, loading, users } = useSelector((state) => state.users);
  const { isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetail);

  // update user
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleShow = (id) => {
    dispatch(userDetail(id));

    setShow(true);
  };

  const handleClose = () => setShow(false);

  const updateHandler = (id) => {
    const formData = new FormData();
    formData.set("nama", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(id, formData));

    setShow(false);
  };

  useEffect(() => {
    dispatch(getUsers());

    if (error) {
      Alert.error("User tidak ditemukan");
    }

    if (isUpdated) {
      Alert.success("User berhasil di update");
      dispatch({ type: UPDATE_USER_RESET });
    }
    dispatch(clearError());
  }, [dispatch, error, Alert, isUpdated]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Nama",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.nama,
          email: user.email,
          role: user.role,
          action: (
            <div>
              <button
                className="btn btn-primary py-1 px-2 btn-action text-white"
                onClick={() => handleShow(user._id)}
              >
                <GrIcons.GrUpdate />
              </button>
              <button className="btn btn-danger py-1 px-2">
                <GrIcons.GrTrash />
              </button>
            </div>
          ),
        });
      });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"User"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="admin-screen">
          <Row>
            <Col>
              <MDBDataTable data={setUsers()} bordered striped hover />
            </Col>
          </Row>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{user && user.nama}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateHandler(user._id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default UsersList;
