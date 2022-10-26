import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/product/ProductDetail";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./action/usersAction";
import Profile from "./components/user/Profile";
import Orders from "./components/orders/Orders";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/produk/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/daftar" element={<Register />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/orders/me" element={<Orders />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
