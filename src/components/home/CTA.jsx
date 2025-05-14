import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './CTA.css'

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="cta-section" id="get-started">
      <div className="container">
        <motion.div 
          className="cta-container"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="cta-content">
            <h2>Ready to Begin Your Mindfulness Journey?</h2>
            <p>Start tracking your moods, practicing meditation, and finding your inner peace today.</p>
            <div className="cta-buttons">
              <Link to="/mood-tracker" className="btn btn-primary btn-lg">
                Start Now
              </Link>
              <Link to="/meditations" className="btn btn-outline btn-lg">
                Explore Features
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA