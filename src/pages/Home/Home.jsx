import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import ProductCard from '../../components/ProductCard/ProductCard';
import ServicesPerks from '../../components/ServicesPerks/ServicesPerks';

import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

import './Home.css';

const categoryIcons = {
  phone: 'fa-solid fa-mobile-screen-button',
  computer: 'fa-solid fa-desktop',
  smartwatch: 'fa-solid fa-clock',
  camera: 'fa-solid fa-camera',
  headphones: 'fa-solid fa-headphones',
  gaming: 'fa-solid fa-gamepad'
};

const Home = () => {
  const { t } = useTranslation();

  const flashSwiperRef = useRef(null);
  const categorySwiperRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllExplore, setShowAllExplore] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);

  const flashSaleProducts = productsData.filter(p => p.isFlashSale);
  const bestSellerProducts = productsData.filter(p => p.isBestSeller);
  const exploreProducts = productsData.filter(p => p.isExplore);

  const displayedExplore = showAllExplore
    ? productsData
    : (activeCategory ? productsData.filter(p => p.category === activeCategory) : exploreProducts.slice(0, 8));

  const heroSlides = [
    {
      id: 1,
      brandIcon: <i className="fa-brands fa-apple" style={{ fontSize: '36px', color: '#FFFFFF' }}></i>,
      brandName: t('hero.iphoneTitle', 'iPhone 14 Series'),
      headline: t('hero.voucher', 'Up to 10% off Voucher'),
      shopLink: '/product/1',
      image: '/images/banners/hero-iphone.png'
    },
    {
      id: 2,
      brandIcon: null,
      brandName: 'Samsung Galaxy Series',
      headline: 'Next-Gen Ultra Display Up to 15% off',
      shopLink: '/product/3',
      image: '/images/banners/hero-iphone.png'
    },
    {
      id: 3,
      brandIcon: null,
      brandName: 'Pro Gaming Gear',
      headline: 'Ultimate Comfort & Speed Up to 25% off',
      shopLink: '/product/1',
      image: '/images/banners/hero-iphone.png'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(prev => (prev === catId ? null : catId));
  };

  return (
    <div className="home-page">
      <section className="hero-section container">
        <aside className="hero-sidebar">
          <ul className="category-list">
            {categoriesData.sidebarCategories.map((cat) => (
              <li
                key={cat.id}
                className="category-item"
                onMouseEnter={() => cat.hasSub && setHoveredCat(cat.id)}
                onMouseLeave={() => setHoveredCat(null)}
                onClick={() => handleCategorySelect(cat.id)}
              >
                <div className="category-link">
                  <span>{t(cat.nameKey)}</span>
                  {cat.hasSub && <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', color: '#000000' }}></i>}
                </div>

                {cat.hasSub && hoveredCat === cat.id && (
                  <div className="category-flyout">
                    <h5 className="flyout-title">{t(cat.nameKey)}</h5>
                    <ul>
                      {cat.subcategories.map((sub, i) => (
                        <li key={i}>
                          <a
                            href="#explore"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveCategory(cat.id);
                              document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="hero-slider-wrap">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            className="hero-swiper"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="hero-banner-slide">
                  <div className="hero-slide-info">
                    <div className="hero-brand-row">
                      {slide.brandIcon}
                      <span className="hero-brand-name">{slide.brandName}</span>
                    </div>
                    <h1 className="hero-slide-heading">{slide.headline}</h1>
                    <Link to={slide.shopLink} className="hero-slide-btn">
                      <span>{t('hero.shopNow', 'Shop Now')}</span>
                      <i className="fa-solid fa-arrow-right" style={{ color: '#FFFFFF', fontSize: '16px' }}></i>
                    </Link>
                  </div>
                  <div className="hero-slide-media">
                    <img src={slide.image} alt={slide.brandName} className="hero-slide-img" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="section container" id="flash-sales">
        <SectionHeader
          tag={t('flashSales.tag', "Today's")}
          title={t('flashSales.title', 'Flash Sales')}
          countdown={<CountdownTimer variant="flash" />}
          onPrev={() => flashSwiperRef.current?.slidePrev()}
          onNext={() => flashSwiperRef.current?.slideNext()}
        />

        <div className="flash-sales-slider">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              flashSwiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              540: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="products-swiper"
          >
            {flashSaleProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="section-center-btn">
          <button
            className="btn-primary"
            onClick={() => {
              document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('flashSales.viewAll', 'View All Products')}
          </button>
        </div>

        <div className="section-divider"></div>
      </section>

      <section className="section container">
        <SectionHeader
          tag={t('browseCategory.tag', 'Categories')}
          title={t('browseCategory.title', 'Browse By Category')}
          onPrev={() => categorySwiperRef.current?.slidePrev()}
          onNext={() => categorySwiperRef.current?.slideNext()}
        />

        <div className="browse-category-slider">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              categorySwiperRef.current = swiper;
            }}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              480: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 6 }
            }}
            className="category-swiper"
          >
            {categoriesData.browseCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <SwiperSlide key={cat.id}>
                  <div
                    className={`category-browse-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <i className={categoryIcons[cat.icon] || 'fa-solid fa-tag'}></i>
                    <span className="category-browse-name">{t(cat.nameKey)}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="section-divider"></div>
      </section>

      <section className="section container">
        <SectionHeader
          tag={t('bestSelling.tag', 'This Month')}
          title={t('bestSelling.title', 'Best Selling Products')}
          actionButton={
            <button
              className="btn-primary btn-sm"
              onClick={() => {
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('bestSelling.viewAll', 'View All')}
            </button>
          }
        />

        <div className="products-grid-4">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container promo-banner-section">
        <div className="music-experience-banner">
          <div className="music-banner-info">
            <span className="music-banner-tag">{t('musicBanner.category', 'Categories')}</span>
            <h2 className="music-banner-title">
              {t('musicBanner.title', 'Enhance Your Music Experience')}
            </h2>
            <CountdownTimer variant="circles" />
            <Link to="/product/5" className="btn-music-buy">
              {t('musicBanner.buyNow', 'Buy Now!')}
            </Link>
          </div>

          <div className="music-banner-media">
            <div className="glow-backdrop"></div>
            <img
              src="/images/banners/promo-speaker.png"
              alt="JBL Boombox Speaker"
              className="music-banner-img"
            />
          </div>
        </div>
      </section>

      <section className="section container" id="explore">
        <SectionHeader
          tag={t('exploreProducts.tag', 'Our Products')}
          title={t('exploreProducts.title', 'Explore Our Products')}
        />

        <div className="explore-products-grid">
          {displayedExplore.map((product) => (
            <ProductCard key={product.id} product={product} showColors={true} />
          ))}
        </div>

        <div className="section-center-btn">
          <button
            className="btn-primary"
            onClick={() => setShowAllExplore(!showAllExplore)}
          >
            {showAllExplore
              ? 'Show Less'
              : t('exploreProducts.viewAll', 'View All Products')}
          </button>
        </div>
      </section>

      <section className="section container">
        <SectionHeader
          tag={t('newArrival.tag', 'Featured')}
          title={t('newArrival.title', 'New Arrival')}
        />

        <div className="new-arrival-bento">
          <div className="bento-item bento-large">
            <img
              src="/images/bento/ps5.png"
              alt="PlayStation 5"
              className="bento-bg-img"
            />
            <div className="bento-overlay">
              <h3 className="bento-title">{t('newArrival.ps5Title')}</h3>
              <p className="bento-desc">{t('newArrival.ps5Desc')}</p>
              <Link to="/product/1" className="bento-link">
                {t('newArrival.shopNow', 'Shop Now')}
              </Link>
            </div>
          </div>

          <div className="bento-right-col">
            <div className="bento-item bento-wide">
              <img
                src="/images/bento/women.png"
                alt="Women Collections"
                className="bento-bg-img"
              />
              <div className="bento-overlay">
                <h3 className="bento-title">{t('newArrival.womenTitle')}</h3>
                <p className="bento-desc">{t('newArrival.womenDesc')}</p>
                <Link to="/product/6" className="bento-link">
                  {t('newArrival.shopNow', 'Shop Now')}
                </Link>
              </div>
            </div>

            <div className="bento-bottom-row">
              <div className="bento-item bento-small">
                <img
                  src="/images/bento/speakers.png"
                  alt="Speakers"
                  className="bento-bg-img"
                />
                <div className="bento-overlay">
                  <h3 className="bento-title">{t('newArrival.speakersTitle')}</h3>
                  <p className="bento-desc">{t('newArrival.speakersDesc')}</p>
                  <Link to="/product/5" className="bento-link">
                    {t('newArrival.shopNow', 'Shop Now')}
                  </Link>
                </div>
              </div>

              <div className="bento-item bento-small">
                <img
                  src="/images/bento/perfume.png"
                  alt="Perfume"
                  className="bento-bg-img"
                />
                <div className="bento-overlay">
                  <h3 className="bento-title">{t('newArrival.perfumeTitle')}</h3>
                  <p className="bento-desc">{t('newArrival.perfumeDesc')}</p>
                  <Link to="/product/13" className="bento-link">
                    {t('newArrival.shopNow', 'Shop Now')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesPerks />

      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up" style={{ fontSize: '18px' }}></i>
      </button>
    </div>
  );
};

export default Home;

