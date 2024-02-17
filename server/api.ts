import { application } from "express";
import { Post, Comment, Like, User } from "./types"

//post apis
export interface listPostsRequest { }
export interface listPostsResponse { }

export type createPostReq = Pick<Post, 'title' | 'url' | 'userId'>
export type createPostRes = {}

export interface getPostRequest { }
export interface getPostResponse {
  post: Post;
}


// user api 

export type SignUpReq = Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'password'>
export interface SignUpRes { }

export interface SignInReq {
  login: string,
  password: string
}
export type SignInRes = Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'id'> | string



//comment apis 
export type createCommentReq = Pick<Comment, 'userId' | 'postId' | 'comment'>
export interface createCommentRes { }





//likes apis 
export type createLikeReq = Pick<Like, 'userId' | 'postId'>
export interface createLikeRes { }


