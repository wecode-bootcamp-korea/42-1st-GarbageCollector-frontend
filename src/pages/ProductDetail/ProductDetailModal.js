import React from 'react';
import './ProductDetailModal.scss';

const ProductDetailModal = props => {
  const { option, onSelect, showOption, handleOption } = props;

  const getOption = e => {
    const selectedId = Number(e.target.value);
    const optionId = option.id;

    if (selectedId === optionId) {
      onSelect(option);
    }
  };

  return (
    <ul value={option.id} onClick={getOption} className="option-ul">
      <li onClick={handleOption}>
        <button onClick={showOption} value={option.id} className="option-list">
          {option.productOptionName}
        </button>
      </li>
    </ul>
  );
};

export default ProductDetailModal;
