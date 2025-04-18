import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './MeditationsPage.css'

const meditations = [
  {
    title: 'Beginner\'s Mind',
    duration: '5 min',
    category: 'Focus',
    description: 'A gentle introduction to mindfulness meditation for beginners.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Stress Relief',
    duration: '10 min',
    category: 'Relaxation',
    description: 'Release tension and find calm with this guided relaxation practice.',
    image: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Body Scan',
    duration: '15 min',
    category: 'Awareness',
    description: 'Develop awareness of physical sensations throughout your body.',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Loving Kindness',
    duration: '12 min',
    category: 'Compassion',
    description: 'Cultivate feelings of love and compassion for yourself and others.',
    image: 'https://images.unsplash.com/photo-1478962921258-b9e37163830b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Before Sleep',
    duration: '8 min',
    category: 'Sleep',
    description: 'Prepare your mind and body for a restful night\'s sleep.',
    image: 'https://images.unsplash.com/photo-1613313254357-fede81a79de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Morning Energy',
    duration: '7 min',
    category: 'Energy',
    description: 'Start your day with presence and positive intention.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }
]

const MeditationsPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    document.title = 'Guided Meditations - Mindful Space'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="meditations-page">
      <div className="container">
        <div className="meditations-header">
          <h1>Guided Meditations</h1>
          <p>Short, focused practices to help you find calm, build focus, and feel more centered.</p>
        </div>
        
        <motion.div 
          className="meditations-grid"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {meditations.map((meditation, index) => (
            <motion.div 
              key={index}
              className="meditation-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="meditation-image">
                <img src={meditation.image} alt={meditation.title} loading="lazy" />
                <div className="meditation-duration">{meditation.duration}</div>
                <button className="play-button" aria-label="Play meditation">
                  <span className="play-icon">▶</span>
                </button>
              </div>
              <div className="meditation-content">
                <span className="meditation-category">{meditation.category}</span>
                <h2>{meditation.title}</h2>
                <p>{meditation.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="coming-soon-section">
          <h2>More Coming Soon</h2>
          <p>We're constantly adding new meditations and practices. Check back regularly for updates!</p>
        </div>
      </div>
    </div>
  )
}

export default MeditationsPage