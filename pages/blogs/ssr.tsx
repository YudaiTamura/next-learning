import Link from "next/link";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import BackToMain from "../../components/BackToMain";
import { getAllBlogPosts, Blogs } from "../../lib/blogPosts";

export default function Blog({ posts }: { posts: Blogs }) {
  if (posts.length === 0) {
    return (
      <Layout title="Blogs SSR">
        <div className="m-10">No Blog Posts</div>
        <BackToMain />
      </Layout>
    );
  } else {
    return (
      <Layout title="Blogs SSR">
        <ul className="m-10">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
        <Link href="/blogs">
          <div className="cursor-pointer mt-6">Go to SSG Page</div>
        </Link>
        <BackToMain />
      </Layout>
    );
  }
}

export async function getServerSideProps() {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
  };
}
