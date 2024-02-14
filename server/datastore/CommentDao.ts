import { Comment } from "../types";

export interface CommentDao {
  createComment(comment: Comment): void;
  listComments(postId: string): Comment[];
  deleteComment(Id: string): void;



}