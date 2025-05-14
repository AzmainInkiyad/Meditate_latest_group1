import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            ref={ref}
            variants={fadeIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2>Your Journey to Inner Peace</h2>
            <p className="about-lead">
              Mindful Space was created with a simple mission: to help you build a sustainable mindfulness practice that fits into your daily life.
            </p>
            <p>
              In today's fast-paced world, finding moments of calm can be challenging. Our platform provides the tools and guidance you need to develop awareness of your emotions, reduce stress, and cultivate a greater sense of wellbeing.
            </p>
            <p>
              Whether you're new to mindfulness or a seasoned meditator, our accessible approach meets you where you are. Start with just a few minutes a day and discover how small, consistent practices can lead to meaningful change.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Meditation Guides</span>
              </div>
              <div className="stat">
                <span className="stat-number">8</span>
                <span className="stat-label">Breathing Techniques</span>
              </div>
              <div className="stat">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Happy Users</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-image"
            ref={ref}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="image-container">
              <img 
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="Person meditating peacefully" 
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About