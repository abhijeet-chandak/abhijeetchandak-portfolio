import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abhijeet Chandak - Full Stack Developer | Software Engineer Portfolio",
    template: "%s | Abhijeet Chandak",
  },
  description:
    "Software Engineer with 2.5+ years of experience specializing in React, Node.js, TypeScript, and modern web technologies. Building scalable web applications and mobile apps. Expert in MERN stack, RESTful APIs, and cloud deployments.",
  keywords: [
    "Abhijeet Chandak",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "MERN Stack",
    "Web Developer",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "Next.js",
    "MongoDB",
    "Express.js",
  ],
  authors: [{ name: "Abhijeet Chandak" }],
  creator: "Abhijeet Chandak",
  publisher: "Abhijeet Chandak",
  metadataBase: new URL("https://abhijeetchandak.dev"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijeetchandak.dev", // Update with your actual domain
    title: "Abhijeet Chandak - Full Stack Developer | Software Engineer Portfolio",
    description:
      "Software Engineer with 2.5+ years of experience specializing in React, Node.js, TypeScript, and modern web technologies. Building scalable web applications and mobile apps.",
    siteName: "Abhijeet Chandak Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Abhijeet Chandak - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Chandak - Full Stack Developer",
    description:
      "Software Engineer with 2.5+ years of experience specializing in React, Node.js, TypeScript, and modern web technologies.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://abhijeetchandak.dev" />
        {/* Performance optimizations for PDF download */}
        <link rel="dns-prefetch" href="/" />
        <link rel="preconnect" href="/" />
        {/* Prefetch PDF for faster downloads - using fetchpriority for better control */}
        <link
          rel="prefetch"
          href="/resume.pdf"
          as="document"
          type="application/pdf"
          fetchPriority="low"
        />
        {/* Set initial theme before React hydrates to prevent hydration mismatch */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to dark mode if localStorage is not available
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ToastProvider>
          <SkipLink />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ToastProvider>
        {/* eslint-disable react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abhijeet Chandak",
              jobTitle: "Full Stack Developer",
              description:
                "Software Engineer with 2.5+ years of experience specializing in React, Node.js, TypeScript, and modern web technologies",
              url: "https://abhijeetchandak.dev",
              image: "https://abhijeetchandak.dev/profile.jpg",
              email: "abhijeetchandak10@gmail.com",
              telephone: "+91 9604237799",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/abhijeet-chandak",
                "https://www.linkedin.com/in/abhijeet-chandak-066279207",
                "https://leetcode.com/u/abhijeetchandak",
              ],
              knowsAbout: [
                "React",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "MongoDB",
                "Express.js",
                "Full Stack Development",
                "Web Development",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
