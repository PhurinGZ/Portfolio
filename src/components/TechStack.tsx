// components/TechStack.tsx
"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import Image from "next/image";

// Types
interface TechSkill {
  name: string;
  logo: string;
  color: string;
}

interface TechStackCategory {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  skills: TechSkill[];
}

// Data
const TECH_STACK_DATA: TechStackCategory[] = [
  {
    title: "Frontend",
    subtitle: "UI/UX Development",
    icon: "🎨",
    gradient: "from-blue-400 to-purple-500",
    skills: [
      { name: "React.js", logo: "/react.png", color: "from-blue-400 to-blue-600" },
      { name: "Next.js", logo: "/vecel-dark.svg", color: "from-gray-600 to-gray-800" },
      { name: "TypeScript", logo: "/typescript.png", color: "from-blue-500 to-blue-700" },
      { name: "Tailwind CSS", logo: "/tailwind-CSS.png", color: "from-cyan-400 to-cyan-600" },
      { name: "HTML", logo: "/HTML5.png", color: "from-orange-400 to-orange-600" },
      { name: "CSS", logo: "/CSS3.png", color: "from-blue-500 to-blue-700" },
    ],
  },
  {
    title: "Backend",
    subtitle: "Server & API Development",
    icon: "⚙️",
    gradient: "from-green-400 to-blue-500",
    skills: [
      { name: "Node.js", logo: "/Node.js.png", color: "from-green-400 to-green-600" },
      { name: "Express.js", logo: "/Express.png", color: "from-gray-600 to-gray-800" },
    //   { name: "Frappe Framework", logo: "📊", color: "from-purple-400 to-purple-600" },
    ],
  },
  {
    title: "Database & Tools",
    subtitle: "Data Management & Version Control",
    icon: "🗄️",
    gradient: "from-yellow-400 to-orange-500",
    skills: [
      { name: "MongoDB", logo: "/MongoDB.png", color: "from-green-400 to-green-600" },
      { name: "MySQL", logo: "/MySQL.png", color: "from-blue-400 to-blue-600" },
      { name: "Git", logo: "/Git.png", color: "from-orange-400 to-orange-600" },
      { name: "GitHub", logo: "/GitHub.png", color: "from-gray-600 to-gray-800" },
    ],
  },
];

const ADDITIONAL_SKILLS = [
  "JavaScript", "Responsive Design", "RESTful APIs", "Debugging"
];

// Components
const SkillCard = memo(({ skill, index }: { skill: TechSkill; index: number }) => (
  <motion.div
    className={`relative backdrop-blur-xl bg-gradient-to-br ${skill.color} p-6 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, rotate: 2 }}
  >
    <div className="text-center">
      <motion.div
        className="text-4xl mb-3"
        whileHover={{ scale: 1.2, rotate: 15 }}
        transition={{ duration: 0.3 }}
      >
        <Image alt="logo" src={skill.logo} width={100} height={100}/>
      </motion.div>
      <h4 className="text-white font-semibold text-sm">
        {skill.name}
      </h4>
    </div>
  </motion.div>
));

SkillCard.displayName = "SkillCard";

const TechStackCard = memo(({ 
  category, 
  index 
}: { 
  category: TechStackCategory; 
  index: number 
}) => (
  <motion.div
    className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="text-center mb-8">
      <motion.div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-xl`}
        whileHover={{ rotate: 12 }}
      >
        <span className="text-2xl">{category.icon}</span>
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {category.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {category.subtitle}
      </p>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      {category.skills.map((skill, skillIndex) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          index={skillIndex}
        />
      ))}
    </div>
  </motion.div>
));

TechStackCard.displayName = "TechStackCard";

const AdditionalSkills = memo(() => (
  <motion.div
    className="mt-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
  >
    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
      Additional Skills
    </h4>
    <div className="flex flex-wrap justify-center gap-4">
      {ADDITIONAL_SKILLS.map((skill, index) => (
        <motion.span
          key={skill}
          className="px-4 py-2 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
));

AdditionalSkills.displayName = "AdditionalSkills";

const SectionHeader = memo(({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-5xl font-bold text-gray-800 dark:text-white inline-block relative">
      <motion.span
        className="animate-gradient-text"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {title}
      </motion.span>
      <motion.span
        className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
      />
    </h2>
    <motion.p
      className="text-xl text-gray-600 dark:text-gray-300 mt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {subtitle}
    </motion.p>
  </motion.div>
));

SectionHeader.displayName = "SectionHeader";

// Main Component
const TechStack = memo(() => {
  return (
    <section id="tech-stack" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Tech Stack"
          subtitle="เทคโนโลยีและเครื่องมือที่ผมใช้งาน"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_STACK_DATA.map((category, index) => (
            <TechStackCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>

        <AdditionalSkills />
      </div>
    </section>
  );
});

TechStack.displayName = "TechStack";

export default TechStack;