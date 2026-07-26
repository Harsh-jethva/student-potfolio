function About({ bio }) {
  return (
    <section className="section-copy">
      <p className="eyebrow">About</p>
      <h2>Short bio</h2>
      <p>{bio}</p>
    </section>
  )
}

export default About