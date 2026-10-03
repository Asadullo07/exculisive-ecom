import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import './ProductCard.css'

const ProductCard = ({
	product,
	showTrash = false,
	onTrashClick = null,
	showColors = false,
}) => {
	const { t } = useTranslation()
	const { addToCart, toggleWishlist, isInWishlist } = useShop()

	const [selectedColor, setSelectedColor] = useState(
		product.colors && product.colors.length > 0 ? product.colors[0] : null,
	)

	const isFavorited = isInWishlist(product.id)

	const handleAddToCart = e => {
		e.preventDefault()
		e.stopPropagation()
		addToCart(product, 1, selectedColor)
	}

	const handleToggleWishlist = e => {
		e.preventDefault()
		e.stopPropagation()
		toggleWishlist(product)
	}

	return (
		<div className='product-card'>
			<div className='product-card-top'>
				<div className='product-badges'>
					{product.discount && (
						<span className='badge badge-discount'>-{product.discount}%</span>
					)}
					{product.isNew && (
						<span className='badge badge-new'>{t('common.new', 'NEW')}</span>
					)}
				</div>

				<div className='product-actions-float'>
					{showTrash ? (
						<button
							className='action-circle-btn'
							onClick={onTrashClick || handleToggleWishlist}
							title='Remove'
							aria-label='Remove item'
						>
							<i className='fa-regular fa-trash-can'></i>
						</button>
					) : (
						<button
							className={`action-circle-btn ${isFavorited ? 'active-fav' : ''}`}
							onClick={handleToggleWishlist}
							title='Wishlist'
							aria-label='Add to wishlist'
						>
							<i
								className={`fa-heart ${isFavorited ? 'fa-solid' : 'fa-regular'}`}
								style={isFavorited ? { color: '#DB4444' } : {}}
							></i>
						</button>
					)}
				</div>

				<Link to={`/product/${product.id}`} className='product-img-wrap'>
					<img src={product.image} alt={product.name} className='product-img' />
				</Link>

				<button
					className='btn-add-to-cart'
					onClick={handleAddToCart}
					aria-label='Add to cart'
				>
					{t('common.addToCart', 'Add To Cart')}
				</button>
			</div>

			<div className='product-card-bottom'>
				<Link to={`/product/${product.id}`} className='product-title'>
					{product.name}
				</Link>

				<div className='product-prices'>
					<span className='price-current'>${product.price}</span>
					{product.originalPrice && (
						<span className='price-old'>${product.originalPrice}</span>
					)}
				</div>

				<div className='product-rating-row'>
					<div className='rating-stars'>
						{[1, 2, 3, 4, 5].map(i => (
							<i
								key={i}
								className='fa-solid fa-star'
								style={{
									color:
										i <= Math.floor(product.rating || 5)
											? '#FFAD33'
											: '#D4D4D4',
									fontSize: '13px',
								}}
							></i>
						))}
					</div>
					<span className='review-count'>({product.reviewCount || 0})</span>
				</div>

				{(showColors || product.colors) &&
					product.colors &&
					product.colors.length > 1 && (
						<div className='product-color-swatches'>
							{product.colors.map((c, i) => (
								<span
									key={i}
									className={`color-dot ${selectedColor === c ? 'active' : ''}`}
									style={{ backgroundColor: c }}
									onClick={() => setSelectedColor(c)}
								/>
							))}
						</div>
					)}
			</div>
		</div>
	)
}

export default ProductCard
