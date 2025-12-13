"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";

    setTheme(initialTheme);
    // Use classList.replace to avoid hydration issues
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 rounded-full shadow-lg shadow-slate-900/30 dark:shadow-xl dark:shadow-slate-700/50 flex items-center justify-center text-white hover:shadow-xl hover:shadow-slate-900/50 dark:hover:shadow-2xl dark:hover:shadow-slate-600/60 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle between dark and light theme"
      aria-pressed={theme === "dark" ? false : true}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 360 }}
        transition={{ duration: 0.5 }}
      >
        {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
