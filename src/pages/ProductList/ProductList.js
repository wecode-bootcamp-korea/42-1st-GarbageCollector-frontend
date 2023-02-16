import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://10.58.52.135:3000/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setProductList(data.data));
  }, []);

  return (
    <div className="product-page-container">
      <header className="product-header">
        <h2 className="product-h2">
          전체 <sup>총 오조오억개 좀 안됨</sup>
        </h2>
        <p className="product-p">여기에 다 있지롱!</p>
      </header>
      <div className="products-box" />
      <div className="productListWrap">
        <div className="productList">
          {productList.map(product => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

const CATEGORY_TITLE = [
  {
    id: 1,
    title: '전체',
    subTitle: '총 오조오억개 좀 안됨',
    text: '여기에 다 있지롱!',
  },
  {
    id: 2,
    title: '머리',
    subTitle: '인싸가 되는 발걸음?',
    text: '진짜? 안써줄꺼야!?',
  },
  {
    id: 3,
    title: '상체',
    subTitle: '상체가 중요하지',
    text: '입어...줄꺼지?',
  },
  {
    id: 4,
    title: '하체',
    subTitle: '하체가 중요하지',
    text: '하~위~~',
  },
];
