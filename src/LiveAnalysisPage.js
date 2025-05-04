import React, { useState } from 'react';
import './App.css';

function LiveAnalysisPage() {
  const [exercise, setExercise] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleExerciseChange = (event) => {
    const value = event.target.value;
    setExercise(value);

    let fb = '';
    if (value === 'Squat') {
      fb = 'Keep your back straight and lower your hips.';
    } else if (value === 'Push-Up') {
      fb = 'Maintain a straight body line and bend your elbows to 90 degrees.';
    } else if (value === 'Lunge') {
      fb = 'Ensure your front knee is at a 90-degree angle.';
    }
    setFeedback(fb);

    if (value && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(fb);
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakFeedback = () => {
    if (feedback && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(feedback);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="live-analysis-page">
      <div className="analysis-container">
        {/* Camera Feed */}
        <iframe
          className="camera-feed"
          src="http://127.0.0.1:8000/live-analysis"
          title="Live Analysis"
        ></iframe>

        {/* Exercise Dropdown */}
        <div className="dropdown-container">
          <label htmlFor="exercise-select"><strong>Choose an exercise:</strong></label>
          <select id="exercise-select" value={exercise} onChange={handleExerciseChange}>
            <option value="">-- Select --</option>
            <option value="Squat">Squat</option>
            <option value="Push-Up">Push-Up</option>
            <option value="Lunge">Lunge</option>
          </select>
        </div>

        {/* Feedback Box */}
        <div className="feedback-box">
          <h3>Feedback</h3>
          <p>{feedback || 'Select an exercise to see feedback.'}</p>
          <button onClick={speakFeedback}>🔊 Speak Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default LiveAnalysisPage;
