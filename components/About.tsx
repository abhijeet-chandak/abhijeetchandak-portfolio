"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Users, Github } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code following best practices",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Working effectively in cross-functional teams and Agile environments",
    },
  ];

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50/80 via-white/60 to-slate-100/80 dark:from-dark-900/80 dark:via-dark-800/60 dark:to-dark-900/80 backdrop-blur-sm relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 gradient-text px-4">
            About Me
          </h2>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-6 md:mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">
              Software Engineer
            </h3>
            <p className="text-slate-700 dark:text-slate-200 mb-4 text-base md:text-lg leading-relaxed">
              I&apos;m a Software Engineer with 2.5 years of professional experience, specializing
              in building dynamic and responsive web applications using React for the frontend and
              Node.js for scalable backend services.
            </p>
            <p className="text-slate-700 dark:text-slate-200 mb-4 text-base md:text-lg leading-relaxed">
              In my current role, I work on developing and maintaining enterprise-level
              applications, focusing on clean architecture, performance optimization, and delivering
              high-quality solutions. I&apos;m proficient in React, JavaScript, and modern frontend
              ecosystems, with expertise in developing secure RESTful APIs and microservices using
              Node.js.
            </p>
            <p className="text-slate-700 dark:text-slate-200 mb-6 text-base md:text-lg leading-relaxed">
              I enjoy working in collaborative Agile environments where I can contribute to team
              success while continuously learning and growing. When I&apos;m not working, I like to
              build personal projects to explore new technologies and stay updated with the latest
              industry trends.
            </p>

            {/* Social Links - Buttons */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <motion.a
                href="https://github.com/abhijeet-chandak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit my GitHub profile (opens in new tab)"
              >
                <Github className="w-4 h-4 text-white" aria-hidden="true" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://leetcode.com/u/abhijeetchandak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-700 dark:border-2 dark:border-slate-500/50 text-white rounded-lg font-semibold text-sm shadow-md dark:shadow-lg dark:shadow-slate-700/40 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-xl dark:hover:shadow-slate-600/50 hover:bg-slate-800 dark:hover:bg-slate-600 dark:hover:border-slate-400/70 transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit my LeetCode profile (opens in new tab)"
              >
                <Code2 className="w-4 h-4 text-orange-500" aria-hidden="true" />
                <span>LeetCode</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4 md:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 md:p-6 glass rounded-xl border border-slate-300 dark:border-dark-600/50 hover:border-slate-500 dark:hover:border-slate-600 card-hover shadow-lg"
              >
                <div
                  className="w-12 h-12 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
