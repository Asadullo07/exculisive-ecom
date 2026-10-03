import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useShop } from '../../context/ShopContext';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { cartCount, wishlist, user, logoutUser, searchQuery, setSearchQuery } = useShop();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'uz', label: "O'zbekcha" },
    { code: 'ru', label: 'Русский' }
  ];

  const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="header-wrapper">
      <div className="top-header">
        <div className="container top-header-container">
          <div className="top-header-left"></div>
          <div className="top-header-center">
            <span className="announcement-text">{t('topHeader.announcement')}</span>
            <Link to="/#flash-sales" className="shop-now-link">
              {t('topHeader.shopNow')}
            </Link>
          </div>
          <div className="top-header-right">
            <button
              className="lang-selector-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              type="button"
            >
              <span>{currentLangLabel}</span>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '11px', color: '#FFFFFF' }}></i>
            </button>

            {isLangOpen && (
              <div className="lang-dropdown">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option ${i18n.language === l.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(l.code)}
                    type="button"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="main-navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-logo">
            Exclusive
          </Link>

          <nav className="nav-links">
            <NavLink to="/" className="nav-link" end>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              {t('nav.contact')}
            </NavLink>
            <NavLink to="/about" className="nav-link">
              {t('nav.about')}
            </NavLink>
            {!user ? (
              <NavLink to="/signup" className="nav-link">
                {t('nav.signUp')}
              </NavLink>
            ) : (
              <NavLink to="/account" className="nav-link">
                {t('account.myProfile')}
              </NavLink>
            )}
          </nav>

          <div className="navbar-actions">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search" className="search-btn">
                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '16px' }}></i>
              </button>
            </form>

            <Link to="/wishlist" className="action-icon-btn" aria-label="Wishlist">
              <i className="fa-regular fa-heart" style={{ fontSize: '20px', color: '#000000' }}></i>
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>

            <Link to="/cart" className="action-icon-btn" aria-label="Cart">
              <i className="fa-solid fa-cart-shopping" style={{ fontSize: '20px', color: '#000000' }}></i>
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>

            {user ? (
              <div className="user-menu-wrapper">
                <button
                  className={`user-avatar-btn ${isUserMenuOpen ? 'active' : ''}`}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  type="button"
                >
                  <i className="fa-regular fa-user" style={{ fontSize: '16px', color: '#FFFFFF' }}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown-menu">
                    <Link to="/account" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <i className="fa-regular fa-user"></i>
                      <span>{t('nav.myAccount')}</span>
                    </Link>
                    <Link to="/account" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <i className="fa-solid fa-bag-shopping"></i>
                      <span>{t('nav.myOrder')}</span>
                    </Link>
                    <Link to="/account" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <i className="fa-regular fa-circle-xmark"></i>
                      <span>{t('nav.myCancellations')}</span>
                    </Link>
                    <Link to="/account" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <i className="fa-regular fa-star"></i>
                      <span>{t('nav.myReviews')}</span>
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout} type="button">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-link-btn">
                {t('nav.logIn')}
              </Link>
            )}

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
            >
              {isMobileMenuOpen ? (
                <i className="fa-solid fa-xmark" style={{ fontSize: '24px' }}></i>
              ) : (
                <i className="fa-solid fa-bars" style={{ fontSize: '24px' }}></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '16px' }}></i>
            </button>
          </form>

          <nav className="mobile-nav-links">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.home')}
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.about')}
            </Link>
            {user ? (
              <>
                <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('account.myProfile')}
                </Link>
                <button className="mobile-logout" onClick={handleLogout} type="button">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.signUp')}
                </Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.logIn')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
