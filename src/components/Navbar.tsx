import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'py-3 backdrop-blur-3xl bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20 shadow-2xl' 
          : 'py-6 bg-transparent'
      }`}>
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Enhanced Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
            <div className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-xl px-6 py-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x cursor-pointer">
                Portfolio
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { name: 'Home', id: 'home', icon: '🏠' },
                { name: 'About', id: 'about', icon: '👨‍💻' },
                { name: 'Projects', id: 'projects', icon: '🚀' },
                { name: 'Contact', id: 'contact', icon: '📧' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-500 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                  <div className="relative flex items-center gap-2">
                    <span className="text-sm opacity-70 group-hover:opacity-100 transition-all duration-300">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-all duration-500 rounded-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Enhanced Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative inline-flex h-12 w-24 items-center rounded-2xl backdrop-blur-2xl bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 p-1 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <span className="sr-only">Toggle theme</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <span
                className={`${
                  darkMode ? "translate-x-12" : "translate-x-0"
                } relative inline-block h-10 w-10 transform rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-all duration-500 flex items-center justify-center`}
              >
                {darkMode ? (
                  <Moon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-3xl bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20 shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative px-6 py-6 space-y-2">
                {[
                  { name: 'Home', id: 'home', icon: '🏠' },
                  { name: 'About', id: 'about', icon: '👨‍💻' },
                  { name: 'Projects', id: 'projects', icon: '🚀' },
                  { name: 'Contact', id: 'contact', icon: '📧' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group block w-full text-left px-6 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-500 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm border border-transparent hover:border-white/30 dark:hover:border-gray-600/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg group-hover:scale-110 transition-all duration-300">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced CSS Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Navbar;