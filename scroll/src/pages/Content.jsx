import { FaHome, FaSearch, FaPlus, FaUser } from 'react-icons/fa';
import '../App.css';

function Content() {
  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col">
      {/* the search bar so we can queue the topics */}
      <div className="p-4 bg-white bg-opacity-50 backdrop-blur-md shadow-md fixed top-0 w-full z-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {/* the video scroller content itself */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory h-full mt-16 mb-12">
        {[1, 2, 3, 4, 5].map((video, index) => (
          <div key={index} className="h-screen flex items-center justify-center bg-gray-100 snap-start w-full">
            <h1 className="text-3xl font-bold">Video {video}</h1>
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
