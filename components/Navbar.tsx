"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { downloadResume, preloadResume } from "@/utils/downloadPdf";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check initial scroll position after mount to avoid hydration mismatch
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    checkScroll(); // Check immediately after mount

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Optimized preloading: use requestIdleCallback for better performance
    // This ensures PDF preload doesn't block critical rendering
    const preloadPdf = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).requestIdleCallback(
          () => preloadResume(),
          { timeout: 3000 } // Start preload within 3 seconds max
        );
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => preloadResume(), 1500);
      }
    };

    // Start preload after page is interactive
    if (document.readyState === "complete") {
      preloadPdf();
    } else {
      window.addEventListener("load", preloadPdf, { once: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mounted && isScrolled
          ? "bg-white/80 dark:bg-dark-950/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-dark-700/50 py-2"
          : "bg-transparent py-4"
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Abhijeet Chandak Portfolio Home"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="AC Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-display font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Abhijeet Chandak
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-200/50 dark:border-dark-700/50 shadow-sm">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 rounded-full z-10"
                >
                  {hoveredNav === item.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-700/50 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="ml-4 pl-4 border-l border-slate-200 dark:border-dark-700 h-8 flex items-center">
              <motion.button
                onClick={async () => {
                  setIsDownloading(true);
                  try {
                    await downloadResume("Abhijeet-Chandak-Resume.pdf");
                  } finally {
                    setTimeout(() => setIsDownloading(false), 500);
                  }
                }}
                onMouseEnter={preloadResume}
                disabled={isDownloading}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label="Download resume PDF"
              >
                <Download
                  className={`w-4 h-4 ${isDownloading ? "animate-pulse" : ""}`}
                />
                <span className="hidden lg:inline">
                  {isDownloading ? "Loading..." : "Resume"}
                </span>
                <span className="lg:hidden">CV</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-dark-700/50 overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 rounded-xl font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-dark-700">
                <button
                  onClick={async () => {
                    setIsDownloading(true);
                    try {
                      await downloadResume("Abhijeet-Chandak-Resume.pdf");
                      setIsMobileMenuOpen(false);
                    } finally {
                      setTimeout(() => setIsDownloading(false), 500);
                    }
                  }}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? "animate-pulse" : ""}`} />
                  {isDownloading ? "Downloading..." : "Download Resume"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
