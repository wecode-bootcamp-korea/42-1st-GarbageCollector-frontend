import React from 'react';
import './ProductInfoTab.scss';

const ProductInfoTab = ({ info }) => {
  const { imageUrl, infoAlt } = info;

  return (
    <li>
      <img className="detail-pic-box" src={imageUrl} alt={infoAlt} />
    </li>
  );
};

export default ProductInfoTab;
