import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const navigate = useNavigate();

  // Get a subset of products for showcasing (e.g., first 4 top products)
  const trendingProducts = products.filter((p) => p.rating === 5).slice(0, 4);

  // Category mapping
  const categoryHighlights = [
    {
      name: 'Electronics',
      key: 'electronics',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop',
      desc: 'Explore high-tech gadgets, mechanical keyboards, headphones, and more.'
    },
    {
      name: 'Fashion & Style',
      key: 'fashion',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop',
      desc: 'Upgrade your look with bags, shoes, polarized aviator sunglasses, and slim wallets.'
    },
    {
      name: 'Home & Living',
      key: 'home',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop',
      desc: 'Charming handcrafted ceramic mugs, calmy lavender candles, and precision knives.'
    },
    {
      name: 'Books & Stationery',
      key: 'books',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop',
      desc: 'Gothic fiction novels, self-improvement bestsellers, and dotted journals.'
    }
  ];

  return (
    <div className="home-container">
      {/* Static Hero Banner */}
      <div style={{ position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop"
          alt="Mega Sale Hero Banner"
          className="hero-banner"
        />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          color: '#ffffff',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          zIndex: 20
        }}>
          <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '10px', letterSpacing: '1px' }}>ShoppingCart Collections</h1>
          <p style={{ fontSize: '16px', fontWeight: '500', maxWidth: '80%' }}>Discover premium tools, modern essentials, high-grade electronics, and curated journals. Complimentary shipping included.</p>
        </div>
      </div>

      {/* Home Content Overlay */}
      <div className="home-content">
        {/* Category Cards Section */}
        <div className="category-cards-grid">
          {categoryHighlights.map((cat) => (
            <div key={cat.key} className="category-card">
              <h3 className="category-card-title">{cat.name}</h3>
              <img
                src={cat.image}
                alt={cat.name}
                className="category-card-img"
              />
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px', lineHeight: '1.4' }}>{cat.desc}</p>
              <div
                className="category-card-link"
                onClick={() => navigate(`/products?category=${cat.key}`)}
              >
                Explore Collection →
              </div>
            </div>
          ))}
        </div>

        {/* Top-Rated Products Section */}
        <h2 className="home-section-title">⭐ Handpicked Customer Favorites</h2>
        <div className="product-grid">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Promotional Box */}
        <div style={{
          backgroundColor: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '40px 20px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h3 style={{ color: '#0f0f11', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>✦ The Activewear Collection</h3>
          <p style={{ fontSize: '13.5px', color: '#475569', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
            Elevate your personal fitness rituals with our premium yoga mats, heavy-duty neoprene hex dumbbells, and ventilated sports duffels.
          </p>
          <button
            onClick={() => navigate('/products?category=fitness')}
            style={{
              padding: '10px 30px',
              backgroundColor: '#0f0f11',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#27272a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0f0f11'}
          >
            Browse Activewear & Gear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
