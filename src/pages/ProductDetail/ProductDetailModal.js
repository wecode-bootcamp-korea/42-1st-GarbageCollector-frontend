import React from 'react';

const ProductDetailModal = props => {
  const { option, onSelect, showOption, handleOption } = props;

  return (
    <ul
      value={option.id}
      onClick={e => onSelect(e, option.id)}
      className="option-ul"
    >
      <li onClick={handleOption}>
        <button onClick={showOption} value={option.id} className="option-list">
          {option.optName}
        </button>
      </li>
    </ul>
  );
};

export default ProductDetailModal;
