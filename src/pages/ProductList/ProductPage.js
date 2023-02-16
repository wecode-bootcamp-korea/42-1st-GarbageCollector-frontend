import React from 'react';
import ProductLists from './ProductList';
import './ProductPage.scss;';

const ProductPage = () => {
  return (
    <div className="product-page-container">
      <header className="product-header">
        <h2 className="product-h2">
          전체 <sup>총 오조오억개 좀 안됨</sup>
        </h2>
        <p className="product-p">여기에 다 있지롱!</p>
      </header>
      <div className="products-box">
        <ProductLists />
      </div>
    </div>
  );
};

export default ProductPage;
