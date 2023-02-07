import React, { useState } from 'react';
import './Product.scss';

const Product = ({ props }) => {
  const [productChange, setProductChange] = useState(false);
  const { productPic, useProductPic, productName, price, productAlt } = props;

  return (
    <ul>
      <li Link to="#">
        <img
          onMouseOver={() => setProductChange(true)}
          onMouseOut={() => setProductChange(false)}
          className="itemPicture"
          src={productChange ? { useProductPic } : { productPic }}
          alt={productAlt}
        />
        <span className="productName">{productName}</span>
        <span className="productPrice">{price}</span>
      </li>
    </ul>
  );
};

export default Product;
