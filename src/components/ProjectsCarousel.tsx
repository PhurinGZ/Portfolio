"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, List } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

interface Project {
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

// Memoized filter button component
const FilterButton = memo<{
  tag: string;
  isActive: boolean;
  onClick: (tag: string) => void;
}>(({ tag, isActive, onClick }) => {
  const handleClick = useCallback(() => onClick(tag), [tag, onClick]);
  
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-2 border-white/30"
          : "backdrop-blur-lg bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30"
      }`}
    >
      <span className="flex items-center gap-2">
        {tag === "All" && <Filter size={16} />}
        {tag}
      </span>
    </motion.button>
  );
});

FilterButton.displayName = "FilterButton"

const ProjectsCarousel: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterTag, setFilterTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projects: Project[] = useMemo(() => [
    {
      title: "Web Novel Application",
      imageSrc: "/home-novel.png",
      description: "A sophisticated web application for reading novels online with beautiful typography, dark mode, bookmarks, and an immersive reading experience with customizable themes.",
      tags: ["React", "NextJS", "TailwindCSS", "TypeScript"],
      link: "#",
      githubLink: "https://github.com/example/web-novel",
      stats: { stars: 24, views: 856 },
    },
    {
      title: "LOFI Music Player",
      imageSrc: "/Lofi.png",
      description: "A captivating music streaming platform with ambient backgrounds, rain sounds, and focus modes. Perfect for productivity and relaxation with curated playlists.",
      tags: ["React JS", "Material UI", "MongoDB", "Node.js"],
      link: "https://github.com/PhurinGZ/LOFI",
      githubLink: "https://github.com/PhurinGZ/LOFI",
      stats: { stars: 42, views: 1200 },
    },
    {
      title: "Web Blog Platform",
      imageSrc: "/web-blog.png",
      description: "A modern blog platform with rich text editing, comment system, user authentication, and responsive design. Built with modern web technologies.",
      tags: ["Node.js", "React.js", "MongoDB", "Express"],
      link: "https://github.com/PhurinGZ/webBlogDemo",
      githubLink: "https://github.com/PhurinGZ/webBlogDemo",
      stats: { stars: 18, views: 634 },
    },
    {
      title: "Portfolio Website",
      imageSrc: "/portfolio.png",
      description: "Personal portfolio showcase with modern design, smooth animations, interactive elements, and responsive layout. Built with performance in mind.",
      tags: ["NextJS", "TailwindCSS", "Framer Motion", "TypeScript"],
      link: "https://github.com/PhurinGZ/Portfolio",
      githubLink: "https://github.com/PhurinGZ/Portfolio",
      stats: { stars: 67, views: 2100 },
    },
    {
      title: "E-Commerce Platform",
      imageSrc: "/e-commerce.png",
      description: "A comprehensive e-commerce solution with product management, shopping cart, payment integration, order tracking, and admin dashboard.",
      tags: ["TailwindCSS", "TypeScript", "MongoDB", "NextJS"],
      link: "https://github.com/Thuje009/project-e-commerce",
      githubLink: "https://github.com/Thuje009/project-e-commerce",
      stats: { stars: 31, views: 945 },
    },
  ], []);

  // Get unique tags for filtering
  const allTags = useMemo(() => {
    return ["All", ...new Set(projects.flatMap((project) => project.tags))];
  }, [projects]);

  // Filter projects based on tag and search query
  const visibleProjects = useMemo(() => {
    let filtered = projects;

    if (filterTag !== "All") {
      filtered = filtered.filter((project) => project.tags.includes(filterTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [filterTag, searchQuery, projects]);

  // Memoized callbacks
  const handleFilterChange = useCallback((tag: string) => {
    setFilterTag(tag);
  }, []);

  const handleViewModeChange = useCallback((mode: "grid" | "list") => {
    setViewMode(mode);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterTag("All");
    setSearchQuery("");
  }, []);

  console.log(visibleProjects)

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {allTags.map((tag) => (
            <FilterButton
              key={tag}
              tag={tag}
              isActive={filterTag === tag}
              onClick={handleFilterChange}
            />
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 backdrop-blur-lg bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-xl p-1">
          <motion.button
            onClick={() => handleViewModeChange("grid")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
            }`}
          >
            <Grid size={18} />
          </motion.button>
          <motion.button
            onClick={() => handleViewModeChange("list")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              viewMode === "list"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
            }`}
          >
            <List size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="relative">
        {/* Simplified Background Elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${filterTag}`}
            className={`relative grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {visibleProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4 opacity-50">🔍</div>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery
                  ? `ไม่พบโปรเจคที่ตรงกับ "${searchQuery}"`
                  : `ไม่พบโปรเจคที่ตรงกับฟิลเตอร์ "${filterTag}"`}
              </p>
              <motion.button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ดูทั้งหมด
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(ProjectsCarousel);