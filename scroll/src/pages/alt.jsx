import { FaHome, FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import '../App.css';
import vid1 from '../assets/sampleVideos/sampleVideo1.mp4';
import vid2 from '../assets/sampleVideos/sampleVideo2.mp4';
const videos = [vid1, vid2];
import StarryBackground from '../components/StarryBackground';
import FaceStatus from './FaceStatus';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Content() {
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
    <>
      {/* <FaceStatus/> */}
      <div className="flex h-screen w-screen overflow-hidden flex-col items-center justify-center relative">

        {/* the search bar so we can queue the topics */}
        <StarryBackground />
          {/* <div className="p-4 bg-white bg-opacity-50 backdrop-blur-md shadow-md fixed top-0 w-full z-10">
            <div className='flex border border-gray-300 pr-4 items-center'>
              <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-md focus:outline-none"
              />
            <div>
            <FaSearch size={16} className='text-gray-500' />
              </div>
            </div>
          </div> */}

          {/* the video scroller content itself */}
          <div className='flex justify-center items-center w-[400px] h-[650px] relative'>
            <div className="flex-1 overflow-y-auto snap-y snap-mandatory h-full mt-16 mb-12 overflow-x-hidden rounded-2xl">
                {videos.map((video, index) => (
              <div key={index} className="h-full flex items-center justify-center bg-gray-100 snap-start w-full">
                <div className="w-full h-full flex items-center">
                <video
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  onLoadedData={() => console.log(`Video ${index + 1} loaded successfully`)}
                  onError={() => console.error(`Error loading video ${index + 1}`)}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {(status === 'Looking Left' || status === 'Looking Right') && (
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-300 bg-opacity-75 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Look Here</p>
                  </div>
                )}
              </div>
                </div>
              ))}
            </div>
          </div>
            
          {/* Bottom Clicky bar for home stuff */}
        <div className="fixed bottom-0 w-full bg-gray-900 text-white flex justify-around p-3 z-10">
          <FaHome size={24} />
          <FaSearch size={24} />
          <FaPlus size={24} />
          <FaUser size={24} />
        </div>
      </div>
    </>
  );
}

export default Content;
