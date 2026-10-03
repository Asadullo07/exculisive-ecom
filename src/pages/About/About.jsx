import { useTranslation } from 'react-i18next'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ServicesPerks from '../../components/ServicesPerks/ServicesPerks'
import teamData from '../../data/team.json'
import './About.css'

const About = () => {
	const { t } = useTranslation()

	const breadcrumbsList = [
		{ label: t('nav.home', 'Home'), path: '/' },
		{ label: t('nav.about', 'About') },
	]

	return (
		<div className='about-page'>
			<Breadcrumbs items={breadcrumbsList} />

			<section className='our-story-section container'>
				<div className='story-content'>
					<h1 className='story-title'>{t('about.ourStory', 'Our Story')}</h1>
					<p className='story-desc'>{t('about.p1')}</p>
					<p className='story-desc'>{t('about.p2')}</p>
				</div>

				<div className='story-media'>
					<img
						src='/images/about/story.png'
						alt='Exclusive Our Story'
						className='story-img'
					/>
				</div>
			</section>

			<section className='stats-section container'>
				<div className='stats-grid'>
					{teamData.stats.map(stat => (
						<div
							key={stat.id}
							className={`stat-card ${stat.featured ? 'featured' : ''}`}
						>
							<div className='stat-icon-outer'>
								<div className='stat-icon-inner'>
									<i
										className={`fa-solid ${stat.icon}`}
										style={{ fontSize: '20px' }}
									></i>
								</div>
							</div>
							<h3 className='stat-number'>{stat.number}</h3>
							<p className='stat-label'>{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className='team-section container'>
				<Swiper
					modules={[Pagination, Autoplay]}
					pagination={{ clickable: true }}
					autoplay={{ delay: 4000, disableOnInteraction: false }}
					slidesPerView={1}
					spaceBetween={30}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className='team-swiper'
				>
					{teamData.members.map(member => (
						<SwiperSlide key={member.id}>
							<div className='team-member-card'>
								<div className='member-photo-wrap'>
									<img
										src={member.image}
										alt={member.name}
										className='member-photo'
									/>
								</div>
								<div className='member-info'>
									<h3 className='member-name'>{member.name}</h3>
									<p className='member-role'>{member.role}</p>
									<div className='member-socials'>
										<a
											href={member.twitter}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='Twitter'
										>
											<i
												className='fa-brands fa-x-twitter'
												style={{ fontSize: '16px' }}
											></i>
										</a>
										<a
											href={member.instagram}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='Instagram'
										>
											<i
												className='fa-brands fa-instagram'
												style={{ fontSize: '16px' }}
											></i>
										</a>
										<a
											href={member.linkedin}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='LinkedIn'
										>
											<i
												className='fa-brands fa-linkedin-in'
												style={{ fontSize: '16px' }}
											></i>
										</a>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>

			<ServicesPerks />
		</div>
	)
}

export default About
