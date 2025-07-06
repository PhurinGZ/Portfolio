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
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [mobileMenuOpen]);

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
            ? "py-2 sm:py-2.5 backdrop-blur-3xl bg-white/80 dark:bg-gray-950/80 border-b border-white/20 dark:border-gray-800/50 shadow-2xl shadow-blue-500/5"
            : "py-3 sm:py-4 bg-transparent"
        }`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 backdrop-blur-3xl"></div>

        {/* Floating glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo - Better responsive sizing */}
            <div
              className="relative group cursor-pointer flex-shrink-0"
              onClick={() => scrollToSection("home")}
            >
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
              <div className="relative backdrop-blur-2xl bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group-hover:bg-white/20 dark:group-hover:bg-gray-800/20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 dark:text-blue-400 animate-pulse" />
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-sm sm:blur-md animate-ping"></div>
                  </div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                    Portfolio
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              {/* Desktop Navigation - Hidden on smaller screens */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative group px-3 xl:px-4 py-2.5 font-medium transition-all duration-500 transform hover:scale-105 rounded-xl ${
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

              {/* Tablet Navigation - Shows on md but hidden on lg+ */}
              <nav className="hidden md:flex lg:hidden items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative group p-2.5 font-medium transition-all duration-500 transform hover:scale-105 rounded-xl ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    title={item.name}
                  >
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>

                    {/* Content - Icon only for tablet */}
                    <div className="relative">
                      <span className="opacity-70 group-hover:opacity-100 transition-all duration-300">
                        {item.icon}
                      </span>
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

              {/* Theme Toggle - Responsive sizing */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative inline-flex h-8 w-16 sm:h-10 sm:w-20 items-center rounded-full backdrop-blur-2xl bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 p-1 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="sr-only">Toggle theme</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span
                  className={`${
                    darkMode
                      ? "translate-x-8 sm:translate-x-10"
                      : "translate-x-0"
                  } relative inline-flex h-6 w-6 sm:h-8 sm:w-8 transform rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-all duration-500 items-center justify-center`}
                >
                  {darkMode ? (
                    <Moon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  ) : (
                    <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                  )}
                </span>
              </button>

              {/* Mobile menu button - Better touch target */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative p-2.5 sm:p-3 rounded-xl backdrop-blur-2xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  {mobileMenuOpen ? (
                    <X
                      size={18}
                      className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300"
                    />
                  ) : (
                    <Menu
                      size={18}
                      className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300"
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Fixed positioning */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu container */}
          <div className="relative flex-1 flex flex-col">
            {/* Spacer for navbar */}
            <div className="h-20 sm:h-24"></div>

            {/* Menu content */}
            <div className="flex-1 bg-white/95 dark:bg-gray-950/95 backdrop-blur-3xl border-y border-white/20 dark:border-gray-800/50 shadow-2xl">
              <div className="relative h-full">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

                {/* Menu items */}
                <div className="relative p-4 space-y-2 max-h-full">
                  {navItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group block w-full text-left px-6 py-5 font-medium transition-all duration-500 rounded-xl backdrop-blur-sm transform hover:scale-105 active:scale-95 ${
                        activeSection === item.id
                          ? "text-blue-600 dark:text-blue-400 bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40 shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/20 dark:hover:bg-gray-800/20 border border-transparent hover:border-white/30 dark:hover:border-gray-600/30"
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: `slideInRight 0.5s ease-out ${
                          index * 0.1
                        }s both`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                          {item.icon}
                        </span>
                        <span className="text-base sm:text-lg">
                          {item.name}
                        </span>
                        {activeSection === item.id && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Custom Styles */}
      <style>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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

        /* Touch optimization */
        @media (hover: none) and (pointer: coarse) {
          .group:hover .group-hover\\:opacity-100 {
            opacity: 1;
          }
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.1);
          }
          .group:hover .group-hover\\:bg-white\\/20 {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .group:hover .group-hover\\:bg-gray-800\\/20 {
            background-color: rgba(31, 41, 55, 0.2);
          }
        }

        /* Improve touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
        }

        /* Smooth transitions for theme switching */
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        /* Ensure mobile menu is always visible */
        @media (max-width: 768px) {
          .fixed.inset-0.z-\\[60\\] {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 60 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
