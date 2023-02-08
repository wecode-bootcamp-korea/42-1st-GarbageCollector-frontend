import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import NavCategory from './NavCategory';
import NavRightWrap from './NavRightWrap';

const Nav = () => {
  const [navCategories, setNavCategories] = useState([]);
  const [navRightLists, setNavRightLists] = useState([]);

  useEffect(() => {
    fetch('./data/navCategory.json')
      .then(response => response.json())
      .then(data => setNavCategories(data));
  }, []);

  useEffect(() => {
    fetch('./data/navRightWrap.json')
      .then(response => response.json())
      .then(data => setNavRightLists(data));
  }, []);
  return (
    <nav>
      <div className="navWrap">
        <Link to="#" />
        <img className="logo" src="/images/logo.png" alt="로고" />
        <ul className="categorywrap">
          {navCategories.map((navcategory, id) => {
            return <NavCategory key={id} navcategory={navcategory} />;
          })}
        </ul>
        <div className="nav-right-wrap">
          <ul className="navRightUl">
            {navRightLists.map((navrighticon, id) => {
              return <NavRightWrap key={id} navrighticon={navrighticon} />;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
