import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Handle click to detail page
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Handle Add to Cart button (stop navigation propagation)
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    alert(`"${product.title}" has been successfully added to your ShoppingCart!`);
  };

  // Convert numerical rating (1-5) into star character strings (e.g., 4 -> '★★★★☆')
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return filledStars + emptyStars;
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Product Image */}
      <div className="product-card-img-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="product-card-title" title={product.title}>
        {product.title}
      </div>

      {/* Ratings */}
      <div className="product-card-rating">
        <span className="stars">{renderStars(product.rating)}</span>
        <span className="rating-count">({(product.id * 17) + 12} reviews)</span>
      </div>

      {/* Price */}
      <div className="product-card-price-row">
        <span className="product-card-price-symbol">₹</span>
        <span className="product-card-price">{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
      </div>

      {/* Delivery Badge */}
      <div className="delivery-badge">
        {product.prime ? (
          <>
            <span>Express</span> ✦ Premium Express Shipping
          </>
        ) : (
          'Eligible for Free Standard Delivery'
        )}
      </div>

      {/* Add To Cart */}
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
