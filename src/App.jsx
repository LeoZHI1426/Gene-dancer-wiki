import { useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Innovation from './components/Innovation'
import Footer from './components/Footer'
import ProjectPage from './pages/ProjectPage'
import TechnologyPage from './pages/TechnologyPage'
import HumanPracticesPage from './pages/HumanPracticesPage'
import TeamPage from './pages/TeamPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Problem />
            <HowItWorks />
            <Innovation />
            <Footer />
          </>
        )}

        {currentPage === 'project' && <ProjectPage />}
        {currentPage === 'tech' && <TechnologyPage />}
        {currentPage === 'hp' && <HumanPracticesPage />}
        {currentPage === 'team' && <TeamPage />}
      </main>
    </div>
  )
}
