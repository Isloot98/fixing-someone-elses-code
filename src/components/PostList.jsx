import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { sql } from "@vercel/postgres";
import { POSTS_PER_PAGE } from "@/config";

export async function PostList({ currentPage = 1 }) {
  const { rows: posts } = await sql`
    SELECT 
      diditposts.id, 
      diditposts.title, 
      diditposts.body, 
      diditposts.created_at, 
      diditusers.name,
      COALESCE(SUM(diditvotes.vote), 0) AS vote_total
    FROM 
      diditposts
      JOIN diditusers ON diditposts.user_id = diditusers.id
      LEFT JOIN diditvotes ON diditvotes.post_id = diditposts.id
    GROUP BY 
      diditposts.id, 
      diditusers.name
    ORDER BY 
      vote_total DESC
    LIMIT ${POSTS_PER_PAGE}
    OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}
  `;

  return (
    <>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts?.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">posted by {post.name}</p>
            </div>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} />
    </>
  );
}
