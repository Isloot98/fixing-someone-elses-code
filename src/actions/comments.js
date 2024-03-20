// "use server";

// import { auth } from "@/auth";
// import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";

// export async function saveComment({ postId, parentCommentId }, formData) {
//   const session = await auth();

//   await sql`INSERT INTO comments (user_id, post_id, parent_comment_id, body) VALUES (${
//     session.user.id
//   }, ${postId}, ${parentCommentId}, ${formData.get("comment")})`,
//     // [session.user.id, postId, parentCommentId, formData.get("comment")];

//     revalidatePath(`/post/${postId}`);
//   return { success: true };
// }
