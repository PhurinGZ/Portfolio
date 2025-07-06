"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  imageSrc?: string;
  description: string;
  tags: string[];
  link?: string;
  githubLink?: string;
  stats?: {
    stars?: number;
    views?: number;
  };
}

export const ProjectCard = memo<ProjectCardProps>(({
  title,
  imageSrc,
  description,
  tags,
  link,
  githubLink,
  // stats = { stars: 0, views: 0 }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

// console.log(description)

  return (
    <motion.div 
      className="group relative h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Single Floating Orb */}
      <motion.div 
        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        animate={isHovered ? { y: [-5, 5, -5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Card Content */}
      <div className="relative h-full backdrop-blur-lg bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-600/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
        
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          
          {/* Static Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          
          <motion.div 
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {imageSrc ? (
              <Image 
                src={imageSrc} 
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">💻</div>
                  <span className="text-white text-lg font-medium">{title}</span>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end z-20">
            <div className="p-4 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm leading-relaxed backdrop-blur-sm bg-black/20 rounded-lg p-3 border border-white/20">
                {description}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            {githubLink && (
              <motion.a 
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} className="text-white" />
              </motion.a>
            )}
            {link && (
              <motion.a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full backdrop-blur-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} className="text-white" />
              </motion.a>
            )}
          </div>
        </div>
        
        {/* Card Body */}
        <div className="relative p-6 space-y-4">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-gray-700/5 dark:to-gray-700/10" />
          
          <div className="relative">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
              {title}
            </h3>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/30 dark:border-gray-600/30 text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 group-hover:w-full w-0"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});


ProjectCard.displayName = "ProjectCard"