import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('/data/heinMock.json')
      .then(response => response.json())
      .then(data => setProductList(data));
  }, []);

  return (
    <div>
      {productList.map((product, id) => (
        <Product key={id} props={product} />
      ))}
    </div>
  );
};

export default ProductList;
