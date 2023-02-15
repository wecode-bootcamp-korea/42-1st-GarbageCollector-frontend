import React, { useState, useEffect } from 'react';
// import { config } from '../../config';
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
    fetch('data/search.json', {})
      .then(response => response.json())
      .then(result => {
        setFilteredList(result);
      });
  };

  // console.log(filteredList);

  // const filterInputValue = filteredList.filter(search => {
  //   // console.log(typeof search.name);
  //   return (
  //     typeof search.name === 'string' &&
  //     (search.name.includes(userInput) || search.content.includes(userInput))
  //   );
  // });

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
    <div className="searchBarContainer">
      <div className="searchBarWrapper">
        <div className="searchBarHeader">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={onChangeInput}
            value={userInput}
          />
          <button onClick={onClickSearch}>1</button>
          <i className=" fa fa-light fa-magnifying-glass fa-2x" />
        </div>
        <div className="searchResultContainer">
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
