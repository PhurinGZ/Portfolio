// app/page.tsx
"use client";

import { useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "@/hooks/useTheme";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useClipboard } from "@/hooks/useClipboard";
import { ANIMATION_VARIANTS } from "@/constants/animations";
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
      <div className="h-32 sm:h-48 md:h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
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
          "absolute -top-20 -left-20 sm:-top-32 sm:-left-32 lg:-top-40 lg:-left-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 lg:from-blue-300/40 lg:to-purple-300/40 rounded-full blur-2xl lg:blur-3xl",
        animation: { y: [0, -15, 0], x: [0, 8, 0], scale: [1, 1.05, 1] },
        duration: 8,
      },
      {
        className:
          "absolute -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 lg:-bottom-40 lg:-right-40 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-purple-300/30 to-pink-300/30 lg:from-purple-300/40 lg:to-pink-300/40 rounded-full blur-2xl lg:blur-3xl",
        animation: { y: [0, 15, 0], x: [0, -8, 0], scale: [1, 0.95, 1] },
        duration: 10,
      },
      {
        className:
          "absolute top-1/3 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-cyan-300/25 to-blue-300/25 lg:from-cyan-300/30 lg:to-blue-300/30 rounded-full blur-xl lg:blur-2xl",
        animation: { y: [0, -10, 0], x: [0, -5, 0] },
        duration: 6,
      },
      {
        className:
          "absolute bottom-1/3 right-1/4 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-pink-300/25 to-red-300/25 lg:from-pink-300/30 lg:to-red-300/30 rounded-full blur-xl lg:blur-2xl",
        animation: { y: [0, -5, 0], x: [0, 5, 0] },
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
      className="hidden lg:block absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent lg:from-blue-400/25 lg:via-purple-400/15 rounded-full blur-2xl lg:blur-3xl transition-all duration-500 pointer-events-none"
      animate={{
        x: mousePosition.x - 150,
        y: mousePosition.y - 150,
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
      className="cursor-pointer w-full max-w-sm mx-auto md:max-w-none"
      variants={ANIMATION_VARIANTS.card}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute inset-0 ${gradient} rounded-2xl sm:rounded-3xl blur-xl lg:blur-2xl opacity-0`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-6">
          <motion.div
            className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient.replace(
              "/40",
              "/100"
            )} flex items-center justify-center shadow-xl shrink-0`}
            whileHover={{ rotate: 12 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-lg sm:text-xl lg:text-2xl">{icon}</span>
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              {title}
            </p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-200 mt-1 break-all sm:break-normal">
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
      className="text-center mb-8 sm:mb-12 lg:mb-16 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white inline-block relative">
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
          className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-0 h-1 sm:h-1.5 lg:h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </h2>
      <motion.p
        className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mt-4 sm:mt-5 lg:mt-6 max-w-2xl mx-auto"
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
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-blue-500"></div>
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
          className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10"
        >
          <div className="max-w-6xl w-full mx-auto mt-12 sm:mt-16 lg:mt-16">
            <motion.div
              className="relative mb-12 sm:mb-16 lg:mb-20"
              initial="hidden"
              animate="visible"
              variants={ANIMATION_VARIANTS.container}
            >
              {/* Enhanced Glass Card */}
              <motion.div
                className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl"
                variants={ANIMATION_VARIANTS.card}
                whileHover="hover"
              >
                <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 transition-all duration-700">
                  <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12">
                    {/* Profile Image */}
                    <motion.div
                      className="relative order-1 sm:order-1"
                      variants={ANIMATION_VARIANTS.item}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-1.5 sm:p-2">
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
                      className="text-center space-y-4 sm:space-y-6 lg:space-y-8 order-2 sm:order-2"
                      variants={ANIMATION_VARIANTS.item}
                    >
                      <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <motion.h1
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight"
                          style={{ backgroundSize: "200% 200%" }}
                        >
                          สวัสดีครับ, ผมชื่อ
                          <br />
                          <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ภูรินทร์ กันเนตรกาศ
                          </motion.span>
                          <br />
                          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">(บาส)</span>
                        </motion.h1>
                      </motion.div>

                      <motion.div
                        className="space-y-3 sm:space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 sm:gap-3">
                          <motion.span
                            animate={{ y: [0, -5, 0] }}
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
                            className="text-2xl sm:text-3xl"
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
                        <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed space-y-2">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                          >
                            Front-end Developer ที่สามารถทำ Back-end / Full-stack ได้
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                          >
                            รักการเรียนรู้ และชอบหาอะไรใหม่ๆ ทำอยู่เสมอ
                          </motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Contact"
              subtitle="ติดต่อผมได้ทางช่องทางเหล่านี้"
            />

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto"
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
        <div className="px-4 sm:px-6 lg:px-8">
          <TechStack />
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Projects"
              subtitle="ผลงานและโปรเจคที่ผมภูมิใจ"
            />

            <motion.div
              className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl"
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50"
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
        className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border-t border-white/30 dark:border-gray-700/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} ภูรินทร์ กันเนตรกาศ. All rights reserved.
          </motion.p>
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-2"
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
              animate={{ y: [0, -3, 0] }}
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

        /* Enhanced mobile scrolling */
        @media (max-width: 640px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Prevent horizontal scroll on mobile */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}