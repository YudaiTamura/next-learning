import Layout from "../../components/Layout";
import Post from "../../components/Post";
import BackToMain from "../../components/BackToMain";
import { getAllBlogPosts, Blogs } from "../../lib/blogPosts";

export default function Blog({ posts }: { posts: Blogs }) {
  if (posts.length === 0) {
    return (
      <Layout title="Blogs">
        <div className="m-10">No Blog Posts</div>
        <BackToMain />
      </Layout>
    );
  } else {
    return (
      <Layout title="Blogs">
        <ul className="m-10">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
        <BackToMain />
      </Layout>
    );
  }
}

export async function getStaticProps() {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
  };
}
