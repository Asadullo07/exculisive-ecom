import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import './QuickViewModal.css'

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useShop()
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(
        quickViewProduct.colors && quickViewProduct.colors.length > 0
          ? quickViewProduct.colors[0]
          : null
      )
      setQuantity(1)
    }
  }, [quickViewProduct])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeQuickView && closeQuickView()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeQuickView])

  if (!quickViewProduct) return null

  const product = quickViewProduct
  const isFavorited = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor)
    closeQuickView()
  }

  return (
    <div className="qv-overlay" onClick={closeQuickView}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close" onClick={closeQuickView} aria-label="Close">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="qv-content">
          {/* Image */}
          <div className="qv-image-wrap">
            <img src={product.image} alt={product.name} className="qv-image" />
          </div>

          {/* Info */}
          <div className="qv-info">
            <h2 className="qv-title">{product.name}</h2>

            {/* Rating */}
            <div className="qv-rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <i
                  key={i}
                  className="fa-solid fa-star"
                  style={{
                    color: i <= Math.floor(product.rating || 5) ? '#FFAD33' : '#D4D4D4',
                    fontSize: '13px',
                  }}
                />
              ))}
              <span className="qv-review-count">({product.reviewCount || 0} Reviews)</span>
            </div>

            {/* Price */}
            <div className="qv-prices">
              <span className="qv-price-current">${product.price}</span>
              {product.originalPrice && (
                <span className="qv-price-old">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="qv-badge-discount">-{product.discount}%</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="qv-description">{product.description}</p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="qv-colors">
                <span className="qv-label">Colour:</span>
                <div className="qv-color-swatches">
                  {product.colors.map((c, i) => (
                    <span
                      key={i}
                      className={`qv-color-dot ${selectedColor === c ? 'active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="qv-actions">
              <div className="qv-quantity">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <i className="fa-solid fa-minus" />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <i className="fa-solid fa-plus" />
                </button>
              </div>

              <button className="qv-btn-cart" onClick={handleAddToCart}>
                Add To Cart
              </button>

              <button
                className={`qv-btn-wishlist ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <i className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`} />
              </button>
            </div>

            <Link to={`/product/${product.id}`} className="qv-view-details" onClick={closeQuickView}>
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
