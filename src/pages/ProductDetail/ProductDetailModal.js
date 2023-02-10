import React from 'react';

const ProductDetailModal = props => {
  const { option, optionOpen } = props;

  return (
    <ul className="option-ul">
      <li onClick={optionOpen}>
        <button className="option-list">{option}</button>
      </li>
    </ul>
  );
};

export default ProductDetailModal;
