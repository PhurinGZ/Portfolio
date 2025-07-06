"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Briefcase,
  Mail,
  Sparkles,
  Wrench,
} from "lucide-react";

interface NavItem {
  name: string;
  id: string;
  icon: React.ReactNode;
}

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Navigation items with proper icons
  const navItems: NavItem[] = [
    { name: "Home", id: "home", icon: <Home size={16} /> },
    // { name: "About", id: "about", icon: <User size={16} /> },
    { name: "Contact", id: "contact", icon: <Mail size={16} /> },
    { name: "Tech Stack", id: "tech-stack", icon: <Wrench size={16} /> },
    { name: "Projects", id: "projects", icon: <Briefcase size={16} /> },
    
  ];

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Handle dark mode
  useEffect(() => {
    // Check system preference on mount
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-2 backdrop-blur-3xl bg-white/80 dark:bg-gray-950/80 border-b border-white/20 dark:border-gray-800/50 shadow-2xl shadow-blue-500/5"
            : "py-4 bg-transparent"
        }`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 backdrop-blur-3xl"></div>

        {/* Floating glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <div
              className="relative group cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
              <div className="relative backdrop-blur-2xl bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-2xl px-6 py-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group-hover:bg-white/20 dark:group-hover:bg-gray-800/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-6 h-6 text-blue-500 dark:text-blue-400 animate-pulse" />
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md animate-ping"></div>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x">
                    Portfolio
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative group px-4 py-2.5 font-medium transition-all duration-500 transform hover:scale-105 rounded-xl ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>

                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                      <span className="opacity-70 group-hover:opacity-100 transition-all duration-300">
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </div>

                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    )}

                    {/* Hover indicator */}
                    <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-all duration-500 rounded-full"></span>
                  </button>
                ))}
              </nav>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative inline-flex h-10 w-20 items-center rounded-full backdrop-blur-2xl bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 p-1 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="sr-only">Toggle theme</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span
                  className={`${
                    darkMode ? "translate-x-10" : "translate-x-0"
                  } relative inline-flex h-8 w-8 transform rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-all duration-500 items-center justify-center`}
                >
                  {darkMode ? (
                    <Moon className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  )}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative p-3 rounded-xl backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  {mobileMenuOpen ? (
                    <X size={20} className="text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Menu
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-3xl bg-white/90 dark:bg-gray-950/90 border-b border-white/20 dark:border-gray-800/50 shadow-2xl transform transition-all duration-500 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <div className="relative px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group block w-full text-left px-6 py-4 font-medium transition-all duration-500 rounded-xl backdrop-blur-sm transform hover:scale-105 ${
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-gray-800/20 border border-transparent hover:border-white/30 dark:hover:border-gray-600/30"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
          }
        }

        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
};

export default Navbar;
