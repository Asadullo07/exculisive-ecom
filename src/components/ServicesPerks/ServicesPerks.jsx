import { useTranslation } from 'react-i18next'
import './ServicesPerks.css'

const ServicesPerks = () => {
	const { t } = useTranslation()

	const perks = [
		{
			id: 1,
			icon: (
				<i
					className='fa-solid fa-truck-fast'
					style={{ fontSize: '28px', color: '#FFFFFF' }}
				></i>
			),
			title: t('services.deliveryTitle'),
			desc: t('services.deliveryDesc'),
		},
		{
			id: 2,
			icon: (
				<i
					className='fa-solid fa-headset'
					style={{ fontSize: '28px', color: '#FFFFFF' }}
				></i>
			),
			title: t('services.serviceTitle'),
			desc: t('services.serviceDesc'),
		},
		{
			id: 3,
			icon: (
				<i
					className='fa-solid fa-shield-halved'
					style={{ fontSize: '28px', color: '#FFFFFF' }}
				></i>
			),
			title: t('services.guaranteeTitle'),
			desc: t('services.guaranteeDesc'),
		},
	]

	return (
		<section className='services-section container'>
			<div className='services-grid'>
				{perks.map(perk => (
					<div key={perk.id} className='service-card'>
						<div className='service-icon-outer'>
							<div className='service-icon-inner'>{perk.icon}</div>
						</div>
						<h3 className='service-title'>{perk.title}</h3>
						<p className='service-desc'>{perk.desc}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default ServicesPerks
