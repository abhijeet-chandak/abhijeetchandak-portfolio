"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadResume, preloadResume } from "@/utils/downloadPdf";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);

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
          ? "bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-200 dark:border-dark-700/50"
          : "bg-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            className="flex items-center truncate max-w-[200px] sm:max-w-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline text-lg sm:text-xl md:text-2xl font-display font-bold gradient-text">
              Abhijeet Chandak
            </span>
            <span className="sm:hidden w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-cyan-700 dark:from-cyan-500 dark:via-blue-500 dark:to-cyan-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-cyan-600/40 dark:shadow-cyan-500/50 border border-cyan-500/20 dark:border-cyan-400/30">
              AC
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <nav
            className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium transition-colors duration-200 relative group text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded px-1"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 dark:bg-slate-300 group-hover:w-full transition-all duration-300"
                  aria-hidden="true"
                ></span>
              </a>
            ))}
            <motion.button
              onClick={async () => {
                setIsDownloading(true);
                try {
                  await downloadResume("Abhijeet-Chandak-Resume.pdf");
                } finally {
                  // Small delay for visual feedback
                  setTimeout(() => setIsDownloading(false), 500);
                }
              }}
              onMouseEnter={preloadResume}
              disabled={isDownloading}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={!isDownloading ? { scale: 1.05 } : {}}
              whileTap={!isDownloading ? { scale: 0.95 } : {}}
              aria-label="Download resume PDF"
              aria-busy={isDownloading}
            >
              <Download
                className={`w-4 h-4 transition-transform ${isDownloading ? "animate-pulse" : ""}`}
                aria-hidden="true"
              />
              <span className="hidden lg:inline">
                {isDownloading ? "Downloading..." : "Resume"}
              </span>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-dark-700/50"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <nav className="px-4 pt-2 pb-4 space-y-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 rounded px-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  role="menuitem"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                </a>
              ))}
              <motion.button
                onClick={async () => {
                  setIsDownloading(true);
                  try {
                    await downloadResume("Abhijeet-Chandak-Resume.pdf");
                    setIsMobileMenuOpen(false);
                  } finally {
                    setTimeout(() => setIsDownloading(false), 500);
                  }
                }}
                onMouseEnter={preloadResume}
                disabled={isDownloading}
                className="flex items-center gap-2 py-2 px-4 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm mt-2 shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-70 disabled:cursor-not-allowed"
                whileTap={!isDownloading ? { scale: 0.95 } : {}}
                role="menuitem"
                aria-label="Download resume PDF"
                aria-busy={isDownloading}
              >
                <Download
                  className={`w-4 h-4 transition-transform ${isDownloading ? "animate-pulse" : ""}`}
                  aria-hidden="true"
                />
                {isDownloading ? "Downloading..." : "Download Resume"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
