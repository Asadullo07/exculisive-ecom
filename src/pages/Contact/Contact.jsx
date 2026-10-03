import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { useShop } from '../../context/ShopContext'
import { sendTelegramMessage } from '../../utils/telegram'
import './Contact.css'

const Contact = () => {
 const { t } = useTranslation()
 const { showToast } = useShop()

 const [form, setForm] = useState({
 name: '',
 email: '',
 phone: '',
 message: '',
 })

 const handleChange = e => {
 const { name, value } = e.target
 setForm(prev => ({ ...prev, [name]: value }))
 }

 const handleSubmit = e => {
 e.preventDefault()
 sendTelegramMessage(
 ` <b>YANGI MUROJAAT (Aloqa)</b>\n\n` +
 ` <b>Ism:</b> ${form.name}\n` +
 ` <b>Email:</b> ${form.email}\n` +
 ` <b>Telefon:</b> ${form.phone}\n` +
 ` <b>Xabar:</b>\n${form.message}\n\n` +
 ` <b>Vaqt:</b> ${new Date().toLocaleString()}`
 )
 showToast(
 t('contact.messageSent', 'Your message has been sent successfully!'),
 'success',
 )
 setForm({ name: '', email: '', phone: '', message: '' })
 }

 const breadcrumbsList = [
 { label: t('nav.home', 'Home'), path: '/' },
 { label: t('nav.contact', 'Contact') },
 ]

 return (
 <div className='contact-page'>
 <Breadcrumbs items={breadcrumbsList} />

 <div className='container contact-container'>
 <aside className='contact-info-card'>
 <div className='info-block'>
 <div className='info-block-header'>
 <div className='info-icon-badge'>
 <i
 className='fa-solid fa-phone'
 style={{ color: '#FFFFFF', fontSize: '18px' }}
 ></i>
 </div>
 <h3 className='info-title'>
 {t('contact.callToUs', 'Call To Us')}
 </h3>
 </div>
 <p className='info-desc'>{t('contact.callDesc')}</p>
 <a href='tel:+8801611112222' className='info-highlight-text'>
 {t('contact.phone', 'Phone: +8801611112222')}
 </a>
 </div>

 <div className='info-divider'></div>

 <div className='info-block'>
 <div className='info-block-header'>
 <div className='info-icon-badge'>
 <i
 className='fa-regular fa-envelope'
 style={{ color: '#FFFFFF', fontSize: '18px' }}
 ></i>
 </div>
 <h3 className='info-title'>
 {t('contact.writeToUs', 'Write To Us')}
 </h3>
 </div>
 <p className='info-desc'>{t('contact.writeDesc')}</p>
 <a href='mailto:customer@exclusive.com' className='info-link-text'>
 {t('contact.email1', 'Emails: customer@exclusive.com')}
 </a>
 <a href='mailto:support@exclusive.com' className='info-link-text'>
 {t('contact.email2', 'Emails: support@exclusive.com')}
 </a>
 </div>
 </aside>

 <main className='contact-form-card'>
 <form className='contact-form' onSubmit={handleSubmit}>
 <div className='form-fields-row-3'>
 <input
 type='text'
 name='name'
 placeholder={t('contact.yourName', 'Your Name *')}
 required
 value={form.name}
 onChange={handleChange}
 />
 <input
 type='email'
 name='email'
 placeholder={t('contact.yourEmail', 'Your Email *')}
 required
 value={form.email}
 onChange={handleChange}
 />
 <input
 type='tel'
 name='phone'
 placeholder={t('contact.yourPhone', 'Your Phone *')}
 required
 value={form.phone}
 onChange={handleChange}
 />
 </div>

 <textarea
 name='message'
 placeholder={t('contact.yourMessage', 'Your Message')}
 rows='8'
 required
 value={form.message}
 onChange={handleChange}
 ></textarea>

 <div className='form-submit-row'>
 <button type='submit' className='btn-primary'>
 {t('contact.sendMessage', 'Send Message')}
 </button>
 </div>
 </form>
 </main>
 </div>
 </div>
 )
}

export default Contact
