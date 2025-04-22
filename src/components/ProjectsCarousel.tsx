"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsCarousel() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const projects = [
    {
      title: "Web Novel Application",
      imageSrc: "/home-novel.png",
      description: "A web application for reading novels online",
      tags: ["React", "NextJS", "TailwindCSS"],
    },
    {
      title: "LOFI",
      imageSrc: "/Lofi.png",
      description:
        "lofi A captivating website for listening to music with a beautiful ambiance, offering a variety of atmospheric sounds to choose from. It features a plethora of playful elements, providing a myriad of options for an immersive experience",
      tags: ["Recat js", "Material UI", "MongdoDB", "Node js"],
      link: "https://github.com/PhurinGZ/LOFI",
    },
    {
      title: "Web Blog",
      imageSrc: "/web-blog.png",
      description:
        "This project is a simple web blog demo built with Node.js, React.js, MongoDB, and Express.",
      tags: ["Node.js", "React.js", "MongoDB", "Express"],
      link: "https://github.com/PhurinGZ/webBlogDemo",
    },
    {
      title: "Portfolio Website",
      imageSrc: "/portfolio.png",
      description: "Personal portfolio showcase",
      tags: ["NextJS", "TailwindCSS"],
      link:"https://github.com/PhurinGZ/Portfolio"
    },
    {
      title: "E-Commerce",
      imageSrc: "/e-commerce.png",
      description:
        "A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, featuring a responsive UI, product listings, shopping cart functionality, and MongoDB integration for dynamic product management.",
      tags: ["Tailwindcss", "TypeScript", "MongoDB", "Nextjs"],
      link: "https://github.com/Thuje009/project-e-commerce",
    },
  ];

  const handleSlideChange = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Custom Prev Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute -left-4 lg:-left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ${
          isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isBeginning}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Swiper */}
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".swiper-custom-pagination",
          bulletClass:
            "inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mx-1 cursor-pointer transition-colors",
          bulletActiveClass: "!bg-blue-500 dark:!bg-blue-400",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={false}
        className="pb-12"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="py-4">
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="swiper-custom-pagination flex justify-center mt-6"></div>

      {/* Custom Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute -right-4 lg:-right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 ${
          isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isEnd}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
