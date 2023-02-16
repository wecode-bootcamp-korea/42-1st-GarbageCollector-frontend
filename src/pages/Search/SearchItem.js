import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchItems = ({ list }) => {
  const navigate = useNavigate();

  const goDetail = e => {
    navigate(`/products/${list.productId}`);
  };

  return (
    <div className="searchResult" onClick={goDetail}>
      <img src={list.mainImage} alt={list.mainImage} />
      <h2>{list.name}</h2>
    </div>
  );
};

export default SearchItems;
