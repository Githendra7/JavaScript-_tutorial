import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ category, productTitle }) => {
  // Format category string for display
  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="breadcrumbs">
      <Link to="/" style={{ color: '#007185' }}>Home</Link>
      <span>&gt;</span>
      
      {category ? (
        <>
          <Link to={`/products?category=${category}`} style={{ color: '#007185' }}>
            {formatCategory(category)}
          </Link>
          {productTitle ? (
            <>
              <span>&gt;</span>
              <span style={{ color: '#565959' }}>{productTitle}</span>
            </>
          ) : null}
        </>
      ) : (
        <span style={{ color: '#565959' }}>All Products</span>
      )}
    </div>
  );
};

export default Breadcrumbs;
