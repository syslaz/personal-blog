import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

import styles from "@/styles/Home.module.css";

import heroImage from "@/public/images/f1a77855-d892-4a50-bffd-4537ddf31463.webp";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <section className={styles.hero}>
        <h1>Welcome to My Cybersecurity Blog</h1>
        <p>
          Hi, I’m Lazaro Brito—Cybersecurity Systems Programmer, U.S. Army Veteran, and relentless innovator. Here, I share my journey and insights into cybersecurity, programming, and emerging technologies.
        </p>

        <Image
          src={heroImage}
          alt="Cybersecurity expert in a futuristic setting"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.featured}>
        <h2>Featured Articles</h2>
        {posts.filter((post) => post.title !== "My Resume").map((post) => (
          <article key={post.slug} className={styles.post}>
            <h3>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </h3>
            <p>{post.description}</p>
            <p className={styles.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </article>
        ))}
      </section>

      <section className={styles.about}>
        <h2>About Me</h2>
        <p>
          I’m a passionate problem-solver with over 15 years of hands-on experience in low-level programming, reverse engineering, and virtualization. My self-taught journey started as a kid in Miami, FL, where my curiosity turned challenges into opportunities.
        </p>
        <p>
          After serving six years in the U.S. Army and learning valuable lessons in resilience, adaptability, and leadership, I transitioned into cybersecurity and software development. I’m driven by a mission to tackle global challenges and build secure, innovative solutions.
        </p>
        <p>
          Let’s connect—whether you’re exploring opportunities, seeking insights, or collaborating on impactful projects.
        </p>
        <Link href="/resume" className={styles.resumeLink}>
          View My Resume
        </Link>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { props: { posts } };
}

