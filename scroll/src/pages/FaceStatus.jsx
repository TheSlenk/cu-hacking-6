import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaceStatus = () => {
  const [status, setStatus] = useState('Loading...');
  
  // Fetch the face status from Flask API
  useEffect(() => {
    const fetchFaceStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/face-status');
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching face status:', error);
        setStatus('Error fetching face status');
      }
    };

    const interval = setInterval(fetchFaceStatus, 1000); // Fetch face status every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Face Status</h1>
      <p>Status: {status}</p>
      {/* Video feed */}
      <img src="http://localhost:5000/video_feed" alt="Webcam Feed" />
    </div>
  );
};

export default FaceStatus;
