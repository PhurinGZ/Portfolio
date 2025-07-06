// app/page.tsx
"use client";

import { useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "@/hooks/useTheme";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useClipboard } from "@/hooks/useClipboard";
import { ANIMATION_VARIANTS } from "@/constants/animations";
import { SKILLS_DATA } from "@/constants/skills";
import Navbar from "@/components/Navbar";
import { Toast } from "@/components/ui/toast";
import Image from "next/image";
import TechStack from "@/components/TechStack";

// Lazy load heavy components
const ProjectsCarousel = dynamic(
  () => import("@/components/ProjectsCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    ),
  }
) as React.ComponentType;




// Memoized components
const BackgroundOrbs = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {[
      {
        className:
          "absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full blur-3xl",
        animation: { y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] },
        duration: 8,
      },
      {
        className:
          "absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl",
        animation: { y: [0, 30, 0], x: [0, -15, 0], scale: [1, 0.9, 1] },
        duration: 10,
      },
      {
        className:
          "absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full blur-2xl",
        animation: { y: [0, -20, 0], x: [0, -10, 0] },
        duration: 6,
      },
      {
        className:
          "absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full blur-2xl",
        animation: { y: [0, -10, 0], x: [0, 10, 0] },
        duration: 4,
      },
    ].map((orb, index) => (
      <motion.div
        key={index}
        className={orb.className}
        animate={orb.animation}
        transition={{
          duration: orb.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
));

BackgroundOrbs.displayName = "BackgroundOrbs";

const InteractiveLight = memo(
  ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
    <motion.div
      className="absolute w-[500px] h-[500px] bg-gradient-radial from-blue-400/25 via-purple-400/15 to-transparent rounded-full blur-3xl transition-all duration-500 pointer-events-none"
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
    />
  )
);

InteractiveLight.displayName = "InteractiveLight";

const SkillBadge = memo(
  ({ skill, index }: { skill: (typeof SKILLS_DATA)[0]; index: number }) => (
    <motion.span
      className={`px-5 py-3 bg-gradient-to-r ${skill.color} backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer shadow-lg`}
      variants={ANIMATION_VARIANTS.skill}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      custom={index}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    >
      {skill.name}
    </motion.span>
  )
);

SkillBadge.displayName = "SkillBadge";

const ContactCard = memo(
  ({
    title,
    value,
    icon,
    gradient,
    onClick,
  }: {
    title: string;
    value: string;
    icon: string;
    gradient: string;
    onClick?: () => void;
  }) => (
    <motion.div
      className="cursor-pointer"
      variants={ANIMATION_VARIANTS.card}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute inset-0 ${gradient} rounded-3xl blur-2xl opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-6">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient.replace(
              "/40",
              "/100"
            )} flex items-center justify-center shadow-xl`}
            whileHover={{ rotate: 12 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl">{icon}</span>
          </motion.div>
          <div className="text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              {title}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-1">
              {value}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
);

ContactCard.displayName = "ContactCard";

const SectionHeader = memo(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
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
  )
);

SectionHeader.displayName = "SectionHeader";

export default function Home() {
  const { mode } = useTheme();
  const mousePosition = useMousePosition();
  const { copyToClipboard, showToast, toastVariant, setShowToast } =
    useClipboard();

  const handleEmailCopy = useCallback(() => {
    copyToClipboard("basphurin2502@gmail.com");
  }, [copyToClipboard]);

  if (mode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 transition-all duration-700 overflow-x-hidden">
      <BackgroundOrbs />
      <InteractiveLight mousePosition={mousePosition} />

      <Navbar />

      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          className="flex min-h-screen items-center justify-center px-4 py-16 relative z-10"
        >
          <div className="max-w-6xl w-full mx-auto mt-16">
            <motion.div
              className="relative mb-20"
              initial="hidden"
              animate="visible"
              variants={ANIMATION_VARIANTS.container}
            >
              {/* Enhanced Glass Card */}
              <motion.div
                className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-2 shadow-2xl"
                variants={ANIMATION_VARIANTS.card}
                whileHover="hover"
              >
                <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 transition-all duration-700">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Profile Image */}
                    <motion.div
                      className="relative"
                      variants={ANIMATION_VARIANTS.item}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-2">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden relative shadow-2xl">
                          <Image
                            alt="profile-image"
                            src="/profile.jpg"
                            fill
                            className="object-cover rounded-full"
                            priority
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Hero Text */}
                    <motion.div
                      className="text-center md:text-left space-y-8"
                      variants={ANIMATION_VARIANTS.item}
                    >
                      <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <motion.h1
                          className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight"
                          style={{ backgroundSize: "200% 200%" }}
                        >
                          สวัสดีครับ, ผมชื่อ
                          <br />
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ภูรินทร์ กันเนตรกาศ
                          </motion.span>
                          <br />
                          <span className="text-3xl md:text-4xl">(บาส)</span>
                        </motion.h1>
                      </motion.div>

                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center md:justify-start gap-3">
                          <motion.span
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            💻
                          </motion.span>
                          Software Engineer
                          <motion.span
                            className="text-3xl"
                            animate={{
                              rotate: [0, 14, -8, 14, -4, 10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            style={{ transformOrigin: "70% 70%" }}
                          >
                            👋
                          </motion.span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                          >
                            Front-end Developer ที่สามารถทำ Back-end /
                            Full-stack ได้
                          </motion.span>
                          <br />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                          >
                            รักการเรียนรู้ และชอบหาอะไรใหม่ๆ ทำอยู่เสมอ
                          </motion.span>
                        </p>
                      </motion.div>

                      {/* Skills Tags */}
                      <motion.div
                        className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start"
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS.container}
                      >
                        {SKILLS_DATA.map((skill, index) => (
                          <SkillBadge
                            key={skill.name}
                            skill={skill}
                            index={index}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Contact"
              subtitle="ติดต่อผมได้ทางช่องทางเหล่านี้"
            />

            <motion.div
              className="flex flex-col md:flex-row justify-center gap-8 md:gap-12"
              initial="hidden"
              whileInView="visible"
              variants={ANIMATION_VARIANTS.container}
              viewport={{ once: true }}
            >
              <ContactCard
                title="Email"
                value="basphurin2502@gmail.com"
                icon="📧"
                gradient="from-blue-400/40 to-purple-400/40"
                onClick={handleEmailCopy}
              />

              <ContactCard
                title="Phone"
                value="061-593-6947"
                icon="📱"
                gradient="from-purple-400/40 to-pink-400/40"
              />
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <TechStack/>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Projects"
              subtitle="ผลงานและโปรเจคที่ผมภูมิใจ"
            />

            <motion.div
              className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ProjectsCarousel />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Toast
              variant={toastVariant}
              title="สำเร็จ!"
              onClose={() => setShowToast(false)}
            >
              คัดลอกอีเมลเรียบร้อยแล้ว!
            </Toast>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="relative py-16 px-4 mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border-t border-white/30 dark:border-gray-700/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} ภูรินทร์ กันเนตรกาศ. All rights
            reserved.
          </motion.p>
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-sm mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Made with{" "}
            <motion.span
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              ❤️
            </motion.span>{" "}
            and lots of{" "}
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              ☕
            </motion.span>
          </motion.p>
        </div>
      </motion.footer>

      <style jsx global>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        html {
          scroll-behavior: smooth;
        }

        .animate-gradient-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
