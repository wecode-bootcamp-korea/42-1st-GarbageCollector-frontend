import React from 'react';
import './ProductDetailModal.scss';

const ProductDetailModal = props => {
  const { option, onSelect, showOption } = props;

  const optionId = option.productOptionId;

  const getOption = e => {
    const selectedId = Number(e.target.value);

    if (selectedId === optionId) {
      onSelect(option);
    }
  };

  return (
    <ul value={optionId} onClick={getOption} className="option-ul">
      <li>
        <button onClick={showOption} value={optionId} className="option-list">
          {option.productOptionName}
        </button>
      </li>
    </ul>
  );
};

export default ProductDetailModal;
