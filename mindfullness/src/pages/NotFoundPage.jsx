import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div 
          className="not-found-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Looks like you've ventured into uncharted territory. Take a deep breath, and let's get you back on track.</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Return Home
          </Link>
        </motion.div>
        
        <motion.div 
          className="meditation-suggestion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>While you're here...</h3>
          <p>Take a moment to practice a quick mindful breathing exercise:</p>
          <ol>
            <li>Inhale deeply through your nose for 4 seconds</li>
            <li>Hold your breath for 2 seconds</li>
            <li>Exhale slowly through your mouth for 6 seconds</li>
            <li>Repeat 3 times</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage