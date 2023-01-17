import Link from "next/link";
import { Blog } from "../lib/blogPosts";

const Post = ({ post }: { post: Blog }) => {
  return (
    <li>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/blogs/${post.id}`}>
        <a className=" cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.title}
        </a>
      </Link>
    </li>
  );
};

export default Post;
