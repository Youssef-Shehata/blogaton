import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../../shared/src/types";

// @ts-ignore
export class inMemoryDatastore implements Datastore {
  private users: User[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];
  private posts: Post[] = [];






  //   createUser(user: User): void {
  //     this.users.push(user)

  //   }
  //   getUserByUserName(userName: string): User | undefined {
  //     return this.users.find((u) => { u.userName === userName })

  //   }
  //   getUserById(Id: string): User | undefined {
  //     return this.users.find((u) => { u.id === Id })

  //   }
  //   listPosts(): Post[] {
  //     return this.posts
  //   }
  //   creatPost(post: Post): void {
  //     this.posts.push(post);
  //   }
  //   getPostBy(id: string): Post | undefined {
  //     return this.posts.find((p) => { p.id === id })
  //   }
  //   deletePost(Id: string): void {
  //     const idx = this.posts.findIndex(p => p.id === Id)
  //     if (idx == -1) return
  //     this.posts.splice(idx, 1)
  //   }
  //   createComment(comment: Comment): void {
  //     this.comments.push(comment);
  //   }
  //   listComments(postId: string): Comment[] {
  //     return this.comments.filter(c => c.postId === postId)
  //   }
  //   deleteComment(Id: string): void {
  //     const idx = this.comments.findIndex(c => c.id === Id)
  //     if (idx == -1) return
  //     this.comments.splice(idx, 1)
  //   }
  //   createLike(like: Like): void {
  //     this.likes.push(like)
  //   }
}

