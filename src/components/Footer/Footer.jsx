import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { sendTelegramMessage } from '../../utils/telegram'
import './Footer.css'
import qrcode from "../../assets/qrcode.jpg"

const Footer = () => {
	const { t } = useTranslation()
	const { showToast } = useShop()
	const [email, setEmail] = useState('')

	const handleSubscribe = e => {
		e.preventDefault()
		if (email) {
			sendTelegramMessage(
				`<b>YANGI OBUNA (Newsletter):</b>\n\n` +
					`<b>Email:</b> ${email}\n` +
					`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
			)
			showToast(
				t('footer.getDiscount', 'Get 10% off your first order!'),
				'success',
			)
			setEmail('')
		}
	}

	return (
		<footer className='footer'>
			<div className='container footer-container'>
				<div className='footer-col'>
					<Link to='/' className='footer-logo'>
						{t('footer.exclusive')}
					</Link>
					<h4 className='footer-title'>{t('footer.subscribe')}</h4>
					<p className='footer-desc'>{t('footer.getDiscount')}</p>
					<form className='subscribe-form' onSubmit={handleSubscribe}>
						<input
							type='email'
							placeholder={t('footer.enterEmail')}
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<button
							type='submit'
							aria-label='Subscribe'
							className='subscribe-btn'
						>
							<i
								className='fa-regular fa-paper-plane'
								style={{ color: '#FAFAFA', fontSize: '16px' }}
							></i>
						</button>
					</form>
				</div>

				<div className='footer-col'>
					<h4 className='footer-title'>{t('footer.support')}</h4>
					<p className='footer-text'>{t('footer.address')}</p>
					<a href='mailto:exclusive@gmail.com' className='footer-link'>
						exclusive@gmail.com
					</a>
					<a href='tel:+88015888889999' className='footer-link'>
						+88015-88888-9999
					</a>
				</div>

				<div className='footer-col'>
					<h4 className='footer-title'>{t('footer.account')}</h4>
					<Link to='/account' className='footer-link'>
						{t('footer.myAccount')}
					</Link>
					<Link to='/login' className='footer-link'>
						{t('footer.loginRegister')}
					</Link>
					<Link to='/cart' className='footer-link'>
						{t('footer.cart')}
					</Link>
					<Link to='/wishlist' className='footer-link'>
						{t('footer.wishlist')}
					</Link>
					<Link to='/' className='footer-link'>
						{t('footer.shop')}
					</Link>
				</div>

				<div className='footer-col'>
					<h4 className='footer-title'>{t('footer.quickLink')}</h4>
					<Link to='/about' className='footer-link'>
						{t('footer.privacyPolicy')}
					</Link>
					<Link to='/about' className='footer-link'>
						{t('footer.termsOfUse')}
					</Link>
					<Link to='/contact' className='footer-link'>
						{t('footer.faq')}
					</Link>
					<Link to='/contact' className='footer-link'>
						{t('footer.contact')}
					</Link>
				</div>

				<div className='footer-col'>
					<h4 className='footer-title'>{t('footer.downloadApp')}</h4>
					<p className='footer-subtext'>{t('footer.saveApp')}</p>
					<div className='app-download-grid'>
						<div className='qr-box'>
							<img src={qrcode} alt="qr code img" />
						</div>

						<div className='store-buttons'>
							<div className='store-badge'>
								<i
									className='fa-brands fa-google-play'
									style={{ fontSize: '18px', color: '#FFFFFF' }}
								></i>
								<div className='store-text'>
									<span>GET IT ON</span>
									<strong>Google Play</strong>
								</div>
							</div>

							<div className='store-badge'>
								<i
									className='fa-brands fa-apple'
									style={{ fontSize: '20px', color: '#FFFFFF' }}
								></i>
								<div className='store-text'>
									<span>Download on the</span>
									<strong>App Store</strong>
								</div>
							</div>
						</div>
					</div>

					<div className='footer-socials'>
						<a
							href='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Facebook'
						>
							<i
								className='fa-brands fa-facebook-f'
								style={{ fontSize: '18px' }}
							></i>
						</a>
						<a
							href='https://twitter.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Twitter'
						>
							<i
								className='fa-brands fa-x-twitter'
								style={{ fontSize: '18px' }}
							></i>
						</a>
						<a
							href='https://instagram.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Instagram'
						>
							<i
								className='fa-brands fa-instagram'
								style={{ fontSize: '18px' }}
							></i>
						</a>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='LinkedIn'
						>
							<i
								className='fa-brands fa-linkedin-in'
								style={{ fontSize: '18px' }}
							></i>
						</a>
					</div>
				</div>
			</div>

			<div className='footer-bottom'>
				<p className='footer-copyright'>{t('footer.copyright')}</p>
			</div>
		</footer>
	)
}

export default Footer
