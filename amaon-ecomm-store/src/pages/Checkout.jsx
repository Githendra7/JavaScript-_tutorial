import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cart, clearCart, totalPrice, totalItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local Form states
  const [formData, setFormData] = useState({
    fullName: user.isLoggedIn ? user.name : '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Order handler
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Generate a mock order number
    const mockOrderRef = 'SC-' + Math.floor(100000 + Math.random() * 900000);

    // Prompt receipt confirmation
    alert(
      `✧ Thank you, ${formData.fullName}!\n\n` +
      `Your order has been registered successfully with ShoppingCart!\n` +
      `Order Reference: #${mockOrderRef}\n\n` +
      `Items: ${totalItems}\n` +
      `Total Cost: ₹${totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n` +
      `Estimated Delivery: Tomorrow (ShoppingCart Premium Express Shipping)\n\n` +
      `A mock confirmation detail has been simulated.`
    );

    // Clear local storage cart state
    clearCart();

    // Redirect to home page
    navigate('/');
  };

  // If cart is empty, block checkout access
  if (cart.length === 0) {
    return (
      <div className="loading-box" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h3>🛒 Your Shopping Cart is Empty</h3>
        <p style={{ marginTop: '10px', color: '#71717a' }}>You cannot checkout with an empty cart. Please select some collections first!</p>
        <button
          onClick={() => navigate('/products')}
          style={{
            marginTop: '20px',
            padding: '10px 25px',
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
          Browse Collections
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmitOrder} className="checkout-layout">
        <h1 className="checkout-header">Secure Checkout</h1>

        {/* Section 1: Shipping Details */}
        <div className="form-section">
          <h3 className="form-section-title">1. Shipping Address</h3>
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-field full-width">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="First and Last name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Address */}
            <div className="form-field full-width">
              <label>Street Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street address, apartment, suite, unit"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* City */}
            <div className="form-field">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* State */}
            <div className="form-field">
              <label>State / Province / Region</label>
              <input
                type="text"
                name="state"
                placeholder="e.g. NY"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Zip */}
            <div className="form-field">
              <label>ZIP / Postal Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Country */}
            <div className="form-field">
              <label>Country / Region</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Payment Method */}
        <div className="form-section">
          <h3 className="form-section-title">2. Select Payment Method</h3>
          <div className="payment-options">
            <label className="payment-option-label">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => setPaymentMethod('creditCard')}
              />
              <div>
                <strong>Credit or Debit Card</strong>
                <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>ShoppingCart accepts Visa, Mastercard, AMEX, and Discover.</div>
              </div>
            </label>

            <label className="payment-option-label">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
              />
              <div>
                <strong>PayPal Express</strong>
                <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>Redirect to standard payment gateway.</div>
              </div>
            </label>

            <label className="payment-option-label">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <div>
                <strong>Cash on Delivery (COD) / Pay on Delivery</strong>
                <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>Hand currency notes directly to our courier agent upon delivery.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Summary breakdown */}
        <div className="checkout-summary-box">
          <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px' }}>Order summary</h4>
          <div className="checkout-summary-row">
            <span>Items Subtotal ({totalItems}):</span>
            <span>₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Premium Shipping:</span>
            <span style={{ color: '#16a34a', fontWeight: 'bold' }}>FREE</span>
          </div>
          <div className="checkout-summary-row total">
            <span>Order Total:</span>
            <span>₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Place Order Submit */}
        <button type="submit" className="place-order-btn">
          Confirm Place Order
        </button>

        <div style={{
          fontSize: '11px',
          color: '#71717a',
          textAlign: 'center',
          marginTop: '15px'
        }}>
          By confirming this purchase, you agree to ShoppingCart's mock terms and privacy conditions.
        </div>
      </form>
    </div>
  );
};

export default Checkout;
