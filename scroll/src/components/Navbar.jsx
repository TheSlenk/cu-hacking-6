import React from 'react';
import FocusBuddy from '/focusbuddy.png';
const Navbar = () => {
    return (
        <nav className="bg-white/40 p-4 absolute top-10 rounded-full shadow-md border border-2">
            <div className="w-[850px] flex items-center justify-between px-3">
                <div className="text-xl flex gap-3 font-bold ">
                    <h2 className='hover:text-white'>Focus Buddy</h2>
                    <img className='w-8' src={FocusBuddy} alt="FocusBuddy" />
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/about" className="text-gray-800 hover:text-white transition-colors">
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;