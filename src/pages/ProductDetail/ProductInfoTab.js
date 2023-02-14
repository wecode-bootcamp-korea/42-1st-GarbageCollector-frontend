import React from 'react';
import './ProductInfoTab.scss';

const ProductInfoTab = info => {
  const { infoImg, infoAlt } = info;
  console.log(info);

  return <img src={infoImg} alt={infoAlt} />;
};

export default ProductInfoTab;
