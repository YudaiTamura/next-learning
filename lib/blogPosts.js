import fetch from "node-fetch";

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export async function getAllBlogPosts() {
  const res = await fetch(new URL(apiUrl));
  return res.json();
}
