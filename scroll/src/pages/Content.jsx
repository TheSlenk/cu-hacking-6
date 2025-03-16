import { FaHome, FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import '../App.css';
import vid1 from '../assets/sampleVideos/sampleVideo1.mp4';
import vid2 from '../assets/sampleVideos/sampleVideo2.mp4';
const videos = [vid1, vid2];
import StarryBackground from '../components/StarryBackground';
import { useDispatch, useSelector } from "react-redux";
import { setIsSpeaking } from "../redux/actions";
import TimedSpeech from '../components/TimedSpeech';
import { useState } from 'react';

function Content() {
  const dispatch = useDispatch();
  const [videoIndex, setVideoIndex] = useState(null); // Track which video is playing
  const isSpeaking = useSelector((state) => state.isSpeaking); // Redux state to track speaking status

  const startVideo = (index) => {
    if (!isSpeaking) { // Check if it's already speaking
      dispatch(setIsSpeaking(true));
      setVideoIndex(index); // Set the current video index
    }
  }

  const testData = [
    {
      "text": "Let's talk about the incredible world of photosynthesis!",
      "time": 0,
      "image": "A vibrant green leaf with sunlight shining on it."
    },
    {
      "text": "Plants use sunlight, water, and carbon dioxide...",
      "time": 5,
      "image": null
    },
    {
      "text": "...to create their own food and release oxygen, the air we breathe.",
      "time": 10,
      "image": "A simplified diagram of the photosynthesis process, showing inputs and outputs."
    },
    {
      "text": "This process happens in tiny organelles called chloroplasts, found in plant cells.",
      "time": 17,
      "image": "Close up of a plant cell with chloroplasts highlighted."
    },
    {
      "text": "Inside, chlorophyll absorbs sunlight, powering the conversion of CO2 and water into sugars.",
      "time": 23,
      "image": null
    },
    {
      "text": "Photosynthesis: the engine of life on Earth!",
      "time": 27,
      "image": null
    }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col items-center justify-center relative">
      {/* Background */}
      <StarryBackground />

      {/* Video Content */}
      <div className='flex justify-center items-center w-[400px] h-[650px] relative'>
        <div className="flex-1 overflow-y-auto snap-y snap-mandatory h-full mt-16 mb-12 overflow-x-hidden rounded-2xl">
          {videos.map((video, index) => (
            <div key={index} className="h-full flex items-center justify-center bg-gray-100 snap-start w-full">
              <div className="w-full h-full flex items-center relative">
                {/* The video player */}
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

                {/* Start button */}
                <div className='absolute bottom-4 w-full flex justify-center'>
                  <button 
                    onClick={() => startVideo(index)} // Pass the index of the video
                    className="bg-white text-black p-3 rounded-lg shadow-md"
                  >
                    Start Video
                  </button>

                  {/* Timed Speech Component */}
                  {videoIndex === index && isSpeaking && (
                    <TimedSpeech data={testData} />
                  )}
                </div>
                
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
  );
}

export default Content;
