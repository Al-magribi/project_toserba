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
import OrderDetails from "./components/orders/OrderDetails";
import NoMatch from "./components/layouts/NoMatch";
import ProductsList from "./components/admin/ProductsList";
import CreateProducts from "./components/admin/CreateProducts";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import UsersList from "./components/admin/UsersList";
import Reviews from "./components/admin/Reviews";
import { useSelector } from "react-redux";

function App() {
  const { user, authenticatedUser, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="*" element={<NoMatch />} />
            {/* Login / Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/daftar" element={<Register />} />

            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route index path="/produk/:id" element={<ProductDetail />} />

            {/* User */}
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
            {/* Orders */}
            <Route
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
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
            {/* admin section */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tambah"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreateProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/update/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrdersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UsersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Reviews />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
        {!loading && (!authenticatedUser || user.role !== "admin") && (
          <Footer />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
