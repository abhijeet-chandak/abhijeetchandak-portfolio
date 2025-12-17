"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

const Projects = () => {
  const projects = [
    {
      title: "Docnify PDF",
      description:
        "A comprehensive, free, browser-based PDF utility platform with multiple tools for compression, splitting, page removal, extraction, and organization. Features include batch processing, visual page selection, drag-and-drop reordering, quality control, and privacy-first design with auto-deletion after 1 hour. Built with a modern tech stack including React, Node.js, MongoDB, Redis, and BullMQ for efficient queue management.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "BullMQ",
        "Ghostscript",
        "pdf-lib",
      ],
      image: "📄",
      github: "https://github.com/abhijeet-chandak/docnify-pdf",
      demo: "#projects",
    },
    {
      title: "ApplyTracker",
      description:
        "A privacy-first Chrome extension that helps users track job applications directly from job listing pages. ApplyTracker automatically detects job pages (LinkedIn, Indeed, Greenhouse, Lever, Workday), captures key details, tracks application status (Applied, Interview, Offer, Rejected), sets follow-up reminders with browser notifications, and provides search, filter, and export capabilities (CSV/JSON). Fully local storage with zero tracking — no accounts, servers, or paid APIs.",
      technologies: [
        "JavaScript",
        "Chrome Extension",
        "Manifest V3",
        "HTML",
        "CSS",
        "Chrome Storage API",
        "Chrome Alarms API",
        "Chrome Notifications API",
      ],
      image: "🧩",
      github: "#projects",
      demo: "#projects",
    },
    {
      title: "MeetNotes",
      description:
        "A lightweight, privacy-first Chrome extension that enables users to take meeting notes, track action items, and set follow-up reminders directly inside online meetings. MeetNotes automatically activates on Google Meet, Zoom (Web), and Microsoft Teams, providing a distraction-free floating notes panel with agenda planning, timestamps, and export options. 100% local storage — no servers, no analytics, no login required.",
      technologies: [
        "JavaScript",
        "Chrome Extension",
        "Manifest V3",
        "HTML",
        "CSS",
        "Chrome Storage API",
        "Chrome Alarms API",
        "Chrome Notifications API",
      ],
      image: "📝",
      github: "#projects",
      demo: "#projects",
    },
  ];

  return (
    <section
      id="projects"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 gradient-text px-4">
            Featured Projects
          </h2>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-slate-900 dark:bg-slate-300 mx-auto mb-4 md:mb-6 rounded-full"></div>
          <p className="text-slate-700 dark:text-slate-100 text-base md:text-lg max-w-2xl mx-auto px-4">
            Personal projects showcasing my skills and passion for building applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const ProjectCard = () => {
              const ref = useRef<HTMLDivElement>(null);
              const x = useMotionValue(0);
              const y = useMotionValue(0);

              const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
              const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

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
                <motion.div
                  ref={ref}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative glass rounded-xl border border-slate-300 dark:border-dark-600/50 hover:border-slate-500 dark:hover:border-slate-600 card-hover overflow-hidden shadow-xl"
                >
                  <div className="p-6 md:p-8">
                    <div className="text-5xl md:text-6xl mb-3 md:mb-4">{project.image}</div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 md:mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-200 mb-4 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 md:px-3 md:py-1.5 bg-slate-200 dark:bg-dark-700/50 text-slate-700 dark:text-slate-200 text-xs md:text-sm rounded-full border border-slate-300 dark:border-dark-600/50 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors font-medium group/link focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-800 rounded px-2"
                        aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                      >
                        <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                        Code
                      </a>
                      <a
                        href="#projects"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("projects")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors font-medium group/link focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-800 rounded px-2"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" aria-hidden="true" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            };

            return <ProjectCard key={project.title} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
