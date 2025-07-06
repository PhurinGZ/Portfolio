import React, { useState } from "react";
import { ExternalLink, Github, Star, Eye } from "lucide-react";

export const ProjectCard = ({ title, imageSrc, description, tags, link, githubLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Liquid Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-110 animate-pulse"></div>
      
      {/* Floating Orbs */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-all duration-700 animate-float"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-all duration-700 animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Card Content */}
      <div className="relative h-full backdrop-blur-2xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-600/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105">
        {/* Enhanced Image Container */}
        <div className="relative w-full h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift"></div>
          
          <div 
            className={`relative w-full h-full transition-all duration-1000 ${
              isHovered ? "scale-110 rotate-1" : "scale-100 rotate-0"
            }`}
          >
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-full object-cover transition-all duration-1000"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2 animate-bounce">💻</div>
                  <span className="text-white text-lg font-medium">{title}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end z-20">
            <div className="p-6 text-white w-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-700">
              <p className="text-sm leading-relaxed font-medium backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/20">
                {description}
              </p>
            </div>
          </div>
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            {githubLink && (
              <a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                style={{ transitionDelay: '0.1s' }}
              >
                <Github size={16} className="text-white" />
              </a>
            )}
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                style={{ transitionDelay: '0.2s' }}
              >
                <ExternalLink size={16} className="text-white" />
              </a>
            )}
          </div>
        </div>
        
        {/* Enhanced Card Body */}
        <div className="relative p-6 space-y-4">
          {/* Liquid Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-700/5 dark:to-gray-700/10 backdrop-blur-sm"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 animate-gradient-text">
                {title}
              </h3>
              
              {/* Interactive Stats */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Star size={12} className="text-yellow-500" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Eye size={12} className="text-blue-500" />
                  <span>1.2k</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/30 dark:border-gray-600/30 text-blue-700 dark:text-blue-300 hover:scale-110 transition-all duration-500 transform hover:rotate-3 shadow-lg hover:shadow-xl"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'float 3s ease-in-out infinite'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Progress Bar Effect */}
            <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 transform origin-left"
                style={{
                  width: isHovered ? '100%' : '0%'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced CSS Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.25);
        }
        
        .animate-gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 300% 300%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};