import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Scroll.Ai
      </h1>
      <h2 className="text-xl font-bold mb-8 text-gray-700">
        Focus on learning, we'll keep you focused.
      </h2>
      <input
        type="text"
        placeholder="I would like to learn about..."
        className="w-1/2 p-4 border border-gray-300 rounded-full focus:outline-none mb-8"
      />
      <div className="flex space-x-4">
        <Link to="/content" className="px-6 py-2 bg-blue-500 text-white rounded-full">
          Search
        </Link>
      </div>
    </div>
  );
}

export default Home;
