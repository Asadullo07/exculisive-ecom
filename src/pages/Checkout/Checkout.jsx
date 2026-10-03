import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { useShop } from '../../context/ShopContext'
import { sendTelegramMessage } from '../../utils/telegram'
import './Checkout.css'

const Checkout = () => {
 const { t } = useTranslation()
 const navigate = useNavigate()
 const {
 cart,
 cartSubtotal,
 cartTotal,
 discountAmount,
 appliedCoupon,
 applyCoupon,
 clearCart,
 user,
 showToast,
 } = useShop()

 const [formData, setFormData] = useState({
 firstName: user?.name || 'Md',
 companyName: 'TechCorp',
 streetAddress: user?.address || '111 Bijoy Sarani',
 apartment: 'Floor 4B',
 townCity: 'Dhaka',
 phoneNumber: '+8801588888999',
 emailAddress: user?.email || 'exclusive@gmail.com',
 saveInfo: true,
 })

 const [paymentMethod, setPaymentMethod] = useState('cash')
 const [couponCode, setCouponCode] = useState('')

 const handleInputChange = e => {
 const { name, value, type, checked } = e.target
 setFormData(prev => ({
 ...prev,
 [name]: type === 'checkbox' ? checked : value,
 }))
 }

 const handleApplyCoupon = e => {
 e.preventDefault()
 if (couponCode.trim()) {
 applyCoupon(couponCode)
 setCouponCode('')
 }
 }

 const handlePlaceOrder = e => {
 e.preventDefault()

 const itemsList = cart.length > 0
 ? cart.map((item, index) => `${index + 1}. <b>${item.product.name}</b> x${item.quantity} - $${item.product.price * item.quantity}`).join('\n')
 : 'Savat bo\'sh'

 const message = ` <b>YANGI BUYURTMA!</b>\n\n` +
 ` <b>Mijoz:</b> ${formData.firstName}\n` +
 ` <b>Kompaniya:</b> ${formData.companyName || '-'}\n` +
 ` <b>Manzil:</b> ${formData.streetAddress}, ${formData.apartment || ''}, ${formData.townCity}\n` +
 ` <b>Telefon:</b> ${formData.phoneNumber}\n` +
 ` <b>Email:</b> ${formData.emailAddress}\n` +
 ` <b>To'lov turi:</b> ${paymentMethod === 'bank' ? 'Bank Card' : 'Cash on Delivery'}\n\n` +
 ` <b>Buyurtma tarkibi:</b>\n${itemsList}\n\n` +
 ` <b>Oraliq summa:</b> $${cartSubtotal}\n` +
 ` <b>Chegirma:</b> -$${discountAmount} (${appliedCoupon || "Yo'q"})\n` +
 ` <b>Jami summa:</b> $${cartTotal}\n` +
 ` <b>Vaqt:</b> ${new Date().toLocaleString()}`

 sendTelegramMessage(message)

 clearCart()
 showToast(
 t(
 'checkout.orderSuccess',
 'Buyurtma muvaffaqiyatli qabul qilindi! Exclusive bilan xarid qilganingiz uchun rahmat.',
 ),
 'success',
 )
 navigate('/')
 }

 const breadcrumbsList = [
 { label: t('account.myAccount', 'Account'), path: '/account' },
 { label: t('cart.title', 'Cart'), path: '/cart' },
 { label: t('checkout.title', 'CheckOut') },
 ]

 return (
 <div className='checkout-page'>
 <Breadcrumbs items={breadcrumbsList} />

 <div className='container checkout-container'>
 <h1 className='checkout-page-title'>
 {t('checkout.billingDetails', 'Billing Details')}
 </h1>

 <div className='checkout-layout'>
 <form
 className='billing-form'
 id='billing-form'
 onSubmit={handlePlaceOrder}
 >
 <div className='form-group'>
 <label>{t('checkout.firstName', 'First Name*')}</label>
 <input
 type='text'
 name='firstName'
 required
 value={formData.firstName}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>{t('checkout.companyName', 'Company Name')}</label>
 <input
 type='text'
 name='companyName'
 value={formData.companyName}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>{t('checkout.streetAddress', 'Street Address*')}</label>
 <input
 type='text'
 name='streetAddress'
 required
 value={formData.streetAddress}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>
 {t('checkout.apartment', 'Apartment, floor, etc. (optional)')}
 </label>
 <input
 type='text'
 name='apartment'
 value={formData.apartment}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>{t('checkout.townCity', 'Town/City*')}</label>
 <input
 type='text'
 name='townCity'
 required
 value={formData.townCity}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>{t('checkout.phoneNumber', 'Phone Number*')}</label>
 <input
 type='tel'
 name='phoneNumber'
 required
 value={formData.phoneNumber}
 onChange={handleInputChange}
 />
 </div>

 <div className='form-group'>
 <label>{t('checkout.emailAddress', 'Email Address*')}</label>
 <input
 type='email'
 name='emailAddress'
 required
 value={formData.emailAddress}
 onChange={handleInputChange}
 />
 </div>

 <label className='checkbox-label'>
 <input
 type='checkbox'
 name='saveInfo'
 checked={formData.saveInfo}
 onChange={handleInputChange}
 />
 <span className='custom-checkmark'></span>
 <span>
 {t(
 'checkout.saveInfo',
 'Save this information for faster check-out next time',
 )}
 </span>
 </label>
 </form>

 <div className='order-summary-column'>
 <div className='order-items-preview'>
 {cart.map(item => (
 <div key={item.product.id} className='order-item-row'>
 <div className='order-item-left'>
 <img
 src={item.product.image}
 alt={item.product.name}
 className='order-item-img'
 />
 <span className='order-item-name'>{item.product.name}</span>
 <span className='order-item-qty'>x{item.quantity}</span>
 </div>
 <span className='order-item-price'>
 ${item.product.price * item.quantity}
 </span>
 </div>
 ))}
 </div>

 <div className='summary-calculations'>
 <div className='summary-line'>
 <span>{t('cart.subtotal', 'Subtotal')}:</span>
 <span>${cartSubtotal}</span>
 </div>

 {appliedCoupon && (
 <div className='summary-line discount-line'>
 <span>Discount ({appliedCoupon}):</span>
 <span>-${discountAmount}</span>
 </div>
 )}

 <div className='summary-divider'></div>

 <div className='summary-line'>
 <span>{t('cart.shipping', 'Shipping')}:</span>
 <span>{t('cart.free', 'Free')}</span>
 </div>

 <div className='summary-divider'></div>

 <div className='summary-line total-bold'>
 <span>{t('cart.total', 'Total')}:</span>
 <span>${cartTotal}</span>
 </div>
 </div>

 <div className='payment-methods'>
 <label className='payment-radio-option'>
 <input
 type='radio'
 name='payment'
 value='bank'
 checked={paymentMethod === 'bank'}
 onChange={() => setPaymentMethod('bank')}
 />
 <span className='radio-circle'></span>
 <span className='payment-label-text'>
 {t('checkout.bank', 'Bank')}
 </span>
 <div className='bank-cards-icons'>
 <span className='card-badge visa'>VISA</span>
 <span className='card-badge master'>MC</span>
 <span className='card-badge bkash'>BKash</span>
 <span className='card-badge nagad'>Nagad</span>
 </div>
 </label>

 <label className='payment-radio-option'>
 <input
 type='radio'
 name='payment'
 value='cash'
 checked={paymentMethod === 'cash'}
 onChange={() => setPaymentMethod('cash')}
 />
 <span className='radio-circle'></span>
 <span className='payment-label-text'>
 {t('checkout.cashOnDelivery', 'Cash on delivery')}
 </span>
 </label>
 </div>

 <form className='checkout-coupon-form' onSubmit={handleApplyCoupon}>
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

 <button
 type='submit'
 form='billing-form'
 className='btn-primary btn-place-order'
 disabled={cart.length === 0}
 >
 {t('checkout.placeOrder', 'Place Order')}
 </button>
 </div>
 </div>
 </div>
 </div>
 )
}

export default Checkout
