import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../action/usersAction";

const ProtectedRoute = ({ children, isAdmin }) => {
  // ambil data dari state
  const {
    authenticatedUser = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [authenticatedUser, loading, dispatch, user]);

  if (loading) return <h1>loading...</h1>;

  if (!loading && authenticatedUser) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default ProtectedRoute;
