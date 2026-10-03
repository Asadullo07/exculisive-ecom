import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import productsData from '../../data/products.json';
import './Wishlist.css';

const Wishlist = () => {
  const { t } = useTranslation();
  const { wishlist, moveAllToBag, toggleWishlist } = useShop();

  const justForYouProducts = productsData
    .filter(p => !wishlist.some(w => w.id === p.id))
    .slice(0, 4);

  return (
    <div className="wishlist-page container">
      
      <div className="wishlist-header-row">
        <h2 className="wishlist-title">
          {t('wishlist.title', 'Wishlist')} ({wishlist.length})
        </h2>
        {wishlist.length > 0 && (
          <button className="btn-secondary" onClick={moveAllToBag}>
            {t('wishlist.moveAll', 'Move All To Bag')}
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist-box">
          <p>{t('wishlist.emptyWishlist', 'Your wishlist is empty.')}</p>
          <Link to="/" className="btn-primary">
            {t('footer.shop', 'Explore Products')}
          </Link>
        </div>
      ) : (
        <div className="wishlist-products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showTrash={true}
              onTrashClick={() => toggleWishlist(product)}
            />
          ))}
        </div>
      )}

      <div className="just-for-you-section">
        <div className="just-for-you-header">
          <div className="section-tag">
            <span className="tag-indicator"></span>
            <span className="tag-text">{t('wishlist.justForYou', 'Just For You')}</span>
          </div>
          <Link to="/" className="btn-secondary">
            {t('wishlist.seeAll', 'See All')}
          </Link>
        </div>

        <div className="wishlist-products-grid">
          {justForYouProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
