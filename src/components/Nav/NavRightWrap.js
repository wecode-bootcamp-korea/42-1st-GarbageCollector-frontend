import React from 'react';
import { Link } from 'react-router-dom';

const NavRightWrap = ({ navrighticon }) => {
  const {
    cartIcon,
    searchIcon,
    searchAlt,
    castAlt,
    moreInfoIcon,
    moreIncoAlt,
  } = navrighticon;

  return (
    <li className="navrights">
      <button className="navSearchIcon">
        <img className="navSearchIcon" src={searchIcon} alt={searchAlt} />
      </button>
      <Link to="#">
        <img className="navCartIcon" src={cartIcon} alt={castAlt} />
      </Link>
      <div className="navLogIn">
        <Link to="#">
          <span className="navLogInFont">로그인</span>
        </Link>
      </div>
      <button className="moreInfoBtn">
        <img className="moreInfoIcon" src={moreInfoIcon} alt={moreIncoAlt} />
      </button>
    </li>
  );
};

export default NavRightWrap;
