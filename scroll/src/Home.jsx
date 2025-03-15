import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link to="/content" className="text-3xl font-bold text-blue-500">
        Go to Content
      </Link>
    </div>
  );
}

export default Home;
