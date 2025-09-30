import { useState } from 'react';

function App() {
  const [apiStatus, setApiStatus] = useState('Click the button to check...');
  const [errorMessage, setErrorMessage] = useState('');

  // This line reads the backend URL from the environment variables you will set in Vercel
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const checkApiHealth = async () => {
    setApiStatus('Checking...');
    setErrorMessage('');

    if (!apiBaseUrl) {
      setErrorMessage('Error: VITE_API_BASE_URL is not configured in your frontend environment.');
      setApiStatus('Configuration Error');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setApiStatus(`Success: ${data.status}`);
    } catch (error) {
      console.error("Failed to fetch API status:", error);
      setErrorMessage(`Failed to connect to the API. Details: ${error.message}`);
      setApiStatus('Connection Failed');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>MCE Student Portal</h1>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: 'auto' }}>
        <h2>Backend Health Check</h2>
        <p>
          <strong>API URL:</strong> <code>{apiBaseUrl || 'Not Set'}</code>
        </p>
        <p>
          <strong>Status:</strong> <span style={{ color: apiStatus.startsWith('Success') ? 'green' : 'red', fontWeight: 'bold' }}>{apiStatus}</span>
        </p>
        <button onClick={checkApiHealth} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Check API Connection
        </button>
        {errorMessage && <p style={{ color: 'red', marginTop: '15px' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;