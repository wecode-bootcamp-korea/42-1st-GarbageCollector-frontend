import React, { useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import '../Search/Search.scss';

const Search = () => {
  const [userInput, setUserInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);

  const onChangeInput = e => {
    setUserInput(e.target.value);
  };

  const onClickSearch = e => {
    fetch(`http://10.58.52.227:3000/search/?keyword=${userInput}`, {})
      .then(response => response.json())
      .then(({ data }) => {
        if (userInput === '') setFilteredList([]);
        else setFilteredList(data);
      });
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-bar-header">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={onChangeInput}
            value={userInput}
          />
          <button onClick={onClickSearch}>
            <img alt="search" src="images/search.png" />
          </button>
        </div>
        <div className="search-result-container">
          {/* {console.log(filteredList)} */}

          {filteredList.length !== 0 ? (
            <ul>
              {filteredList.map(list => (
                <li key={list.productId}>
                  <SearchItem list={list} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="result-none">
              <li>띠용!</li>
              <li>일치하는 상품이 없습니다.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
