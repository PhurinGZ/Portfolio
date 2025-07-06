// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import Navbar from "@/components/Navbar";
import { Toast } from "@/components/ui/toast";

export default function Home() {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "info" | "success" | "warning" | "error"
  >("info");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ดึงค่าตั้งต้นจาก localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setMode(saved);
    } else {
      setMode("light");
    }

    const onStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme === "dark" || newTheme === "light") {
        setMode(newTheme);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy!", err);
      setToastVariant("error");
      setShowToast(true);
    }
  };

  if (mode === null) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 transition-all duration-700 overflow-x-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs with enhanced animation */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full blur-2xl animate-float-fast"></div>

        {/* Interactive Light Effect */}
        <div
          className="absolute w-[500px] h-[500px] bg-gradient-radial from-blue-400/25 via-purple-400/15 to-transparent rounded-full blur-3xl transition-all duration-500 pointer-events-none"
          style={{
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift"></div>
        </div>
      </div>

      <Navbar />

      <main className="relative min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          className="flex min-h-screen items-center justify-center px-4 py-16 relative z-10"
        >
          <div className="max-w-6xl w-full mx-auto mt-16">
            <div className="relative mb-20 group">
              {/* Liquid Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-3xl blur-2xl transform group-hover:scale-105 transition-all duration-700 animate-pulse-slow"></div>

              {/* Enhanced Glass Card */}
              <div className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-2 shadow-2xl hover:shadow-4xl transition-all duration-700">
                <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 transition-all duration-700 hover:shadow-inner">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Enhanced Profile Image */}
                    <div className="relative group/avatar">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover/avatar:opacity-100 transition-all duration-700 animate-pulse-glow"></div>
                      <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 p-2 transform group-hover/avatar:scale-110 transition-all duration-700 animate-rotate-slow">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden relative shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 opacity-0 group-hover/avatar:opacity-100 transition-all duration-700"></div>
                          <div className="w-full h-full flex items-center justify-center relative z-10">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300">
                              👤
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Hero Text */}
                    <div className="text-center md:text-left space-y-8">
                      <div className="overflow-hidden">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x leading-tight">
                          สวัสดีครับ, ผมชื่อ
                          <br />
                          <span className="animate-wave-text">
                            ภูรินทร์ กันเนตรกาศ
                          </span>
                          <br />
                          <span className="text-3xl md:text-4xl">(บาส)</span>
                        </h1>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center md:justify-start gap-3">
                          <span className="animate-bounce-slow">💻</span>
                          Software Engineer
                          <span className="text-3xl animate-wave">👋</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                          <span className="animate-type">
                            Front-end Developer ที่สามารถทำ Back-end /
                            Full-stack ได้
                          </span>
                          <br />
                          <span className="animate-type-delay">
                            รักการเรียนรู้ และชอบหาอะไรใหม่ๆ ทำอยู่เสมอ
                          </span>
                        </p>
                      </div>

                      {/* Enhanced Floating Skills Tags */}
                      <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start">
                        {[
                          {
                            name: "React",
                            color: "from-blue-500/30 to-cyan-500/30",
                          },
                          {
                            name: "Next.js",
                            color: "from-gray-500/30 to-black/30",
                          },
                          {
                            name: "TypeScript",
                            color: "from-blue-600/30 to-blue-800/30",
                          },
                          {
                            name: "Node.js",
                            color: "from-green-500/30 to-green-700/30",
                          },
                          {
                            name: "Python",
                            color: "from-yellow-500/30 to-blue-500/30",
                          },
                        ].map((skill, index) => (
                          <span
                            key={skill.name}
                            className={`px-5 py-3 bg-gradient-to-r ${skill.color} backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:scale-110 transition-all duration-500 animate-float cursor-pointer shadow-lg hover:shadow-xl`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white inline-block relative">
                <span className="animate-gradient-text">Contact</span>
                <span className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-expand"></span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-6">
                ติดต่อผมได้ทางช่องทางเหล่านี้
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
              {/* Enhanced Email Card */}
              <div
                className="group relative cursor-pointer transform hover:scale-105 transition-all duration-500"
                onClick={() => handleCopy("basphurin2502@gmail.com")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow"></div>
                <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40 p-8 rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-700">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-1">
                        basphurin2502@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Phone Card */}
              <div className="group relative cursor-pointer transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow"></div>
                <div className="relative backdrop-blur-2xl bg-white/30 dark:bg-gray-800/30 border border-white/40 dark:border-gray-600/40 p-8 rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-700">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-1">
                        061-593-6947
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white inline-block relative">
                <span className="animate-gradient-text">Projects</span>
                <span className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-expand"></span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-6">
                ผลงานและโปรเจคที่ผมภูมิใจ
              </p>
            </div>

            <div className="relative backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl">
              <ProjectsCarousel />
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Toast */}
      {showToast && (
        <Toast
          variant={toastVariant}
          title="สำเร็จ!"
          onClose={() => setShowToast(false)}
        >
          คัดลอกอีเมลเรียบร้อยแล้ว!
        </Toast>
      )}

      {/* Enhanced Footer */}
      <footer className="relative py-16 px-4 mt-20">
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/20 dark:bg-gray-900/20 border-t border-white/30 dark:border-gray-700/30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            © {new Date().getFullYear()} ภูรินทร์ กันเนตรกาศ. All rights
            reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> and
            lots of <span className="animate-bounce">☕</span>
          </p>
        </div>
      </footer>

      {/* Enhanced CSS Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-10px) translateY(-10px);
          }
          50% {
            transform: translateX(10px) translateY(10px);
          }
          75% {
            transform: translateX(-5px) translateY(5px);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: rotate(14deg);
          }
          20%,
          40%,
          60%,
          80% {
            transform: rotate(-8deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(15px);
          }
        }

        @keyframes float-slow-reverse {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(30px) translateX(-15px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(-10px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes wave-text {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes expand {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .animate-wave-text {
          animation: wave-text 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 2s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.25);
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
