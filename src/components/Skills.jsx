import React from 'react'

const defaultSkills = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'JavaScript (ES6+)',
  'JWT Authentication',
  'bcrypt Password Hashing',
  'REST API Architecture',
  'HTML5 & CSS3'
]

function Skills({ skillList = defaultSkills }) {
  const skillsToRender = Array.isArray(skillList) && skillList.length > 0 ? skillList : defaultSkills

  return (
    <section className="section-copy">
      <p className="eyebrow">Skills</p>
      <h2>What I work with</h2>
      <ul className="skills-list">
        {skillsToRender.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}

export default Skills