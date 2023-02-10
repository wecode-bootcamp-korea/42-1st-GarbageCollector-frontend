import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

const Product = ({ product }) => {
  const [productChange, setProductChange] = useState(false);
  const { mainImage, subImage, productName, price, description } = product;

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
            src={productChange ? subImage : mainImage}
            alt={description}
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
