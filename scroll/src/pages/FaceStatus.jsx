import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaceStatus = () => {
  const [status, setStatus] = useState('Loading...');

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

    const interval = setInterval(fetchFaceStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Video feed */}
      <img src="http://localhost:5000/video_feed" alt="Webcam Feed" className="w-full h-auto" />

      {/* Overlay for "Look Here" */}
      {(status === 'Looking Left' || status === 'Looking Right') && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
          <p className="text-white text-2xl font-bold">Look Here</p>
        </div>
      )}

      {/* Status Text */}
      <h1 className="mt-4 text-xl">Face Status: {status}</h1>
    </div>
  );
};

export default FaceStatus;
