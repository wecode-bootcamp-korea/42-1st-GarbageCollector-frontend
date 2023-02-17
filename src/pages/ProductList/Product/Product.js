import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

const Product = ({ product }) => {
  const [productChange, setProductChange] = useState(false);
  const {
    mainImage,
    subImage,
    productName,
    discountPrice,
    description,
    price,
    goToDetail,
    productId,
  } = product;

  const productPrice = Math.floor(Number(price));
  const discountedPrice = Math.floor(Number(discountPrice));

  const discount = Math.floor(Number((price - discountPrice) / price) * 100);

  return (
    <div className="productWrap" onClick={() => goToDetail(productId)}>
      <ul
        className="product-ul"
        onMouseOver={() => setProductChange(true)}
        onMouseOut={() => setProductChange(false)}
      >
        <li className="productBox">
          <Link key={productId} to={`/products/${productId}`}>
            <img
              className="productPic"
              src={productChange ? subImage : mainImage}
              alt={description}
            />
            <div className="productInfo">
              <span className="product-discount-badge">
                <i>{discount} % SALE</i>
              </span>
              <p className="productName">{productName}</p>
              <p className="productPrice">
                <del>{productPrice}원</del>
                {discountedPrice}원
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Product;
