import { Post } from "../types";

export interface PostDao {
  listPosts(): Post[];
  creatPost(post: Post): void;
  getPostBy(id: string): Post | undefined;
  deletePost(Id: string): void;



}