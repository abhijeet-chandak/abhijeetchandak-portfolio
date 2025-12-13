"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Yadgreen India",
      location: "Pune",
      period: "Jul 2023 - Present",
      description: [
        "Designed and developed a complete web application for Saudi Aramco, one of the world's largest energy companies, using the MERN stack (MongoDB, Express.js, React, Node.js, AWS)",
        "Integrated MIP Mobile SDK to enable live video streaming and playback functionalities directly in the browser. Implemented Bing Maps API to provide real-time geolocation and map overlays",
        "Built a mobile application for Maaden (Saudi Arabian Mining Company) using Flutter, targeting both Android and iOS platforms with authentication, dashboards, and push notifications",
        "Designed and implemented the MVP version of the company's internal software, managing multiple operational modules: Task management, role-based access, project tracking, reporting, and Accounts module",
        "Earned the opportunity for a 3-month onsite assignment in Bahrain owing to consistent high-quality delivery and client satisfaction",
      ],
    },
    {
      title: "Associate Software Engineer Intern",
      company: "Mindbody",
      location: "Pune",
      period: "Jan 2023 - Jun 2023",
      description: [
        "Developed and maintained the Mindbody Developer Portal using React, enabling third-party developers to easily explore and integrate with Mindbody's APIs",
        "Built and transitioned legacy APIs into modern RESTful services, improving usability and increasing developer adoption",
        "Aligned with backend teams, designers, and product managers to streamline integration and uphold consistent API documentation",
        "Participated in code reviews, performance tuning, and deployment processes to maintain high-quality, scalable services",
        "Optimized API response time and improved user experience through streamlined data handling and endpoint restructuring",
      ],
    },
  ];

  return (
    <section
      id="experience"
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
            Professional Experience
          </h2>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-4 md:mb-6 rounded-full"></div>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-xl border border-slate-300 dark:border-dark-600/50 hover:border-slate-500 dark:hover:border-slate-600 card-hover shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 md:mb-6">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-700 dark:text-cyan-400 font-semibold text-base md:text-lg">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 text-slate-700 dark:text-slate-300 text-sm">
                  <div className="flex items-center gap-2" aria-label={`Period: ${exp.period}`}>
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2" aria-label={`Location: ${exp.location}`}>
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 md:space-y-3" role="list">
                {exp.description.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-slate-800 dark:text-slate-200 flex items-start leading-relaxed text-sm md:text-base"
                  >
                    <span
                      className="text-slate-900 dark:text-white mr-3 mt-1.5 flex-shrink-0"
                      aria-hidden="true"
                    >
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
