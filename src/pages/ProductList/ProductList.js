import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product/Product';
import './ProductList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const goToDetail = id => {
    navigate(`/products/${id}`);
  };

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
      {/* <ProductCategory /> */}
      <div className="products-box">
        <div className="productListWrap">
          <div className="productList">
            {productList.map(product => (
              <Product
                key={product.productId}
                product={product}
                goToDetail={goToDetail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
