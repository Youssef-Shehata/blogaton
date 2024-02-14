import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";


export class inMemoryDatastore implements Datastore {
  private users: User[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];
  private posts: Post[] = [];






  createUser(user: User): void {
    throw new Error("Method not implemented.");
  }
  getUserByUserName(userName: string): User | undefined {
    throw new Error("Method not implemented.");
  }
  getUserById(Id: string): User | undefined {
    throw new Error("Method not implemented.");
  }
  listPosts(): Post[] {
    return this.posts
  }
  creatPost(post: Post): void {
    this.posts.push(post);
  }
  getPostBy(id: string): Post | undefined {
    throw new Error("Method not implemented.");
  }
  deletePost(Id: string): void {
    throw new Error("Method not implemented.");
  }
  createComment(comment: Comment): void {
    throw new Error("Method not implemented.");
  }
  listComments(postId: string): Comment[] {
    throw new Error("Method not implemented.");
  }
  deleteComment(Id: string): void {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): void {
    throw new Error("Method not implemented.");
  }
}

