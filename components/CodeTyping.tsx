"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CodeTypingProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeTyping = ({ code, language = "javascript", className = "" }: CodeTypingProps) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    let currentIndex = 0;
    let _isDeleting = false;
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseDuration = 3000; // Pause for 3 seconds after typing completes

    let timeoutId: NodeJS.Timeout;

    const typeCode = () => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeCode, typingSpeed);
      } else {
        // Finished typing, wait then start deleting
        timeoutId = setTimeout(() => {
          _isDeleting = true;
          deleteCode();
        }, pauseDuration);
      }
    };

    const deleteCode = () => {
      if (currentIndex > 0) {
        setDisplayedCode(code.slice(0, currentIndex - 1));
        currentIndex--;
        timeoutId = setTimeout(deleteCode, deletingSpeed);
      } else {
        // Finished deleting, start typing again
        _isDeleting = false;
        timeoutId = setTimeout(typeCode, 500);
      }
    };

    // Start typing
    timeoutId = setTimeout(typeCode, 500);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [code, mounted]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [mounted]);

  if (!mounted) {
    // Return a placeholder that matches the structure to avoid hydration mismatch
    return (
      <div className={`relative ${className}`} suppressHydrationWarning>
        <div className="bg-white dark:bg-dark-900/90 border border-slate-300 dark:border-dark-700/50 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden flex flex-col h-48 md:h-56">
          <div className="flex items-center gap-2 mb-3 flex-shrink-0" aria-hidden="true">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span
              className="text-slate-600 dark:text-slate-400 text-xs ml-2"
              aria-label={`Programming language: ${language}`}
            >
              {language}
            </span>
          </div>
          <pre
            className="text-slate-800 dark:text-slate-200 overflow-y-auto flex-1 min-h-0"
            aria-live="polite"
          >
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
      role="region"
      aria-label={`Animated ${language} code snippet`}
    >
      <div className="bg-white dark:bg-dark-900/90 border border-slate-300 dark:border-dark-700/50 rounded-lg p-4 md:p-6 font-mono text-xs md:text-sm overflow-hidden flex flex-col h-48 md:h-56">
        <div className="flex items-center gap-2 mb-3 flex-shrink-0" aria-hidden="true">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span
            className="text-slate-600 dark:text-slate-400 text-xs ml-2"
            aria-label={`Programming language: ${language}`}
          >
            {language}
          </span>
        </div>
        <pre
          className="text-slate-800 dark:text-slate-200 overflow-y-auto flex-1 min-h-0"
          aria-live="polite"
        >
          <code>
            {displayedCode}
            <span className={showCursor ? "opacity-100" : "opacity-0"} aria-hidden="true">
              |
            </span>
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeTyping;
