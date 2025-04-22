import Image from "next/image";
import { useState } from "react";

type ProjectCardProps = {
  title: string;
  imageSrc: string;
  description?: string;
  tags?: string[];
  link?: string;
};

export default function ProjectCard({ 
  title, 
  imageSrc, 
  description = "A cool project I worked on", 
  tags = ["React", "NextJS", "Tailwind"],
  link = "#" 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={link}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <p className="text-sm">{description}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}