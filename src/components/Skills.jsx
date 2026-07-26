function Skills({ skillList }) {
  return (
    <section className="section-copy">
      <p className="eyebrow">Skills</p>
      <h2>What I work with</h2>
      <ul className="skills-list">
        {skillList.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}

export default Skills