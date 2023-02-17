import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavCategory = ({ categoryName }) => {
  const navigate = useNavigate();

  const goToProductList = () => {
    navigate(`/product`);
  };
  return (
    <li onClick={goToProductList} className="categories">
      {categoryName}
    </li>
  );
};

export default NavCategory;
