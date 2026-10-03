import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { useShop } from '../../context/ShopContext'
import './Cart.css'

const Cart = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const {
		cart,
		removeFromCart,
		updateCartQuantity,
		cartSubtotal,
		cartTotal,
		showToast,
	} = useShop()

	const [couponCode, setCouponCode] = useState('')

	const handleApplyCoupon = e => {
		e.preventDefault()
		if (couponCode.trim()) {
			showToast('Coupon code applied!', 'info')
			setCouponCode('')
		}
	}

	const handleUpdateCart = () => {
		showToast(t('cart.updateCart', 'Cart updated!'), 'success')
	}

	const breadcrumbsList = [
		{ label: t('nav.home', 'Home'), path: '/' },
		{ label: t('cart.title', 'Cart') },
	]

	return (
		<div className='cart-page'>
			<Breadcrumbs items={breadcrumbsList} />

			<div className='container cart-container'>
				{cart.length === 0 ? (
					<div className='cart-empty-state'>
						<h3>{t('cart.emptyCart', 'Your cart is currently empty.')}</h3>
						<p>Looks like you haven't added any products to your cart yet.</p>
						<Link to='/' className='btn-primary'>
							{t('cart.returnShop', 'Return To Shop')}
						</Link>
					</div>
				) : (
					<>
						<div className='cart-table-header'>
							<span className='col-product'>
								{t('cart.product', 'Product')}
							</span>
							<span className='col-price'>{t('cart.price', 'Price')}</span>
							<span className='col-quantity'>
								{t('cart.quantity', 'Quantity')}
							</span>
							<span className='col-subtotal'>
								{t('cart.subtotal', 'Subtotal')}
							</span>
						</div>

						<div className='cart-items-list'>
							{cart.map(item => (
								<div key={item.product.id} className='cart-row'>
									<div className='cart-product-cell'>
										<div className='cart-img-wrap'>
											<img
												src={item.product.image}
												alt={item.product.name}
												className='cart-img'
											/>
											<button
												className='btn-cart-remove'
												onClick={() => removeFromCart(item.product.id)}
												title='Remove item'
											>
												<i className='fa-solid fa-xmark'></i>
											</button>
										</div>
										<span className='cart-item-name'>{item.product.name}</span>
									</div>

									<div className='cart-price-cell'>${item.product.price}</div>

									<div className='cart-qty-cell'>
										<div className='cart-qty-box'>
											<input
												type='number'
												min='1'
												value={item.quantity}
												onChange={e =>
													updateCartQuantity(
														item.product.id,
														parseInt(e.target.value) || 1,
													)
												}
											/>
											<div className='qty-arrows'>
												<button
													type='button'
													onClick={() =>
														updateCartQuantity(
															item.product.id,
															item.quantity + 1,
														)
													}
												>
													<i className='fa-solid fa-angle-up'></i>
												</button>
												<button
													type='button'
													onClick={() =>
														updateCartQuantity(
															item.product.id,
															item.quantity - 1,
														)
													}
												>
													<i className='fa-solid fa-angle-down'></i>
												</button>
											</div>
										</div>
									</div>

									<div className='cart-subtotal-cell'>
										${item.product.price * item.quantity}
									</div>
								</div>
							))}
						</div>

						<div className='cart-actions-row'>
							<Link to='/' className='btn-secondary'>
								{t('cart.returnShop', 'Return To Shop')}
							</Link>
							<button className='btn-secondary' onClick={handleUpdateCart}>
								{t('cart.updateCart', 'Update Cart')}
							</button>
						</div>

						<div className='cart-bottom-section'>
							<form className='coupon-form' onSubmit={handleApplyCoupon}>
								<input
									type='text'
									placeholder={t('cart.couponPlaceholder', 'Coupon Code')}
									value={couponCode}
									onChange={e => setCouponCode(e.target.value)}
								/>
								<button type='submit' className='btn-primary'>
									{t('cart.applyCoupon', 'Apply Coupon')}
								</button>
							</form>

							<div className='cart-total-card'>
								<h3 className='cart-total-title'>
									{t('cart.cartTotal', 'Cart Total')}
								</h3>

								<div className='cart-total-line'>
									<span>{t('cart.subtotal', 'Subtotal')}:</span>
									<span>${cartSubtotal}</span>
								</div>

								<div className='cart-total-divider'></div>

								<div className='cart-total-line'>
									<span>{t('cart.shipping', 'Shipping')}:</span>
									<span>{t('cart.free', 'Free')}</span>
								</div>

								<div className='cart-total-divider'></div>

								<div className='cart-total-line total-highlight'>
									<span>{t('cart.total', 'Total')}:</span>
									<span>${cartTotal}</span>
								</div>

								<button
									className='btn-primary btn-checkout'
									onClick={() => navigate('/checkout')}
								>
									{t('cart.proceedCheckout', 'Proceed to checkout')}
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Cart
