import React, { useState, useEffect } from 'react';
import Product from './Product/Product';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => setProductList(data));
  }, []);

  return (
    <div className="productListWrap">
      <div className="productList">
        {productList.map((product, id) => (
          <Product key={id} props={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
