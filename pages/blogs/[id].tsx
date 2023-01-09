import Link from "next/link";
import Layout from "../../components/Layout";
import { Blog, BlogId, getAllBlogIds, getBlogData } from "../../lib/blogPosts";

const Post = ({ post }: { post: Blog }) => {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">ID : {post.id}</p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blogs">
        <div className=" flex items-center cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Back to Blogs</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;

export async function getStaticPaths() {
  const paths = await getAllBlogIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: BlogId) {
  const post = await getBlogData(params.id);
  return {
    props: { post },
  };
}
