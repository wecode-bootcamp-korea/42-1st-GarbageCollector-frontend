import React, { useState, useEffect } from 'react';
import { config } from '../../config';
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
    fetch(`http://10.58.52.224:3000/search/?keyword=${userInput}`, {})
      .then(response => response.json())
      .then(({ data }) => {
        setFilteredList(data);
      });
  };

  useEffect(() => {
    setSearchToggle(false);
  }, [searchToggle]);

  // useEffect(() => {
  //   fetch(`${config.search}?search=${userInput}`, {})
  //     .then(response => response.json())
  //     .then(result => {
  //       setFilteredList(result.searched_products);
  //     });
  // }, [userInput]);

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
          <button onClick={onClickSearch}>1</button>
          <i className=" fa fa-light fa-magnifying-glass fa-2x" />
        </div>
        <div className="search-result-container">
          {filteredList.map(list => {
            return filteredList ? (
              <SearchItem key={list.id} list={list} />
            ) : (
              <p>텅 비었누</p>
            );
          })}
        </div>
        <i className="fa fa-duotone fa-xmark fa-2x" onClick={onClickSearch} />
      </div>
    </div>
  );
};

export default Search;
