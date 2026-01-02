"use client";

import { motion } from "framer-motion";
import { Home, Code2, AlertTriangle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Floating404 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] xl:text-[26rem] font-display font-bold select-none leading-none"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="gradient-text bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
          404
        </span>
      </div>
      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 blur-[120px] opacity-20 dark:opacity-30 -z-10"
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};

const AnimatedCode = () => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative bg-slate-900/95 dark:bg-dark-950/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Subtle animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          animate={{
            background: [
              "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
              "linear-gradient(225deg, #3b82f6 0%, #8b5cf6 100%)",
              "linear-gradient(315deg, #8b5cf6 0%, #06b6d4 100%)",
              "linear-gradient(45deg, #06b6d4 0%, #3b82f6 100%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Top bar with window controls */}
        <div className="relative z-10 flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50 dark:border-slate-700/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-500" />
            <span className="text-slate-400 text-xs font-medium">error.tsx</span>
          </div>
        </div>

        {/* Code content */}
        <div className="relative z-10 space-y-3 font-mono text-sm md:text-base">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-slate-600 dark:text-slate-500 text-xs mt-0.5 select-none">1</span>
            <div className="flex-1">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-cyan-400">page</span> <span className="text-slate-500">=</span>{" "}
              <span className="text-yellow-400">findRoute</span>
              <span className="text-slate-500">(</span>
              <span className="text-green-400">&apos;url&apos;</span>
              <span className="text-slate-500">);</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-slate-600 dark:text-slate-500 text-xs mt-0.5 select-none">2</span>
            <div className="flex-1">
              <span className="text-purple-400">if</span> <span className="text-slate-500">(</span>
              <span className="text-red-400">!</span>
              <span className="text-cyan-400">page</span>
              <span className="text-slate-500">) {"{"}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-slate-600 dark:text-slate-500 text-xs mt-0.5 select-none">3</span>
            <div className="flex-1 ml-4">
              <span className="text-purple-400">return</span>{" "}
              <span className="text-slate-500">&lt;</span>
              <span className="text-cyan-400">NotFound</span>
              <span className="text-slate-500"> /&gt;;</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-slate-600 dark:text-slate-500 text-xs mt-0.5 select-none">4</span>
            <div className="flex-1">
              <span className="text-slate-500">{"}"}</span>
            </div>
          </motion.div>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.div>
  );
};

const FloatingElements = () => {
  const elements = [
    { icon: Code2, delay: 0, x: "8%", y: "15%", size: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" },
    {
      icon: AlertTriangle,
      delay: 0.3,
      x: "85%",
      y: "25%",
      size: "w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18",
    },
    {
      icon: Code2,
      delay: 0.6,
      x: "15%",
      y: "75%",
      size: "w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16",
    },
    {
      icon: AlertTriangle,
      delay: 0.9,
      x: "80%",
      y: "80%",
      size: "w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18",
    },
  ];

  return (
    <>
      {elements.map(({ icon: Icon, delay, x, y, size }, index) => (
        <motion.div
          key={`floating-element-${x}-${y}-${index}`}
          className={`absolute text-cyan-500/10 dark:text-cyan-400/10 ${size}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay,
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}
    </>
  );
};

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 z-[9999]">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[32rem] h-[32rem] bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, 80, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "5%", left: "5%" }}
        />
        <motion.div
          className="absolute w-[28rem] h-[28rem] bg-blue-500/15 dark:bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 120, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ bottom: "15%", right: "10%" }}
        />
        <motion.div
          className="absolute w-[24rem] h-[24rem] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ top: "45%", left: "45%" }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-10 md:space-y-14 lg:space-y-16">
          {/* 404 Number */}
          <motion.div variants={itemVariants} className="relative -mt-8 md:-mt-12">
            <Floating404 />
          </motion.div>

          {/* Error Message Section */}
          <motion.div variants={itemVariants} className="space-y-5 max-w-3xl">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Page Not Found
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </motion.p>
          </motion.div>

          {/* Animated Code Block */}
          <motion.div variants={itemVariants} className="w-full max-w-lg">
            <AnimatedCode />
          </motion.div>

          {/* Action Button */}
          <motion.div
            variants={itemVariants}
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-semibold text-base md:text-lg shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 hover:shadow-2xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Navigate to homepage"
            >
              {/* Button background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <span className="relative flex items-center gap-3">
                <Home className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                <span>Go to Homepage</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
