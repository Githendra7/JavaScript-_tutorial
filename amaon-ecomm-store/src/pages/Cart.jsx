import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Redirect to checkout path
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      {/* Left Column: Cart Items List */}
      <div className="cart-main">
        <div className="cart-title-row">
          <h1 className="cart-title">Your Cart</h1>
          {cart.length > 0 && <span className="cart-price-header">Price</span>}
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-message">
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Your ShoppingCart is empty.</h3>
            <p>Your cart is empty. Fill it with premium electronics, activewear, books, and high-end ceramics.</p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/products" className="cart-empty-shop-link">
                Browse Collections
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Product Thumbnail */}
                <div className="cart-item-img-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                </div>

                {/* Product Info */}
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  
                  <div className="cart-item-meta">
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Ready to Ship</span>
                    <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
                    <span>Collection: {item.category.toUpperCase()}</span>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="cart-item-actions">
                    <label htmlFor={`qty-${item.id}`} style={{ fontSize: '12px', color: '#71717a', fontWeight: '600' }}>Qty:</label>
                    <select
                      id={`qty-${item.id}`}
                      className="cart-qty-select"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>

                    <span style={{ color: '#cbd5e1' }}>|</span>
                    
                    <span
                      className="cart-delete-link"
                      onClick={() => {
                        removeFromCart(item.id);
                        alert(`Removed "${item.title}" from your cart!`);
                      }}
                    >
                      Remove
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="cart-item-price-col">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}

            {/* Subtotal row */}
            <div className="cart-subtotal-row">
              Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}): <span>₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Checkout Sidebar Panel */}
      {cart.length > 0 && (
        <aside className="cart-sidebar">
          <div className="cart-sidebar-summary">
            {/* Free shipping banner */}
            <div style={{
              fontSize: '12px',
              color: '#16a34a',
              marginBottom: '15px',
              borderBottom: '1px solid #cbd5e1',
              paddingBottom: '12px',
              lineHeight: '1.4'
            }}>
              ✓ Your order qualifies for <strong>Complimentary Premium Express Shipping</strong>. Select this at checkout.
            </div>

            <div className="cart-sidebar-total">
              Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}): <br />
              <span style={{ fontSize: '20px', color: '#9a3412', fontWeight: '700' }}>₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <button className="cart-checkout-btn" onClick={handleProceedToCheckout}>
              Checkout
            </button>
            
            <div style={{
              fontSize: '11px',
              color: '#71717a',
              marginTop: '15px',
              textAlign: 'center'
            }}>
              Secured Checkout. No payment details required.
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Cart;
