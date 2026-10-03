import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useShop } from '../../context/ShopContext'

import productsData from '../../data/products.json'
import './ProductDetails.css'

const ProductDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { addToCart, toggleWishlist, isInWishlist } = useShop()

	const product =
		productsData.find(p => String(p.id) === id || p.slug === id) ||
		productsData[0]

	const [activeImage, setActiveImage] = useState(product.image)
	const [selectedColor, setSelectedColor] = useState(
		product.colors && product.colors.length > 0 ? product.colors[0] : null,
	)
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {
		setActiveImage(product.image)
		setSelectedColor(
			product.colors && product.colors.length > 0 ? product.colors[0] : null,
		)
		setQuantity(1)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [id, product])

	const isFavorited = isInWishlist(product.id)

	const handleBuyNow = () => {
		addToCart(product, quantity, selectedColor)
		navigate('/cart')
	}

	const galleryImages =
		product.gallery && product.gallery.length > 0
			? product.gallery
			: [product.image, product.image, product.image, product.image]

	const relatedProducts = productsData
		.filter(
			p =>
				p.id !== product.id &&
				(p.category === product.category || p.isFlashSale),
		)
		.slice(0, 4)

	const breadcrumbsList = [
		{ label: t('nav.home', 'Home'), path: '/' },
		{ label: product.category.toUpperCase(), path: '/#explore' },
		{ label: product.name },
	]

	return (
		<div className='product-details-page'>
			<Breadcrumbs items={breadcrumbsList} />

			<section className='container product-details-section'>
				<div className='product-details-main'>
					<div className='product-gallery'>
						<div className='gallery-thumbnails'>
							{galleryImages.map((imgUrl, index) => (
								<div
									key={index}
									className={`thumbnail-item ${activeImage === imgUrl ? 'active' : ''}`}
									onClick={() => setActiveImage(imgUrl)}
								>
									<img src={imgUrl} alt={`${product.name} ${index + 1}`} />
								</div>
							))}
						</div>

						<div className='gallery-main-view'>
							<img
								src={activeImage}
								alt={product.name}
								className='main-featured-img'
							/>
						</div>
					</div>

					<div className='product-info-column'>
						<h1 className='product-heading'>{product.name}</h1>

						<div className='product-review-stock-row'>
							<div className='rating-stars'>
								{[1, 2, 3, 4, 5].map(s => (
									<i
										key={s}
										className='fa-solid fa-star'
										style={{
											color:
												s <= Math.floor(product.rating || 5)
													? '#FFAD33'
													: '#D4D4D4',
											fontSize: '14px',
										}}
									></i>
								))}
							</div>
							<span className='reviews-text'>
								({product.reviewCount || 0}{' '}
								{t('productDetails.reviews', 'Reviews')})
							</span>
							<span className='stock-separator'>|</span>
							<span className='stock-status in-stock'>
								{t('productDetails.inStock', 'In Stock')}
							</span>
						</div>

						<div className='product-price-row'>
							<span className='current-price'>${product.price.toFixed(2)}</span>
							{product.originalPrice && (
								<span className='original-price'>
									${product.originalPrice.toFixed(2)}
								</span>
							)}
						</div>

						<p className='product-description-text'>{product.description}</p>

						<div className='details-divider'></div>

						{product.colors && product.colors.length > 0 && (
							<div className='variant-row'>
								<span className='variant-label'>
									{t('productDetails.colours', 'Colours:')}
								</span>
								<div className='color-swatches-list'>
									{product.colors.map((c, i) => (
										<button
											key={i}
											className={`color-picker-dot ${selectedColor === c ? 'active' : ''}`}
											style={{ backgroundColor: c }}
											onClick={() => setSelectedColor(c)}
											aria-label='Select color'
										/>
									))}
								</div>
							</div>
						)}

						<div className='product-purchase-row'>
							<div className='quantity-selector'>
								<button
									className='qty-btn'
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
								>
									-
								</button>
								<span className='qty-number'>{quantity}</span>
								<button
									className='qty-btn'
									onClick={() => setQuantity(quantity + 1)}
								>
									+
								</button>
							</div>

							<button
								className='btn-primary btn-buy-now'
								onClick={handleBuyNow}
							>
								{t('productDetails.buyNow', 'Buy Now')}
							</button>

							<button
								className={`product-wishlist-toggle ${isFavorited ? 'active' : ''}`}
								onClick={() => toggleWishlist(product)}
								aria-label='Wishlist'
							>
								<i
									className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}
									style={
										isFavorited
											? { color: '#DB4444', fontSize: '18px' }
											: { fontSize: '18px' }
									}
								></i>
							</button>
						</div>

						<div className='delivery-card'>
							<div className='delivery-row'>
								<div className='delivery-icon-box'>
									<i
										className='fa-solid fa-truck-fast'
										style={{ fontSize: '24px', color: '#000000' }}
									></i>
								</div>
								<div className='delivery-info-text'>
									<h4>
										{t('productDetails.freeDeliveryTitle', 'Free Delivery')}
									</h4>
									<p>
										{t(
											'productDetails.freeDeliveryDesc',
											'Enter your postal code for Delivery Availability',
										)}
									</p>
								</div>
							</div>

							<div className='delivery-card-divider'></div>

							<div className='delivery-row'>
								<div className='delivery-icon-box'>
									<i
										className='fa-solid fa-shield-halved'
										style={{ fontSize: '24px', color: '#000000' }}
									></i>
								</div>
								<div className='delivery-info-text'>
									<h4>
										{t('productDetails.returnDeliveryTitle', 'Return Delivery')}
									</h4>
									<p>
										{t(
											'productDetails.returnDeliveryDesc',
											'Free 30 Days Delivery Returns. Details',
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='related-items-section'>
					<div className='section-tag'>
						<span className='tag-indicator'></span>
						<span className='tag-text'>
							{t('productDetails.relatedItems', 'Related Item')}
						</span>
					</div>

					<div className='related-products-grid'>
						{relatedProducts.map(p => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default ProductDetails
