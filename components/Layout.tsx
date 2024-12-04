import React from "react";
import Link from "next/link";
import Head from "next/head";

import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Lazaro Brito - Cybersecurity Blog",
  description = "Explore articles on cybersecurity, programming, and technology by Lazaro Brito, a cybersecurity systems programmer and U.S. Army veteran.",
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Lazaro Brito, Cybersecurity Blog, Rust, Virtualization, Anti-Cheat, Cybersecurity Systems Programmer"
        />
        <meta name="author" content="Lazaro Brito" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://yourwebsite.com/profile.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://yourwebsite.com/profile.jpg" />
      </Head>

      <header className={styles.header}>
        <div className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            Lazaro Brito
          </Link>
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <Link href="/">
                 Home 
                </Link>
              </li>
              <li>
                <Link href="/resume">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com/in/syslaz" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://github.com/syslaz" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Lazaro Brito</p>
        <p>
          Connect with me on{" "}
          <Link href="https://linkedin.com/in/syslaz" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>{" "}
          |{" "}
          <Link href="https://github.com/syslaz" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
