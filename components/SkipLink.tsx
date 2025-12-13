"use client";

import { motion } from "framer-motion";

const SkipLink = () => {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-500 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      whileFocus={{ opacity: 1, y: 0 }}
    >
      Skip to main content
    </motion.a>
  );
};

export default SkipLink;
