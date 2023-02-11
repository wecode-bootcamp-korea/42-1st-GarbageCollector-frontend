import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Main from './pages/Main/Main';
import Carousel from './components/Carousel/Carousel';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ProductList from './pages/ProductList/ProductList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Carousel />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/product/detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
