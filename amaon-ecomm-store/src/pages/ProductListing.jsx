import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductListing = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse Query Parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category') || 'all';
  const urlSearch = queryParams.get('search') || '';

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under1500', '1500to3000', '3000to5000', 'over5000'
  const [visibleCount, setVisibleCount] = useState(8); // load more quantity

  // Synchronize category state when URL query changes (e.g. user clicks header categories)
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setVisibleCount(8); // reset pagination when category changes
  }, [urlCategory]);

  // Synchronize search query reset when URL changes
  useEffect(() => {
    setVisibleCount(8);
  }, [urlSearch]);

  // Handle Category Filter Change
  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    setVisibleCount(8);
    
    // Build new query parameters
    const params = new URLSearchParams();
    if (catKey !== 'all') {
      params.set('category', catKey);
    }
    if (urlSearch) {
      params.set('search', urlSearch);
    }
    
    const searchStr = params.toString();
    navigate(`/products${searchStr ? '?' + searchStr : ''}`);
  };

  // Filter products based on URL parameters + page sidebar price filters
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Search Keyword Filter
    if (urlSearch) {
      const kw = urlSearch.toLowerCase();
      const inTitle = product.title.toLowerCase().includes(kw);
      const inDesc = product.description.toLowerCase().includes(kw);
      const inCat = product.category.toLowerCase().includes(kw);
      if (!inTitle && !inDesc && !inCat) {
        return false;
      }
    }

    // 3. Price Range Filter
    if (priceRange === 'under1500') {
      return product.price < 1500.00;
    } else if (priceRange === '1500to3000') {
      return product.price >= 1500.00 && product.price <= 3000.00;
    } else if (priceRange === '3000to5000') {
      return product.price > 3000.00 && product.price <= 5000.00;
    } else if (priceRange === 'over5000') {
      return product.price > 5000.00;
    }

    return true;
  });

  // Paginated visible products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <div className="listing-container">
      {/* Listing Content Wrapper */}
      <div style={{ width: '100%' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs category={selectedCategory === 'all' ? null : selectedCategory} />
        
        <div style={{ display: 'flex', gap: '30px', width: '100%', marginTop: '10px' }}>
          {/* Sidebar Filters */}
          <aside className="listing-sidebar">
            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="sidebar-title">Collections</h4>
              <div
                className={`filter-option ${selectedCategory === 'all' ? 'active' : ''}`}
                style={{ fontWeight: selectedCategory === 'all' ? '700' : '500', color: selectedCategory === 'all' ? '#2563eb' : '#18181b', fontSize: '13px', margin: '6px 0', cursor: 'pointer' }}
                onClick={() => handleCategoryChange('all')}
              >
                All Collections
              </div>
              {['electronics', 'fashion', 'home', 'books', 'fitness'].map((cat) => (
                <div
                  key={cat}
                  className={`filter-option ${selectedCategory === cat ? 'active' : ''}`}
                  style={{
                    fontWeight: selectedCategory === cat ? '700' : '500',
                    color: selectedCategory === cat ? '#2563eb' : '#71717a',
                    cursor: 'pointer',
                    paddingLeft: '8px',
                    margin: '6px 0',
                    fontSize: '13px'
                  }}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat === 'home' ? 'Home & Living' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </div>
              ))}
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="sidebar-title">Price Range</h4>
              {[
                { label: 'Any Price', key: 'all' },
                { label: 'Under ₹1,500', key: 'under1500' },
                { label: '₹1,500 to ₹3,000', key: '1500to3000' },
                { label: '₹3,000 to ₹5,000', key: '3000to5000' },
                { label: 'Over ₹5,000', key: 'over5000' }
              ].map((range) => (
                <label key={range.key} className="filter-option" style={{ margin: '6px 0' }}>
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === range.key}
                    onChange={() => {
                      setPriceRange(range.key);
                      setVisibleCount(8);
                    }}
                  />
                  <span style={{ fontSize: '13px' }}>{range.label}</span>
                </label>
              ))}
            </div>
            
            {/* Delivery filter label */}
            <div className="filter-group" style={{ fontSize: '13px' }}>
              <h4 className="sidebar-title">Shipping</h4>
              <label className="filter-option" style={{ cursor: 'not-allowed' }}>
                <input type="checkbox" checked disabled />
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓ Premium Express</span>
              </label>
              <p style={{ fontSize: '11px', color: '#71717a', marginTop: '5px', lineHeight: '1.4' }}>Complimentary express shipping active on selected catalogue items.</p>
            </div>
          </aside>

          {/* Listing Grid */}
          <section className="listing-content">
            <div className="listing-results-bar">
              <div>
                Showing {Math.min(filteredProducts.length, visibleCount)} of {filteredProducts.length} items
                {urlSearch && (
                  <span> for "<strong>{urlSearch}</strong>"</span>
                )}
              </div>
              <div style={{ fontSize: '12px' }}>
                Sort: <strong>Curated</strong>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px'
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>No Results Match Your Criteria</h3>
                <p style={{ color: '#71717a', fontSize: '13.5px', marginBottom: '20px' }}>Reset your search query or adjust your filters to view more items.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    navigate('/products');
                  }}
                  style={{
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
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Pagination */}
                {filteredProducts.length > visibleCount && (
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    Load More Items
                  </button>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
