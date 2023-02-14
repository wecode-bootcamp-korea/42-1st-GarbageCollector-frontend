import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchItems = ({ list, handleSearchBarOn }) => {
  const navigate = useNavigate();

  const goDetail = e => {
    navigate(`/goods/${list.product_id}`);
    handleSearchBarOn();
  };

  return (
    <div className="searchResult" onClick={goDetail}>
      <img src={list.thumnail_url_1} alt="searchImg" />
      <img className="lastImg" src={list.thumnail_url_2} alt="searchImg" />
      <h2>{list.name}</h2>
    </div>
  );
};

export default SearchItems;
