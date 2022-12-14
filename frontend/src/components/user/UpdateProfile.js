import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button, Card, Container, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { clearError, loadUser, updateProfile } from "../../action/usersAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  // Konfigurasi aplikasi
  const Alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setNama(user.nama);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      Alert.success("Berhasil diperbarui");
      dispatch(loadUser());
      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, Alert, error, user, isUpdated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nama", nama);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <MetaData title="Update Profil" />
      <Container className="update-profile">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Header className="bg-primary text-center text-white">
                Perbarui Profil
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler} encType="multipart/form-data">
                  <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      id="name_field"
                      type="text"
                      name="nama"
                      placeholder="Masukan Nama Lengkap"
                      value={nama || ""}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      id="email_field"
                      type="email"
                      name="email"
                      placeholder="Masukan Email kamu"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <div className="d-flex align-items-center">
                      <div>
                        <figure className="avatar mr-3 item-rtl">
                          <img
                            src={avatarPreview}
                            className="rounded-circle"
                            alt="Avatar"
                          />
                        </figure>
                      </div>
                      <div className="custom-file">
                        <Form.Control
                          type="file"
                          name="avatar"
                          className="custom-file-input"
                          id="file-avatar"
                          accept="images/*"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <br />
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button
                          type="submit"
                          className="btn btn-login"
                          disabled={loading ? true : false}
                        >
                          Update
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProfile;
