import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loadUser } from "./action/usersAction";
import Profile from "./components/user/Profile";
import Orders from "./components/orders/Orders";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Dashboard from "./components/admin/Dashboard";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import StatusPembayaran from "./components/cart/StatusPembayaran";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/produk/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/daftar" element={<Register />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/reset/:token" element={<NewPassword />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/orders/me" element={<Orders />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <StatusPembayaran />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
