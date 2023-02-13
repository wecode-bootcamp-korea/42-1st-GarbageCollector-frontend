import React, { useState } from 'react';

const ProductOrderModal = ({ option }) => {
  const [productQuantity, setProductQuantity] = useState([]);

  const { optName, addPrice, price, removeOrder } = option;

  // const handlePlus = cartId => {
  //   const orderlist = productQuantity.map(props => {
  //     if (cartId) return { ...props, quantity: quantity + 1 };
  //     else return props;
  //   });
  //   setProductQuantity(orderlist);
  // };

  // const handleMinus = cartId => {
  //   const orderlist = productQuantity.map(props => {
  //     if (cartId) return { ...props, quantity: quantity - 1 };
  //     else return props;
  //   });
  //   setProductQuantity(orderlist);
  // };

  function quantityChange(e) {
    setProductQuantity(e.target.value);
  }

  return (
    <li className="buy-list">
      <h4>{optName}</h4>
      <div className="buy-options">
        <div className="buy-quantity">
          <button className="btn-minus">-</button>
          <input
            className="quantity-input"
            onChange={e => {
              quantityChange(e);
            }}
            type="number"
            value={productQuantity}
          />
          <button className="btn-plus">+</button>
        </div>
        <p>
          <span>{addPrice + price}원</span>
        </p>
      </div>
      <button onClick={() => removeOrder(option.id)} className="btn-delete" />
    </li>
  );
};

export default ProductOrderModal;
