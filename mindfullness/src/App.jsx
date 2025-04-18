import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'))
const MoodTrackerPage = lazy(() => import('./pages/MoodTrackerPage'))
const MeditationsPage = lazy(() => import('./pages/MeditationsPage'))
const BreathingPage = lazy(() => import('./pages/BreathingPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mood-tracker" element={<MoodTrackerPage />} />
            <Route path="/meditations" element={<MeditationsPage />} />
            <Route path="/breathing" element={<BreathingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App