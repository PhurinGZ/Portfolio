"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDarkMode(saved);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      window.dispatchEvent(new Event("storage")); 
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("storage"));
    }
  }, [darkMode]);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          My Portfolio
        </h1>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">About</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Projects</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Contact</a>
          </nav>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300 focus:outline-none"
          >
            <span className="sr-only">Toggle theme</span>
            <span
              className={`${
                darkMode ? "translate-x-10" : "translate-x-0"
              } inline-block h-8 w-8 transform rounded-full bg-white dark:bg-gray-800 shadow-md transition-transform duration-300`}
            >
              <span className="flex h-full w-full items-center justify-center">
                {darkMode ? (
                  <span className="text-xl">🌙</span>
                ) : (
                  <span className="text-xl">☀️</span>
                )}
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}