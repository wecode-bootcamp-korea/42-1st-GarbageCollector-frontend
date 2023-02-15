import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavAside from './NavAside';

const NavRightWrap = ({ navrighticon }) => {
  const {
    cartIcon,
    searchIcon,
    searchAlt,
    castAlt,
    moreInfoIcon,
    moreIncoAlt,
  } = navrighticon;

  const [asideOpen, setAsideOpen] = useState(false);

  const showMoreInfo = () => {
    setAsideOpen(!asideOpen);
  };

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
      <button onClick={showMoreInfo} className="moreInfoBtn">
        <img className="moreInfoIcon" src={moreInfoIcon} alt={moreIncoAlt} />
      </button>
      {asideOpen && <NavAside />}
    </li>
  );
};

export default NavRightWrap;
