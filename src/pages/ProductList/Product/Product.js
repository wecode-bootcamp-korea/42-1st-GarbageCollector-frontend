import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

const Product = ({ product }) => {
  const [productChange, setProductChange] = useState(false);
  const { productPic, useProductPic, productName, price, productAlt } = product;

  return (
    <div>
      <ul
        className="productWrap"
        onMouseOver={() => setProductChange(true)}
        onMouseOut={() => setProductChange(false)}
      >
        <li className="productBox">
          <Link to="#" />
          <img
            className="productPic"
            src={productChange ? useProductPic : productPic}
            alt={productAlt}
          />
          <div className="productInfo">
            <p className="productName">{productName}</p>
            <p className="productPrice">{price}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Product;
