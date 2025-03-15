import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold mb-8">Scroll.Ai</h1>
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
