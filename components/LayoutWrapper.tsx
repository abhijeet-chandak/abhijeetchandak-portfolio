"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showNavAndFooter, setShowNavAndFooter] = useState(true);

  useEffect(() => {
    // For a single-page app, show Navbar and Footer only on the home page
    // Error pages (404) will have their own full-screen layout without nav/footer
    // Check if pathname is "/" or if we're on a hash route (single-page navigation)
    const isHomePage = pathname === "/" || pathname === "" || pathname === null;
    setShowNavAndFooter(isHomePage);
  }, [pathname]);

  return (
    <>
      <SkipLink />
      {showNavAndFooter && <Navbar />}
      <main id="main-content">{children}</main>
      {showNavAndFooter && <Footer />}
    </>
  );
}
