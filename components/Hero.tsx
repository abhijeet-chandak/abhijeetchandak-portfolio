"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Download, Code2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CodeTyping from "./CodeTyping";
import { downloadResume, preloadResume } from "@/utils/downloadPdf";

const ProfileImage = ({
  imageError,
  setImageError,
}: {
  imageError: boolean;
  setImageError: (error: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer"
    >
      {/* Animated rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5), rgba(6, 182, 212, 0.5))",
          padding: "4px",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-dark-900"></div>
      </motion.div>

      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-slate-800/20 dark:bg-slate-700/20 opacity-75 blur-xl"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* Profile picture container with 3D tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-400/60 dark:border-slate-600/60 shadow-2xl shadow-slate-900/30 dark:shadow-slate-700/30 ring-4 ring-slate-500/20 dark:ring-slate-600/20 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {!imageError ? (
          <Image
            src="/profile.jpg"
            alt="Abhijeet Chandak - Full Stack Developer and Software Engineer"
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            AC
          </div>
        )}
      </motion.div>

      {/* Floating decoration elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-16 h-16 bg-slate-500/20 dark:bg-slate-600/20 rounded-full blur-xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, 5, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-slate-500/20 dark:bg-slate-600/20 rounded-full blur-xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, -5, 0],
          y: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth - 0.5) * 40,
            y: (e.clientY / window.innerHeight - 0.5) * 40,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 pt-20 md:pt-24 z-10"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        <div
          className="absolute w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
            transition: "transform 0.2s ease-out",
          }}
          suppressHydrationWarning
        />
        <div
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * 0.8}px)`,
            transition: "transform 0.25s ease-out",
          }}
          suppressHydrationWarning
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/15 dark:bg-cyan-500/25 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * -0.6}px)`,
            transition: "transform 0.3s ease-out",
          }}
          suppressHydrationWarning
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 w-full"
        >
          {/* Profile Picture - Top on mobile, Right on desktop */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 relative w-full lg:w-auto flex justify-center order-first lg:order-last"
          >
            <ProfileImage imageError={imageError} setImageError={setImageError} />
          </motion.div>

          {/* Left Side - Text Content - Below photo on mobile, Left on desktop */}
          <div className="flex-1 text-center lg:text-left w-full space-y-6 order-last lg:order-first">
            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200/50 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs md:text-sm font-semibold backdrop-blur-sm whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true" />
                <span>Full Stack Developer</span>
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 md:mb-6 leading-tight break-words"
            >
              <span className="text-slate-900 dark:text-white block sm:inline">Hi, I&apos;m</span>{" "}
              <span className="gradient-text block sm:inline">Abhijeet Chandak</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-100 max-w-3xl mx-auto lg:mx-0 font-normal leading-relaxed px-2 sm:px-0"
            >
              Software Engineer with 2.5+ years of experience building dynamic web applications
              using React, Node.js, and modern technologies.
            </motion.p>

            {/* Code Typing Effect */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto lg:mx-0">
              <CodeTyping
                code={`const developer = {
  name: "Abhijeet Chandak",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  experience: "2.5+ years",
  passion: "Building scalable web applications"
};`}
                language="javascript"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-6 md:mb-8 px-2 sm:px-0"
            >
              <motion.a
                href="#contact"
                className="px-4 py-2 md:px-6 md:py-3 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm md:text-base shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Get in touch with me"
              >
                Get In Touch
              </motion.a>
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
                className="px-4 py-2 md:px-6 md:py-3 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm md:text-base shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={!isDownloading ? { scale: 1.05 } : {}}
                whileTap={!isDownloading ? { scale: 0.95 } : {}}
                aria-label="Download resume PDF"
                aria-busy={isDownloading}
              >
                <Download
                  className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isDownloading ? "animate-pulse" : ""}`}
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">
                  {isDownloading ? "Downloading..." : "Download Resume"}
                </span>
                <span className="sm:hidden">{isDownloading ? "..." : "Resume"}</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-500 dark:text-slate-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
