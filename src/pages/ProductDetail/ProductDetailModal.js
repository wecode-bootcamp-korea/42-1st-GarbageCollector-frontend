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
      {/* <ul
      value={option.id}
      onClick={e => onSelect(e, option.id)}
      className="option-ul"
    ></ul> */}
      <li onClick={handleOption}>
        <button onClick={showOption} value={option.id} className="option-list">
          {option.optName}
        </button>
      </li>
    </ul>
  );
};

export default ProductDetailModal;
