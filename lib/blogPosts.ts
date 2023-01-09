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
