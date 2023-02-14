import React from 'react';
import './ProductInfoTab.scss';

const ProductInfoTab = ({ info }) => {
  const { infoImg, infoAlt } = info;

  return (
    <li>
      <img className="detail-pic-box" src={infoImg} alt={infoAlt} />
    </li>
  );
};

export default ProductInfoTab;
