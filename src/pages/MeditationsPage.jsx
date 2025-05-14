import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './MeditationsPage.css'

const meditationOptions = {
  'Stress Relief': {
    short: {
      title: '5-Minute Stress Relief',
      description: 'A quick meditation to help you release tension and find calm.',
      type: 'video',
      url: 'https://player.vimeo.com/external/517090081.sd.mp4?s=2ec32ea27c9eaa5f1deb3d5b6d424f277f756a28&profile_id=165&oauth2_token_id=57447761'
    },
    medium: {
      title: '15-Minute Deep Relaxation',
      description: 'A guided practice for deep relaxation and stress release.',
      type: 'audio',
      url: 'https://example.com/meditations/stress-relief-15min.mp3'
    },
    long: {
      title: '20-Minute Complete Unwinding',
      description: 'A comprehensive session for total stress relief and relaxation.',
      type: 'video',
      url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=165&oauth2_token_id=57447761'
    }
  },
  'Sleep': {
    short: {
      title: '5-Minute Bedtime Relaxation',
      description: 'A quick practice to prepare your mind for sleep.',
      type: 'audio',
      url: 'https://example.com/meditations/sleep-5min.mp3'
    },
    medium: {
      title: '10-Minute Sleep Journey',
      description: 'A guided meditation to help you drift into peaceful sleep.',
      type: 'video',
      url: 'https://player.vimeo.com/external/371899194.sd.mp4?s=76808e8f06b211cd9654130a598966a60b304724&profile_id=165&oauth2_token_id=57447761'
    },
    long: {
      title: '20-Minute Deep Sleep Preparation',
      description: 'A comprehensive practice for quality sleep.',
      type: 'audio',
      url: 'https://example.com/meditations/sleep-20min.mp3'
    }
  },
  'Focus': {
    short: {
      title: '5-Minute Focus Boost',
      description: 'A quick meditation to sharpen your concentration.',
      type: 'video',
      url: 'https://player.vimeo.com/external/477730641.sd.mp4?s=e25c58c14198f3bd0d6f8f768ef0f668f9795b7c&profile_id=165&oauth2_token_id=57447761'
    },
    medium: {
      title: '15-Minute Mind Clarity',
      description: 'A guided session to enhance focus and mental clarity.',
      type: 'audio',
      url: 'https://example.com/meditations/focus-15min.mp3'
    },
    long: {
      title: '20-Minute Deep Focus',
      description: 'A comprehensive practice for sustained concentration.',
      type: 'video',
      url: 'https://player.vimeo.com/external/499581013.sd.mp4?s=f1fe5d1333c15d45e5c361c02140c5a9e2e7e0f9&profile_id=165&oauth2_token_id=57447761'
    }
  },
  'Anxiety': {
    short: {
      title: '5-Minute Anxiety Relief',
      description: 'A quick practice to calm anxious thoughts.',
      type: 'audio',
      url: 'https://example.com/meditations/anxiety-5min.mp3'
    },
    medium: {
      title: '15-Minute Anxiety Management',
      description: 'A guided session for managing anxiety and finding peace.',
      type: 'video',
      url: 'https://player.vimeo.com/external/436589340.sd.mp4?s=7dc54c37b1c3459f27804e5b8a2c7c4765e2f388&profile_id=165&oauth2_token_id=57447761'
    },
    long: {
      title: '20-Minute Complete Calm',
      description: 'A comprehensive practice for anxiety relief.',
      type: 'audio',
      url: 'https://example.com/meditations/anxiety-20min.mp3'
    }
  }
}

const MeditationsPage = () => {
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [showPlayer, setShowPlayer] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    document.title = 'Guided Meditations - Mindful Space'
    window.scrollTo(0, 0)
  }, [])

  const handleStartMeditation = () => {
    setShowPlayer(true)
  }

  const resetSelections = () => {
    setSelectedGoal('')
    setSelectedDuration('')
    setShowPlayer(false)
  }

  const getMeditationContent = () => {
    if (!selectedGoal || !selectedDuration) return null
    return meditationOptions[selectedGoal][selectedDuration]
  }

  const meditationContent = getMeditationContent()

  const renderMediaPlayer = () => {
    if (!meditationContent) return null

    if (meditationContent.type === 'video') {
      return (
        <video
          controls
          className="video-player"
          src={meditationContent.url}
          autoPlay
        >
          Your browser does not support the video element.
        </video>
      )
    }

    return (
      <audio
        controls
        className="audio-player"
        src={meditationContent.url}
        autoPlay
      >
        Your browser does not support the audio element.
      </audio>
    )
  }

  return (
    <div className="meditations-page">
      <div className="container">
        <div className="meditations-header">
          <h1>Guided Meditations</h1>
          <p>Choose your meditation goal and duration to begin your practice.</p>
        </div>

        <motion.div
          className="meditation-selector"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="selector-group">
            <label htmlFor="goal">What's your goal?</label>
            <select
              id="goal"
              value={selectedGoal}
              onChange={(e) => {
                setSelectedGoal(e.target.value)
                setShowPlayer(false)
              }}
            >
              <option value="">Select a goal</option>
              {Object.keys(meditationOptions).map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label htmlFor="duration">How long do you have?</label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => {
                setSelectedDuration(e.target.value)
                setShowPlayer(false)
              }}
              disabled={!selectedGoal}
            >
              <option value="">Select duration</option>
              <option value="short">Short (2-5 minutes)</option>
              <option value="medium">Medium (10-15 minutes)</option>
              <option value="long">Long (20+ minutes)</option>
            </select>
          </div>

          {selectedGoal && selectedDuration && !showPlayer && (
            <motion.div
              className="meditation-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2>{meditationContent.title}</h2>
              <p>{meditationContent.description}</p>
              <div className="meditation-type">
                Type: {meditationContent.type === 'video' ? '🎥 Video' : '🎧 Audio'} Meditation
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleStartMeditation}
              >
                Start Meditation
              </button>
            </motion.div>
          )}

          {showPlayer && (
            <motion.div
              className="meditation-player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="player-header">
                <h2>{meditationContent.title}</h2>
                <button 
                  className="btn btn-outline"
                  onClick={resetSelections}
                >
                  Choose Different Meditation
                </button>
              </div>
              {renderMediaPlayer()}
              <p className="player-description">{meditationContent.description}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default MeditationsPage