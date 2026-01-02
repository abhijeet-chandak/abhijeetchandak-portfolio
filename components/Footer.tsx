"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/abhijeet-chandak",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/abhijeet-chandak-066279207",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com", // Placeholder, update if user provides
      icon: Twitter,
    },
    {
      name: "Email",
      href: "mailto:abhijeetchandak10@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-dark-800/50 relative z-10 overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold gradient-text">
              Abhijeet Chandak
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Building scalable and performant web applications with a focus on user experience and clean code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors duration-200 block w-fit"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Let&apos;s Connect</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-sm">
              Open for opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-100 dark:bg-dark-900 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors border border-slate-200 dark:border-dark-800"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-dark-800 pt-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
          <p className="text-slate-500 dark:text-slate-500 text-sm text-center md:text-left">
            © {currentYear} Abhijeet Chandak. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-2 bg-slate-100 dark:bg-dark-900 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors border border-slate-200 dark:border-dark-800"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
