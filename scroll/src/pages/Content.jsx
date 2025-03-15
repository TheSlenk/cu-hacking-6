import { FaHome, FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import '../App.css';
import vid from '../assets/sampleVideos/sampleVideo1.mp4';
const videos = ['../assets/sampleVideos/sampleVideo1.mp4', '../assets/sampleVideos/sampleVideo2.mp4'];

function Content() {
  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col">
      {/* the search bar so we can queue the topics */}
        <div className="p-4 bg-white bg-opacity-50 backdrop-blur-md shadow-md fixed top-0 w-full z-10">
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
        </div>

        {/* the video scroller content itself */}
          <div className="flex-1 overflow-y-auto snap-y snap-mandatory h-full mt-16 mb-12">
            {videos.map((video, index) => (
          <div key={index} className="h-full flex items-center justify-center bg-gray-100 snap-start w-full">
            <div className="w-full h-full flex items-center">
          {/* TODO: remove this later, just for visual counting */}
            <div>{index + 1}</div>
            <video
              controls
              autoPlay
              muted
              className="w-full h-full object-cover"
              onLoadedData={() => console.log(`Video ${index + 1} loaded successfully`)}
              onError={() => console.error(`Error loading video ${index + 1}`)}
            >
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
            </div>
          ))}
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
