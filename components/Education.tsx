"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "B.E. in Information Technology",
      institution: "Pimpri Chinchwad College of Engineering",
      period: "Jul 2020 - May 2023",
      grade: "CGPA: 9.59 / 10",
      icon: GraduationCap,
    },
    {
      degree: "Diploma in Information Technology",
      institution: "MET Bhujbal Knowledge City",
      period: "Jul 2017 - May 2020",
      grade: "Percentage: 94.81 / 100",
      icon: Award,
    },
  ];

  return (
    <section
      id="education"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-dark-950 dark:via-dark-900 dark:to-dark-800 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text">
              Academic Journey
            </h2>
          </div>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-slate-700 dark:text-slate-100 text-base md:text-lg max-w-2xl mx-auto px-4">
            Academic achievements and continuous learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-xl border border-slate-300 dark:border-dark-600/50 hover:border-slate-500 dark:hover:border-slate-600 card-hover shadow-xl"
            >
              <div className="flex items-start">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center mr-4 md:mr-6 flex-shrink-0 shadow-lg shadow-slate-900/30 dark:shadow-slate-800/30"
                  aria-hidden="true"
                >
                  <edu.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-200 font-semibold mb-2 text-sm md:text-base">
                    {edu.institution}
                  </p>
                  <p className="text-slate-700 dark:text-slate-200 text-xs md:text-sm mb-3">
                    {edu.period}
                  </p>
                  <div className="inline-block px-4 py-2 bg-slate-200 dark:bg-dark-700/70 rounded-lg border border-slate-300 dark:border-dark-600/50">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
