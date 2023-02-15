import React, { useState } from 'react';
import './ProductOrder.scss';

const ProductOrderModal = ({ option, removeOrder }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  const { optionName, extraPrice, price } = option;

  const handlePlus = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleMinus = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  function quantityChange(e) {
    setProductQuantity(e.target.value);
  }

  return (
    <li className="buy-list">
      <h4>{optionName}</h4>
      <div className="buy-options">
        <div className="buy-quantity">
          <button onClick={handleMinus} className="btn-minus" />
          <input
            className="quantity-input"
            onChange={e => {
              quantityChange(e);
            }}
            type="number"
            value={productQuantity}
          />
          <button onClick={handlePlus} className="btn-plus" />
        </div>
        <p className="price">
          <span>{productQuantity * (extraPrice + price)}원</span>
        </p>
      </div>
      <button onClick={() => removeOrder(option.id)} className="btn-delete" />
    </li>
  );
};

export default ProductOrderModal;
