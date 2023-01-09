import fetch from "node-fetch";

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export type Blog = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Blogs = Blog[];

export async function getAllBlogPosts(): Promise<Blogs> {
  const res = await fetch(apiUrl);
  return res.json() as Promise<Blogs>;
}

export type BlogId = { params: { id: string } };

export async function getAllBlogIds(): Promise<BlogId[]> {
  const res = await fetch(apiUrl);
  const posts = (await res.json()) as Blogs;

  return posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
}

export async function getBlogData(id: string): Promise<Blog> {
  const res = await fetch(`${apiUrl}/${id}/`);
  return res.json() as Promise<Blog>;
}
