import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { Vote } from "@/components/Vote";
import { sql } from "@vercel/postgres";

export default async function SinglePostPage({ params }) {
  const postId = params.postId;
  console.log(postId);
  const { rows: posts } =
    await sql`SELECT diditposts.id, diditposts.title, diditposts.body, diditposts.created_at, diditusers.name, 
    COALESCE(SUM(diditvotes.vote), 0) AS vote_total
    FROM diditposts
    JOIN diditusers ON diditposts.user_id = diditusers.id
    LEFT JOIN diditvotes ON diditvotes.post_id = diditposts.id
    WHERE diditposts.id = ${postId}
    GROUP BY diditposts.id, diditusers.name
    LIMIT 1`;
  console.log(posts);

  return posts && posts.length > 0 ? (
    <div className="max-w-screen-lg mx-auto pt-4 pr-4">
      <div className="flex space-x-6">
        <Vote postId={posts[0].id} votes={posts[0].vote_total} />
        <div className="">
          <h1 className="text-2xl">{posts[0].title}</h1>
          <p className="text-zinc-400 mb-4">Posted by {posts[0].name}</p>
        </div>
      </div>
      <main className="whitespace-pre-wrap m-4">{posts[0].body}</main>

      {/* <CommentForm postId={posts[0].id} />
      <CommentList postId={posts[0].id} /> */}
    </div>
  ) : (
    <div>No post found</div>
  );
}
