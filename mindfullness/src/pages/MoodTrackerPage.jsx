import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './MoodTrackerPage.css'

const moods = [
  { emoji: '😊', name: 'Happy', color: '#4ade80' },
  { emoji: '😌', name: 'Calm', color: '#7BB5FF' },
  { emoji: '😐', name: 'Neutral', color: '#94a3b8' },
  { emoji: '😔', name: 'Sad', color: '#a78bfa' },
  { emoji: '😡', name: 'Angry', color: '#f87171' },
  { emoji: '😰', name: 'Anxious', color: '#fbbf24' },
]

const MoodTrackerPage = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState([])
  const [note, setNote] = useState('')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    document.title = 'Mood Tracker - Mindful Space'
    window.scrollTo(0, 0)
    
    // Load mood history from localStorage
    const savedMoods = localStorage.getItem('moodHistory')
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods))
    }
  }, [])

  const handleMoodSelect = (index) => {
    setSelectedMood(index)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedMood === null) return
    
    const newMoodEntry = {
      date: new Date().toISOString(),
      mood: moods[selectedMood],
      note: note
    }
    
    const updatedHistory = [newMoodEntry, ...moodHistory]
    setMoodHistory(updatedHistory)
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory))
    
    // Reset form
    setSelectedMood(null)
    setNote('')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mood-tracker-page">
      <div className="container">
        <div className="mood-tracker-header">
          <h1>Track Your Mood</h1>
          <p>Record how you're feeling to build awareness of your emotional patterns.</p>
        </div>
        
        <div className="mood-tracker-content">
          <motion.div 
            className="mood-selector-container"
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2>How are you feeling right now?</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mood-options">
                {moods.map((mood, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`mood-option ${selectedMood === index ? 'selected' : ''}`}
                    style={{
                      '--mood-color': mood.color,
                      borderColor: selectedMood === index ? mood.color : 'transparent',
                      backgroundColor: selectedMood === index ? `${mood.color}20` : 'white'
                    }}
                    onClick={() => handleMoodSelect(index)}
                  >
                    <span className="mood-emoji">{mood.emoji}</span>
                    <span className="mood-name">{mood.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="mood-note">
                <label htmlFor="mood-note">Add a note (optional)</label>
                <textarea
                  id="mood-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's contributing to your mood right now?"
                  rows={4}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-lg mood-submit"
                disabled={selectedMood === null}
              >
                Save Mood
              </button>
            </form>
          </motion.div>
          
          <motion.div 
            className="mood-history-container"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Your Mood History</h2>
            
            {moodHistory.length === 0 ? (
              <div className="empty-state">
                <p>No mood entries yet. Start tracking how you feel!</p>
              </div>
            ) : (
              <div className="mood-history-list">
                {moodHistory.map((entry, index) => (
                  <div 
                    key={index} 
                    className="mood-history-item"
                    style={{ borderLeftColor: entry.mood.color }}
                  >
                    <div className="mood-history-emoji">
                      {entry.mood.emoji}
                    </div>
                    <div className="mood-history-details">
                      <div className="mood-history-info">
                        <span className="mood-name">{entry.mood.name}</span>
                        <span className="mood-date">{formatDate(entry.date)}</span>
                      </div>
                      {entry.note && <p className="mood-note-content">{entry.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MoodTrackerPage