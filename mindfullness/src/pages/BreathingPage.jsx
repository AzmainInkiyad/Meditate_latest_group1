import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BreathingPage.css'

const breathingExercises = [
  {
    name: 'Box Breathing',
    description: 'Breathe in for 4, hold for 4, exhale for 4, hold for 4. Great for focus and stress relief.',
    inhaleDuration: 4,
    holdInDuration: 4,
    exhaleDuration: 4,
    holdOutDuration: 4,
    color: '#7BB5FF'
  },
  {
    name: '4-7-8 Breathing',
    description: 'Breathe in for 4, hold for 7, exhale for 8. Excellent for sleep and anxiety reduction.',
    inhaleDuration: 4,
    holdInDuration: 7,
    exhaleDuration: 8,
    holdOutDuration: 0,
    color: '#78D6AD'
  },
  {
    name: 'Deep Breathing',
    description: 'Simple deep breaths. In for 5, out for 5. Perfect for beginners and quick stress relief.',
    inhaleDuration: 5,
    holdInDuration: 0,
    exhaleDuration: 5,
    holdOutDuration: 0,
    color: '#A39CDD'
  }
]

const BreathingPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(0)
  const [isPracticing, setIsPracticing] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('ready') // ready, inhale, holdIn, exhale, holdOut
  const [timer, setTimer] = useState(0)
  const [totalBreaths, setTotalBreaths] = useState(0)
  
  const intervalRef = useRef(null)
  const animationRef = useRef(null)
  
  useEffect(() => {
    document.title = 'Breathing Exercises - Mindful Space'
    window.scrollTo(0, 0)
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])
  
  const startPractice = () => {
    setIsPracticing(true)
    setCurrentPhase('inhale')
    setTimer(breathingExercises[selectedExercise].inhaleDuration)
    setTotalBreaths(0)
    
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          // Move to next phase
          setCurrentPhase(prevPhase => {
            const exercise = breathingExercises[selectedExercise]
            
            switch (prevPhase) {
              case 'inhale':
                if (exercise.holdInDuration > 0) {
                  setTimer(exercise.holdInDuration)
                  return 'holdIn'
                } else {
                  setTimer(exercise.exhaleDuration)
                  return 'exhale'
                }
              case 'holdIn':
                setTimer(exercise.exhaleDuration)
                return 'exhale'
              case 'exhale':
                if (exercise.holdOutDuration > 0) {
                  setTimer(exercise.holdOutDuration)
                  return 'holdOut'
                } else {
                  setTotalBreaths(prev => prev + 1)
                  setTimer(exercise.inhaleDuration)
                  return 'inhale'
                }
              case 'holdOut':
                setTotalBreaths(prev => prev + 1)
                setTimer(exercise.inhaleDuration)
                return 'inhale'
              default:
                return 'inhale'
            }
          })
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }
  
  const stopPractice = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsPracticing(false)
    setCurrentPhase('ready')
  }
  
  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'ready':
        return 'Press start when ready'
      case 'inhale':
        return 'Breathe in'
      case 'holdIn':
        return 'Hold'
      case 'exhale':
        return 'Breathe out'
      case 'holdOut':
        return 'Hold'
      default:
        return 'Press start when ready'
    }
  }
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="breathing-page">
      <div className="container">
        <div className="breathing-header">
          <h1>Breathing Exercises</h1>
          <p>Simple breathing techniques to help you relax, focus, and center yourself.</p>
        </div>
        
        <div className="breathing-content">
          <div className="breathing-selector">
            <h2>Choose an exercise</h2>
            <div className="breathing-options">
              {breathingExercises.map((exercise, index) => (
                <button
                  key={index}
                  className={`breathing-option ${selectedExercise === index ? 'selected' : ''}`}
                  style={{
                    '--breathing-color': exercise.color,
                    borderColor: selectedExercise === index ? exercise.color : 'transparent',
                    backgroundColor: selectedExercise === index ? `${exercise.color}20` : 'white'
                  }}
                  onClick={() => {
                    if (!isPracticing) {
                      setSelectedExercise(index)
                    }
                  }}
                  disabled={isPracticing}
                >
                  <h3>{exercise.name}</h3>
                  <p>{exercise.description}</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="breathing-practice">
            <div 
              className="breathing-visualizer"
              style={{ '--breathing-color': breathingExercises[selectedExercise].color }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPhase}
                  className="breathing-circle"
                  initial={{ 
                    scale: currentPhase === 'inhale' ? 0.8 : 
                           currentPhase === 'exhale' ? 1.4 : 1.1 
                  }}
                  animate={{ 
                    scale: currentPhase === 'inhale' ? 1.4 : 
                           currentPhase === 'exhale' ? 0.8 : 1.1 
                  }}
                  transition={{ 
                    duration: currentPhase === 'inhale' ? 
                              breathingExercises[selectedExercise].inhaleDuration : 
                              breathingExercises[selectedExercise].exhaleDuration,
                    ease: "easeInOut"
                  }}
                />
              </AnimatePresence>
              
              <div className="breathing-instruction">
                <h3>{getPhaseInstruction()}</h3>
                {timer > 0 && isPracticing && <div className="breathing-timer">{timer}</div>}
                {totalBreaths > 0 && <div className="breath-count">Breaths: {totalBreaths}</div>}
              </div>
            </div>
            
            <div className="breathing-controls">
              {!isPracticing ? (
                <button 
                  className="btn btn-primary btn-lg start-button"
                  onClick={startPractice}
                >
                  Start
                </button>
              ) : (
                <button 
                  className="btn btn-outline btn-lg stop-button"
                  onClick={stopPractice}
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="breathing-tips">
          <h2>Tips for Effective Breathing</h2>
          <ul>
            <li>Find a comfortable seated position with your back straight</li>
            <li>Breathe through your nose if possible</li>
            <li>Place a hand on your abdomen to feel it expand as you inhale</li>
            <li>Start with just 2-3 minutes and gradually increase your practice time</li>
            <li>Practice regularly for the greatest benefit</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BreathingPage