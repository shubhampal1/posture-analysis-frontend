import React, { useState } from 'react';
import './App.css';
import LiveAnalysisPage from './LiveAnalysisPage';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [showLiveAnalysis, setShowLiveAnalysis] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze-posture', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze posture');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while analyzing the posture.');
    }
  };

  if (showLiveAnalysis) {
    return <LiveAnalysisPage />;
  }

  return (
    <div className="main-page">
      <h1>Posture Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Analyze Posture</button>
      </form>

      <button onClick={() => setShowLiveAnalysis(true)}>Open Live Analysis</button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Result</h2>
          <p><strong>Posture:</strong> {result.posture_analysis.posture}</p>
          <p><strong>Details:</strong> {result.posture_analysis.details}</p>
          <p><strong>LLM Insights:</strong> {result.llm_insights}</p>
        </div>
      )}
    </div>
  );
}

export default App;
