import Layout from "../components/Layout";
import Post from "../components/Post";
import { getAllBlogPosts } from "../lib/blogPosts";

const Blog = ({ posts }) => {
  return (
    <Layout title="Blog">
      <ul className="m-10">{posts && posts.map((post) => <Post key={post.id} post={post} />)}</ul>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps() {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
  };
}
