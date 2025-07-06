import React, { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight, Filter, Grid, List } from "lucide-react";

export const ProjectsCarousel = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterTag, setFilterTag] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState([]);

  const projects = [
    {
      title: "Web Novel Application",
      imageSrc: "/api/placeholder/400/300",
      description: "A sophisticated web application for reading novels online with beautiful typography, dark mode, bookmarks, and an immersive reading experience with customizable themes.",
      tags: ["React", "NextJS", "TailwindCSS", "TypeScript"],
      link: "#",
      githubLink: "https://github.com/example/web-novel"
    },
    {
      title: "LOFI Music Player",
      imageSrc: "/api/placeholder/400/300",
      description: "A captivating music streaming platform with ambient backgrounds, rain sounds, and focus modes. Perfect for productivity and relaxation with curated playlists.",
      tags: ["React JS", "Material UI", "MongoDB", "Node.js"],
      link: "https://github.com/PhurinGZ/LOFI",
      githubLink: "https://github.com/PhurinGZ/LOFI"
    },
    {
      title: "Web Blog Platform",
      imageSrc: "/api/placeholder/400/300",
      description: "A modern blog platform with rich text editing, comment system, user authentication, and responsive design. Built with modern web technologies.",
      tags: ["Node.js", "React.js", "MongoDB", "Express"],
      link: "https://github.com/PhurinGZ/webBlogDemo",
      githubLink: "https://github.com/PhurinGZ/webBlogDemo"
    },
    {
      title: "Portfolio Website",
      imageSrc: "/api/placeholder/400/300",
      description: "Personal portfolio showcase with modern design, smooth animations, interactive elements, and responsive layout. Built with performance in mind.",
      tags: ["NextJS", "TailwindCSS", "Framer Motion", "TypeScript"],
      link: "https://github.com/PhurinGZ/Portfolio",
      githubLink: "https://github.com/PhurinGZ/Portfolio"
    },
    {
      title: "E-Commerce Platform",
      imageSrc: "/api/placeholder/400/300",
      description: "A comprehensive e-commerce solution with product management, shopping cart, payment integration, order tracking, and admin dashboard.",
      tags: ["TailwindCSS", "TypeScript", "MongoDB", "NextJS"],
      link: "https://github.com/Thuje009/project-e-commerce",
      githubLink: "https://github.com/Thuje009/project-e-commerce"
    },
    {
      title: "Task Management App",
      imageSrc: "/api/placeholder/400/300",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      tags: ["React", "Socket.io", "PostgreSQL", "Redux"],
      link: "#",
      githubLink: "https://github.com/example/task-manager"
    }
  ];

  // Get unique tags for filtering
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

  useEffect(() => {
    const filtered = filterTag === 'All' 
      ? projects 
      : projects.filter(project => project.tags.includes(filterTag));
    setVisibleProjects(filtered);
  }, [filterTag]);

  return (
    <div className="space-y-8">
      {/* Enhanced Control Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-500 transform hover:scale-105 ${
                filterTag === tag
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-2 border-white/30'
                  : 'backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30'
              }`}
            >
              <span className="flex items-center gap-2">
                {tag === 'All' && <Filter size={16} />}
                {tag}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Enhanced Projects Grid */}
      <div className="relative">
        {/* Floating Background Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-reverse"></div>

        <div className={`relative grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {visibleProjects.map((project, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {visibleProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              ไม่พบโปรเจคที่ตรงกับฟิลเตอร์ "{filterTag}"
            </p>
            <button 
              onClick={() => setFilterTag('All')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-lg"
            >
              ดูทั้งหมด
            </button>
          </div>
        )}
      </div>

      {/* Project Count */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          แสดง {visibleProjects.length} จาก {projects.length} โปรเจค
        </p>
      </div>

      {/* Enhanced CSS Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};