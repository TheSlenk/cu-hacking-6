import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import StarryBackground from '../components/StarryBackground';

function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center relative">
      <StarryBackground />
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <div className="gap-12 w-[800px] fade-in h-[450px] bg-black/10 bg-blur-xl rounded-[65px] border-1 border-gray-400 backdrop-blur-xl flex flex-col justify-center items-center">
          <div className="px-32 text-center z-10 max-h-[6rem] overflow-hidden">
            <DecryptedText
              className="text-4xl font-bold text-white"
              encryptedClassName="text-4xl font-bold text-white"
              text="Welcome to Scroll... your new AI learning platform"
              animateOn="view"
              revealDirection="center"
            />
          </div>
          <input
            type="text"
            placeholder="I would like to learn about..."
            className="mt-3 w-[550px] p-4 border border-2 border-gray-300 text-white rounded-xl focus:outline-none"
          />
          <div className="flex space-x-4">
            <Link to="/content" className="px-6 py-2 bg-white rounded-lg">
              Search
            </Link>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Home;
