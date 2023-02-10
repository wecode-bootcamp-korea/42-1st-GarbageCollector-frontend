import React, { useState } from 'react';

const ProductOrderModal = () => {
  const [productQuantity, setProductQuantity] = useState(1);

  const handleMinus = () => {
    setProductQuantity(productQuantity - 1);
  };
  const handlePlus = () => {
    setProductQuantity(productQuantity + 1);
  };

  return (
    <div className="buy-list-box">
      <h4>상품이름</h4>
      <div className="buy-options">
        <div className="buy-quantity">
          <button onClick={handleMinus} className="btn-minus">
            -
          </button>
          <input type="number" />
          <button onClick={handlePlus} className="btn-plus">
            +
          </button>
        </div>
        <p>
          <span>가격</span>
        </p>
      </div>
      <button className="btn-delete" />
    </div>
  );
};

export default ProductOrderModal;
