import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchItems = ({ list, handleSearchBarOn }) => {
const SearchItems = ({ list }) => {
  // const navigate = useNavigate();

  // const goDetail = e => x{
  //   navigate(`/goods/${list.product_id}`);
  //   handleSearchBarOn();
  // };
  console.log(list);
  return (
    // <div className="searchResult" onClick={goDetail}>
    <div className="searchResult">
      <img src={list.mainImage} alt={list.mainImage} />
      <h2>{list.name}</h2>
    </div>
  );
};

export default SearchItems;