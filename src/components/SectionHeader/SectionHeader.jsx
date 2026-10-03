import './SectionHeader.css'

const SectionHeader = ({
	tag,
	title,
	countdown = null,
	onPrev = null,
	onNext = null,
	actionButton = null,
}) => {
	return (
		<div className='section-header-block'>
			<div className='section-tag'>
				<span className='tag-indicator'></span>
				<span className='tag-text'>{tag}</span>
			</div>

			<div className='section-header-row'>
				<div className='section-title-wrap'>
					<h2 className='section-main-title'>{title}</h2>
					{countdown && <div className='section-countdown'>{countdown}</div>}
				</div>

				<div className='section-actions'>
					{actionButton}
					{onPrev && onNext && (
						<div className='nav-arrows'>
							<button
								className='nav-arrow-btn'
								onClick={onPrev}
								aria-label='Previous Slide'
							>
								<i className='fa-solid fa-arrow-left'></i>
							</button>
							<button
								className='nav-arrow-btn'
								onClick={onNext}
								aria-label='Next Slide'
							>
								<i className='fa-solid fa-arrow-right'></i>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SectionHeader
