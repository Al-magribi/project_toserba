import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  // Data user dari state
  const { user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <h1>Profile</h1>
      {user.nama}
    </Fragment>
  );
};

export default Profile;
