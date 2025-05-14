import { useEffect } from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import About from '../components/home/About'
import CTA from '../components/home/CTA'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Mindful Space - Your Daily Meditation Sanctuary'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Features />
      <About />
      <CTA />
    </>
  )
}

export default HomePage