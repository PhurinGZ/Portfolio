import { useEffect, useState } from "react";

export const useTheme = () => {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

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

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return { mode, setMode };
};