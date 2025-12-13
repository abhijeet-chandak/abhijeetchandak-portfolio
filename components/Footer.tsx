"use client";

const Footer = () => {
  // Use current year directly to avoid hydration mismatch
  // This is safe because the year is the same on server and client at build time
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-dark-800/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-200 text-sm md:text-base">
            © {currentYear} Abhijeet Chandak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
