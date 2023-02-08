import React from 'react';
import { Link } from 'react-router-dom';

const NavCategory = ({ navcategory }) => {
  const { categoryName } = navcategory;
  return (
    <li className="categories">
      <Link to="#">{categoryName}</Link>
    </li>
  );
};

export default NavCategory;
