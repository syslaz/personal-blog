import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Image from "next/image";
import Layout from "@/components/Layout";

import styles from "@/styles/Post.module.css";

import profileImage from "@/public/images/profile-picture.webp";

interface PostProps {
  post: {
    title: string;
    content: string;
    date: string;
    author: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <Layout title={`${post.title} - Lazaro Brito`} description={post.content.slice(0, 160)}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <p className={styles.date}>{new Date(post.date).toLocaleDateString()}</p>
          <div className={styles.author}>
            <Image
              src={profileImage}
              alt="Lazaro Brito"
              className={styles.avatar}
            />
            <div>
              <p className={styles.authorName}>Lazaro Brito</p>
              <p className={styles.authorTitle}>Cybersecurity Systems Programmer | U.S. Army Veteran | Rust Enthusiast</p>
            </div>
          </div>
        </header>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDir);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    props: {
      post: {
        title: data.title,
        date: data.date,
        content: htmlContent,
        author: "Lazaro Brito",
      },
    },
  };
}

