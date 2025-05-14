import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Features.css'

const featureData = [
  {
    icon: '😊',
    title: 'Mood Logging',
    description: 'Record how you\'re feeling each day and track your emotional journey.'
  },
  {
    icon: '📅',
    title: 'Mood History',
    description: 'View past moods and patterns to gain insights about your emotional wellbeing.'
  },
  {
    icon: '🌬️',
    title: 'Breathing Exercises',
    description: 'Quick breathing techniques to help you relax and center your mind.'
  },
  {
    icon: '🎧',
    title: 'Guided Meditations',
    description: 'Short meditations for stress relief, focus, and emotional balance.'
  },
  {
    icon: '😴',
    title: 'Sleep Sounds',
    description: 'Soothing nature sounds to help you unwind and fall asleep naturally.'
  },
  {
    icon: '📊',
    title: 'Progress Tracker',
    description: 'See your mood trends over time and celebrate your mindfulness journey.'
  }
]

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="section-header text-center">
          <h2>Features to Support Your Wellbeing</h2>
          <p className="subtitle">Tools designed to help you practice mindfulness and improve your mental health</p>
        </div>

        <motion.div 
          ref={ref}
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featureData.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={itemVariants}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features