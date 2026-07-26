import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const skillList = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Vite']

  return (
    <div className="page-shell">
      <main>
        <Header
          name="Harsh Jethva"
          title="Information Technology student"
          themeColor="#f97316"
        />

        <About bio="I build clean and responsive web pages using React components." />

        <Skills skillList={skillList} />

        <Projects />

        <Footer email="harsh.jethva@example.com" copyrightOwner="Harsh Jethva" />
      </main>
    </div>
  )
}

export default App