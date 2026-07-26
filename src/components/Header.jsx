function Header({ name, title, themeColor }) {
  return (
    <header className="section-copy hero-copy">
      <p className="eyebrow" style={{ color: themeColor }}>
        Portfolio Intro
      </p>
      <h1>{name}</h1>
      <p className="lead">{title}</p>
      <div className="hero-badge" style={{ borderColor: themeColor, color: themeColor }}>
        Focused on reusable React components and clean UI structure.
      </div>
    </header>
  )
}

export default Header