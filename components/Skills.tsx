"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cloud, Server, Wrench, TestTube, Cpu } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: [
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Next.js",
        "Redux",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Node.js", "Express.js", "RESTful APIs", "SOAP APIs", "Microservices"],
    },
    {
      title: "Databases",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: ["Git", "GitHub", "GitLab", "GitHub Actions", "Docker", "Swagger", "Postman"],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS (EC2, S3, RDS)", "Terraform", "Kubernetes"],
    },
    {
      title: "Testing",
      icon: TestTube,
      skills: ["Jest", "Unit Testing", "Integration Testing"],
    },
  ];

  return (
    <section
      id="skills"
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
              <Cpu className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text">
              Skills & Technologies
            </h2>
          </div>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-slate-700 dark:text-slate-100 text-base md:text-lg max-w-2xl mx-auto px-4">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 10,
                  },
                },
              }}
              className="glass p-6 md:p-8 rounded-xl border border-cyan-600/40 dark:border-cyan-500/30 hover:border-cyan-700/60 dark:hover:border-cyan-500/60 card-hover shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4 md:mb-6">
                <category.icon
                  className="w-5 h-5 md:w-6 md:h-6 text-cyan-700 dark:text-cyan-400 mr-2"
                  aria-hidden="true"
                />
                <h3 className="text-lg md:text-xl font-display font-bold text-cyan-700 dark:text-cyan-400">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 rounded-lg text-sm md:text-base font-medium shadow-md hover:shadow-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
