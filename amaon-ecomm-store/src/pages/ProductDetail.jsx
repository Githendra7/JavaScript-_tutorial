import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { CartContext } from '../context/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const constParams = useParams();
  const id = constParams.id;
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [quantity, setQuantity] = useState(1);
  
  // Find product by parsed integer ID
  const product = products.find((p) => p.id === Number(id));

  // Reset selected quantity to 1 when shifting detail page (e.g. user clicks related product)
  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0); // Scroll page back to top when product changes
  }, [id]);

  // If product code is invalid
  if (!product) {
    return (
      <div className="loading-box">
        <h3>⚠️ Collection Item Not Found</h3>
        <p style={{ marginTop: '10px' }}>The item ID does not exist in our catalog registry.</p>
        <button
          onClick={() => navigate('/products')}
          style={{
            marginTop: '20px',
            padding: '8px 24px',
            backgroundColor: '#0f0f11',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer'
          }}
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  // Handle Add to Cart submission
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`"${product.title}" (${quantity} unit${quantity > 1 ? 's' : ''}) has been added to your ShoppingCart!`);
  };

  // Convert numerical rating (1-5) into star character strings
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return filledStars + emptyStars;
  };

  // Find related products (within same category, excluding active product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="detail-container">
      {/* Breadcrumbs */}
      <Breadcrumbs category={product.category} productTitle={product.title} />

      {/* Main Detail Grid */}
      <div className="detail-layout">
        {/* Left Column: Large Image */}
        <div className="detail-img-box">
          <img
            src={product.image}
            alt={product.title}
            className="detail-img"
          />
        </div>

        {/* Middle Column: Details Info */}
        <div className="detail-info-box">
          <h2>{product.title}</h2>
          
          <div className="detail-rating-row">
            <span className="stars" style={{ fontSize: '15px' }}>{renderStars(product.rating)}</span>
            <span style={{ fontSize: '13px', color: '#2563eb', cursor: 'pointer', fontWeight: '500' }}>
              {(product.id * 17) + 12} customer reviews
            </span>
          </div>

          <div className="detail-price-box">
            <div className="detail-price-row">
              <span style={{ fontSize: '13px', color: '#71717a', marginRight: '5px' }}>Price:</span>
              <span className="detail-price">₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="delivery-badge" style={{ marginTop: '10px', fontSize: '12px' }}>
              {product.prime ? (
                <>
                  <span>Express</span> ✦ Premium Express Shipping. Complimentary return support active.
                </>
              ) : (
                'Eligible for Complimentary Shipping on orders over ₹2,999.'
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Description</h4>
            <p className="detail-description">{product.description}</p>
          </div>
        </div>

        {/* Right Column: Checkout Action Card */}
        <div className="detail-checkout-box">
          <div className="checkout-price">₹{(product.price * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          
          <div className="checkout-status">✓ Ready to Ship</div>
          <div style={{ fontSize: '12.5px', color: '#71717a', marginBottom: '15px', lineHeight: '1.4' }}>
            Sold and distributed by ShoppingCart.
          </div>

          {/* Quantity Selector */}
          <div className="checkout-quantity-row">
            <label htmlFor="qtySelect" style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Qty:</label>
            <select
              id="qtySelect"
              className="checkout-qty-select"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Actions */}
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            style={{ marginBottom: '10px' }}
          >
            Add to Cart
          </button>
          
          <button
            className="add-to-cart-btn-orange"
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
          >
            Buy Now
          </button>

          <div style={{
            fontSize: '11px',
            color: '#71717a',
            marginTop: '15px',
            textAlign: 'center',
            borderTop: '1px solid #cbd5e1',
            paddingTop: '12px'
          }}>
            🔒 Secure transaction details.
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3 className="home-section-title">👥 Related Products</h3>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {relatedProducts.map((relatedProd) => (
              <ProductCard key={relatedProd.id} product={relatedProd} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
