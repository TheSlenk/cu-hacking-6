import { FaHome, FaSearch, FaPlus, FaUser, FaBars, FaHistory, FaCode, FaCalculator, FaPeopleArrows, FaMoneyBill } from 'react-icons/fa';
import '../App.css';
import vid1 from '../assets/sampleVideos/sampleVideo1.mp4';
import vid2 from '../assets/sampleVideos/sampleVideo2.mp4';
import vid3 from '../assets/sampleVideos/minecraft.mp4';
const videos = [vid3, vid1, vid2];
import StarryBackground from '../components/StarryBackground';
import { useDispatch, useSelector } from "react-redux";
import { setIsPaused, setIsSpeaking } from "../redux/actions";
import TimedSpeech from '../components/TimedSpeech';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FaceStatus from './FaceStatus';
import dingSound from "../assets/BellSound.mp3";
import "./Content.css";

export function Content() {
  const [status, setStatus] = useState('Loading...');

  // useEffect for fetching face status
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

    // Play a sound when the status changes to a specific condition
    useEffect(() => {
      if (status === "Looking Left" || status === "Looking Right") {
        const sound = new Audio(dingSound);
        sound.play().catch(error => console.error("Error playing sound:", error));
      }
    }, [status]); // Runs when `status` changes


  const dispatch = useDispatch();
  const [videoIndex, setVideoIndex] = useState(null); // Track which video is playing
  const isSpeaking = useSelector((state) => state.isSpeaking); // Redux state to track speaking status
  const isPaused = useSelector((state) => state.isPaused); // Redux state to track paused status
  const topic = useSelector((state) => state.topic); // Redux state to track current topic

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
  console.log(isPaused)
  const [counter, setCounter] = useState(0);

  // useEffect for updating counter when status changes to a specific condition
  useEffect(() => {
    if (status === "Looking Left" || status === "Looking Right") {
      setCounter(prevCounter => prevCounter + 1);
    }
  }, [status]);

  return (
    <div className='flex'>
      <div className='flex flex-col flex-1 ml-6 mt-6'>
        <div className='flex mb-8 items-center'>
          <div className='hover:bg-gray-200 rounded'>
            <FaBars size={24} />
          </div>
          <div className='ml-4 text-2xl font-semibold'>Scroll.Ai</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaHome size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Home</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaSearch size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Search</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaHistory size={16} className='ml-1 mr-1' />
          <div className='ml-4'>History</div>
        </div>

        <div className='flex items-center mt-6 mb-3 text-lg font-semibold'>
          Explore Topics
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCode size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Programming</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCode size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Data Structures & Algorithms</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCode size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Embedded Systems</div>
        </div>

        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCalculator size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Calculus</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCalculator size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Linear Algebra</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaCalculator size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Statistics</div>
        </div>

        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded'>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Psychology</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded'>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Anthropology</div>
        </div>
        <div className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded'>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Sociology</div>
        </div>

        <div className='flex items-center mb-2 text-lg hover:bg-gray-200 rounded'>
          <FaMoneyBill size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Accounting</div>
        </div>

      </div>
      <div className="flex flex-1 h-screen w-screen overflow-hidden flex-col items-center justify-center relative bg-white">
        {/* Background */}
      <StarryBackground />

      {/* Video Content */}
      <div className="flex justify-center items-center w-[400px] h-[650px] relative">
        <div className="flex-1 overflow-y-auto snap-y snap-mandatory h-full mt-16 mb-12 overflow-x-hidden rounded-3xl scrollbar-hidden bg-black">
          {videos.map((video, index) => (
            <div key={index} className="h-full flex items-center justify-center bg-gray-100 snap-start w-full">
              <div className="w-full h-full flex items-center relative rounded-3xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  onPause={() => dispatch(setIsPaused(true))}
                  onPlay={() => {
                    dispatch(setIsPaused(false));
                    startVideo(index);
                  }}
                  ref={(el) => {
                    if (el) {
                      el.onclick = () => {
                        if (el.paused) {
                          el.play();
                        } else {
                          el.pause();
                        }
                      };
                    }
                  }}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay for "Look Here" */}
                {(status === 'Looking Left' || status === 'Looking Right') && (
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-300 bg-opacity-75 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold">Look Here</p>
                  </div>
                )}

                {/* Start button */}
                <div className='absolute bottom-24 w-full flex justify-center'>

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

    </div>
    <div className='flex flex-1 flex-col justify-center'>
      {/* Video Feed Overlay */}
      <img 
          src="http://localhost:5000/video_feed" 
          alt="Webcam Feed" 
          className="w-full h-full object-cover"
        />

      {/* Bottom Clicky bar for home stuff */}
      {/* <div className="w-full bg-gray-900 text-white flex justify-around p-3 z-10">
        <FaHome size={24} />
        <FaSearch size={24} />
        <FaPlus size={24} />
        <FaUser size={24} />
      </div> */}
        <div className='items-center text-lg font-semibold text-center bg-gray-900 text-white'>
          Distraction Counter: {counter} times
        </div>
    </div>
    </div>
  );
}

export default Content;