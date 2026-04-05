import { sectionContent, sectionOrder } from '../portfolioData'

export default function SectionLayout({
  activeSection,
  onBack,
  onNavigate,
  onThemeToggle,
  accentLabel,
  featureTitle,
  featureBody,
  theme,
  heroGraphic,
  showcaseTitle,
  showcaseItems = [],
}) {
  const content = sectionContent[activeSection]

  return (
    <main className="section-screen">
      <div className="section-screen__bg" />

      <header className="section-screen__top">
        <button type="button" className="back-button" onClick={onBack}>
          Back To Village
        </button>

        <div className="section-screen__top-actions">
          <div className="section-badge">
            <span>Inside</span>
            <strong>{activeSection}</strong>
          </div>
          <button type="button" className="theme-toggle" onClick={onThemeToggle}>
            {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </header>

      <nav className="section-nav section-nav--top" aria-label="Section navigation">
        {sectionOrder.map((section) => (
          <button
            key={section}
            type="button"
            className={section === activeSection ? 'section-nav__item active' : 'section-nav__item'}
            onClick={() => onNavigate(section)}
          >
            {section}
          </button>
        ))}
      </nav>

      <section className="section-hero-card">
        <div className="section-hero-card__content">
          <div>
            <p className="section-label">{accentLabel}</p>
            <h1>{content.title}</h1>
            <p className="section-hero-text">{content.subtitle}</p>
          </div>
          {heroGraphic ? <div className="section-hero-card__graphic">{heroGraphic}</div> : null}
        </div>
      </section>

      <div className="section-grid">
        <article className="section-card">
          <p className="section-label">Overview</p>
          {content.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <article className="section-card">
          <p className="section-label">{featureTitle}</p>
          <p>{featureBody}</p>
          <div className="section-stats">
            {content.stats.map((item) => (
              <div key={item} className="section-stat">
                {item}
              </div>
            ))}
          </div>
          {showcaseItems.length ? (
            <>
              <p className="section-label section-label--spaced">{showcaseTitle}</p>
              <div className="section-showcase">
                {showcaseItems.map((item) => (
                  <div key={item.title} className="section-showcase__item">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </article>
      </div>
    </main>
  )
}
