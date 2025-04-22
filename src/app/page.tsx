"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Navbar from "@/components/Navbar";
import { Toast } from "@/components/ui/toast";

export default function Home() {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "info" | "success" | "warning" | "error"
  >("info");

  // ดึงค่าตั้งต้นจาก localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setMode(saved);
    } else {
      // Default to light if no preference is set
      setMode("light");
    }

    // listen การเปลี่ยนแปลง localStorage จาก Navbar
    const onStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme === "dark" || newTheme === "light") {
        setMode(newTheme);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log("Copied!!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleShowToast = (
    variant: "info" | "success" | "warning" | "error"
  ) => {
    setToastVariant(variant);
    setShowToast(true);
  };

  if (mode === null) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-16 transition-colors duration-300">
        <div className="max-w-5xl w-full mx-auto mt-6">
          {/* Hero Section with animated gradient border */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 mb-16 shadow-xl">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src="/profile.jpg"
                          alt="Profile picture"
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    สวัสดีครับ, ผมชื่อ ภูรินทร์ กันเนตรกาศ
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Software Engineer 👋
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                    Front-end Developer ที่สามารถทำ Back-end / Full-stack ได้
                    รักการเรียนรู้ และชอบหาอะไรใหม่ๆ ทำอยู่เสมอ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white inline-block relative">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
              <div
                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => (
                  handleCopy("basphurin2502@gmail.com"),
                  handleShowToast("success")
                )}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Image
                    src={mode === "dark" ? "/mail-white.png" : "/mail.png"}
                    width={24}
                    height={24}
                    alt="Email"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    basphurin2502@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Image
                    src={
                      mode === "dark"
                        ? "/phone-call-white.png"
                        : "/phone-call.png"
                    }
                    width={24}
                    height={24}
                    alt="Phone"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    061-593-6947
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white inline-block relative">
              Projects
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
            </h2>
            <ProjectsCarousel />
          </div>
        </div>
      </main>

      {showToast && (
        <Toast
          variant={toastVariant}
          title={`Copied ${
            toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)
          }`}
          onClose={() => setShowToast(false)}
        >
          Copied!
        </Toast>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-gray-900 shadow-inner">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ภูรินทร์ กันเนตรกาศ. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
