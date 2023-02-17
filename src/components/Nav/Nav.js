import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavCategory from './NavCategory';
import NavRightWrap from './NavRightWrap';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate(`/`);
  };

  return (
    <nav>
      <div className="nav-wrap">
        <img
          onClick={goToMain}
          className="logo"
          src="/images/newLogo.png"
          alt="로고"
        />
        <ul className="categorywrap">
          {NAV_CATEGORIES.map(navcategory => {
            return (
              <NavCategory
                key={navcategory.id}
                categoryName={navcategory.name}
              />
            );
          })}
        </ul>
        <div className="nav-right-wrap">
          <ul className="navRightUl">
            {NAV_RIGHT.map(navrighticon => {
              return (
                <NavRightWrap
                  key={navrighticon.id}
                  navrighticon={navrighticon}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

const NAV_CATEGORIES = [
  {
    id: 1,
    name: '전체',
  },
  {
    id: 2,
    name: '머리',
  },
  {
    id: 3,
    name: '상체',
  },
  {
    id: 4,
    name: '하체',
  },
];

const NAV_RIGHT = [
  {
    id: 1,
    searchIcon: '/images/search.png',
    searchAlt: '검색',
    cartIcon: '/images/cart.png',
    castAlt: '장바구니',
    moreInfoIcon: '/images/moreInfo.png',
    moreIncoAlt: '더보기',
  },
];
