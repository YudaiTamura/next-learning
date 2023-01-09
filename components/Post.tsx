import Link from "next/link";
import { Blog } from "../lib/blogPosts";

const Post = ({ post }: { post: Blog }) => {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/blogs/${post.id}`}>
        <a className=" cursor-pointer text-blue-500 border-b border-blue-500 hover:bg-gray-200">
          {post.title}
        </a>
      </Link>
    </div>
  );
};

export default Post;
