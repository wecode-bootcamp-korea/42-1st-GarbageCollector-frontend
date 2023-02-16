import React from 'react';
import { Link } from 'react-router-dom';

const NavCategory = ({ categoryName }) => {
  return (
    <li className="categories">
      <Link to="/pages/ProductList/ProductPage">{categoryName}</Link>
    </li>
  );
};

export default NavCategory;
