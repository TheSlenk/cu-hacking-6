import { FaHome, FaSearch, FaPlus, FaUser, FaBars, FaHistory, FaCode, FaCalculator, FaPeopleArrows, FaMoneyBill, FaLeaf } from 'react-icons/fa';
import '../App.css';
import vid1 from '../assets/sampleVideos/minecraft.mp4';
import vid2 from '../assets/sampleVideos/minecraft2.mp4';
import vid3 from '../assets/sampleVideos/sub1.mp4';
import vid4 from '../assets/sampleVideos/sub2.mp4';
import vid5 from '../assets/sampleVideos/lebron.mp4';
const videos = [vid4, vid3, vid1, vid2, vid5].sort(() => Math.random() - 0.5);

import StarryBackground from '../components/StarryBackground';
import { useDispatch, useSelector } from "react-redux";
import { setIsPaused, setIsSpeaking } from "../redux/actions";
import TimedSpeech from '../components/TimedSpeech';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FaceStatus from './FaceStatus';
import dingSound from "../assets/BellSound.mp3";
import "./Content.css";
import { Link } from "react-router";
import FocusBuddy from '/focusbuddy.png';

export function Content() {
  const [status, setStatus] = useState('Loading...');
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [videoIndex, setVideoIndex] = useState(null); // Track which video is playing
  const isSpeaking = useSelector((state) => state.isSpeaking); // Redux state to track speaking status
  const isPaused = useSelector((state) => state.isPaused); // Redux state to track paused status
  const topic = useSelector((state) => state.topic); // Redux state to track current topic

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
    
    const fetchTopicData = async () => {
      const segments = window.location.pathname.split('/').filter(Boolean);
      const path = segments[1] || '';
      try {
        const response = await fetch(`http://localhost:8080/home`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path })
        });
        console.log("Fetched topic data:", response.data);
        setData(response.data);
        console.log("Fetching topic data for path:", path);
        // Add additional handling for the fetched data here if needed
      } catch (error) {
        console.error("Error fetching topic data:", error);
      }
    };

    fetchTopicData();

    return () => clearInterval(interval);
  }, []);

    // Play a sound when the status changes to a specific condition
    useEffect(() => {
      if (status === "Looking Left" || status === "Looking Right") {
        const sound = new Audio(dingSound);
        sound.play().catch(error => console.error("Error playing sound:", error));
      }
    }, [status]); // Runs when `status` changes

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
      // A test base64 image (a small red dot PNG)
      "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HwAGgwJ/lAq5VAAAAABJRU5ErkJggg=="
    },
    {
      "text": "Plants use sunlight, water, and carbon dioxide...",
      "time": 5,
      "image": null
    },
    {
      "text": "...to create their own food and release oxygen, the air we breathe.",
      "time": 10,
      "image": null
    },
    {
      "text": "This process happens in tiny organelles called chloroplasts, found in plant cells.",
      "time": 17,
      "image": null
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
          <div className='flex gap-4'>
            <div className='ml-4 text-2xl font-semibold'>Focus Buddy</div>
            <img className="w-8" src={FocusBuddy} alt="logo" />
          </div>
        </div>
        <Link to={`/`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96'>
          <FaHome size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Home</div>
        </Link>
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
        <Link to={`/content/web development`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/web development`}>
            <FaCode size={16} className='ml-1 mr-1' />
            <div className='ml-4'>Web Development</div>
        </Link>
        <Link to={`/content/data structures`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/data structures`}>
          <FaCode size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Data Structures</div>
        </Link>
        <Link to={`/content/embedded systems`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/embedded systems`}>
          <FaCode size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Embedded Systems</div>
        </Link>

        <Link to={`/content/integral calculus`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/integral calculus`}>
          <FaCalculator size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Integral Calculus</div>
        </Link>
        <Link to={`/content/matrix theory`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/matrix theory`}>
          <FaCalculator size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Matrix Theory</div>
        </Link>
        <Link to={`/content/plant biology`}  className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded w-96' onClick={() => window.location.href = `/content/plant biology`}>
          <FaLeaf size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Plant Biology</div>
        </Link>        

        <Link to={`/content/cognitive behavioral psychology`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded' onClick={() => window.location.href = `/content/cognitive behavioral psychology`}>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Cognitive Behavioral Psychology</div>
        </Link>

        <Link to={`/content/evolutionary anthropology`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded' onClick={() => window.location.href = `/content/evolutionary anthropology`}>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Evolutionary Anthropology</div>
        </Link>

        <Link to={`/content/critical social theory`} className='flex items-center mb-3 text-lg hover:bg-gray-200 rounded' onClick={() => window.location.href = `/content/critical social theory`}>
          <FaPeopleArrows size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Critical Social Theory</div>
        </Link>

        <Link to={`/content/forensic accounting`} className='flex items-center mb-2 text-lg hover:bg-gray-200 rounded' onClick={() => window.location.href = `/content/forensic accounting`}>
          <FaMoneyBill size={16} className='ml-1 mr-1' />
          <div className='ml-4'>Forensic Accounting</div>
        </Link>

      </div>
      <div className="flex flex-1 h-screen w-screen overflow-hidden flex-col items-center justify-center relative bg-white">

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
                <div className='absolute bottom-60 w-full flex justify-center'>

                  {/* Timed Speech Component */}
                  {videoIndex === index && isSpeaking && data &&(
                    <TimedSpeech data={data} />
                  ) || <h2> Loading </h2>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    <div className='flex flex-1 flex-col justify-center pr-8'>
        <div className='items-center text-lg font-semibold text-center bg-gray-900 text-white py-2 rounded-tl-3xl rounded-tr-3xl'>
          Distraction Counter: {counter} times
        </div>
      
      {/* Video Feed Overlay */}
        <img 
            src="http://localhost:5000/video_feed" 
            alt="Webcam Feed" 
            className="w-full h-100vh object-cover rounded-bl-3xl rounded-br-3xl"
          />

        {/* Bottom Clicky bar for home stuff */}
      {/* <div className="w-full bg-gray-900 text-white flex justify-around p-3 z-10">
        <FaHome size={24} />
        <FaSearch size={24} />
        <FaPlus size={24} />
        <FaUser size={24} />
      </div> */}
        
    </div>
    </div>
  );
}

export default Content;