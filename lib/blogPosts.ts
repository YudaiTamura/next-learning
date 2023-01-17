const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/blog-list`;

export type Blog = {
  id: number;
  userId: number;
  title: string;
  body: string;
  created_at: string;
};

export type Blogs = Blog[];

export async function getAllBlogPosts(): Promise<Blogs> {
  try {
    const res = await fetch(apiUrl);
    const posts = (await res.json()) as Blogs;
    // NOTE: 作成日時が新しい順に並び替え
    return posts.sort((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);
      return date2.getTime() - date1.getTime();
    });
  } catch {
    return [];
  }
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
