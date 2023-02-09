import React from 'react';

const ProductDetailModal = () => {
  const optionClose = setOptionOpen => {
    setOptionOpen(false);
  };
  return (
    <div>
      <button onClick={optionClose}>진짜 보기만 하기</button>
      <button onClick={optionClose}>간김에 호텔도 추가하기</button>
    </div>
  );
};

export default ProductDetailModal;
