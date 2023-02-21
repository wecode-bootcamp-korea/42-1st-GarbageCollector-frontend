import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import Product from './Product/Product';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const goToDetail = id => {
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setProductList(data.data));
  }, []);

  return (
    <div className="product-page-container">
      <div className="product-list">
        {productList.map(product => (
          <Product
            key={product.productId}
            product={product}
            goToDetail={goToDetail}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
