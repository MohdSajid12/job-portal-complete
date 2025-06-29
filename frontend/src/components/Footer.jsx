import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-2 text-center">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by <strong>Sajid Shaikh</strong>
        </p>

        <div className="flex gap-4 mt-2">
          <a
             href="https://github.com/MohdSajid12" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub size={20} />
          </a>
          <a
           
             href="https://www.linkedin.com/in/mohammad-sajid-228346192/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} Sajid Shaikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
