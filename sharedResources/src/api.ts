import { Post, Comment, Like, User } from "./types"

//post apis
export interface listPostsRequest { }
export interface listPostsResponse { posts: Post[] }

export type createPostReq = Pick<Post, 'title' | 'url'>
export type createPostRes = {}

export interface getPostRequest { }
export interface getPostResponse {
  post: Post;
}


// user api 

export type SignUpReq = Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'password'>
export interface SignUpRes { token: string }

export interface SignInReq {
  login: string,
  password: string
}
export type SignInRes = {
  user: Pick<User, 'firstName' | 'lastName' | 'userName' | 'email' | 'id'>,
  token: string
}


//following

export type followUserReq = Pick<User  , 'id'>
export interface followUserRes {}

export type unFollowUserReq = Pick<User  , 'id'>
export interface unFollowUserRes {}

export type getFollowersReq = Pick<User , 'id'>
export interface getFollowersRes {followers : User[]}

export type getFollowingReq = Pick<User , 'id'>
export interface getFollowingRes {following : User[]}

export type getFeedReq= Pick<User , 'id'>
export interface getFeedRes {posts: Post[]}
//comment apis 
export type createCommentReq = Pick<Comment, 'userId' | 'postId' | 'comment'>
export interface createCommentRes { }


export type listCommentsReq = Pick<Post, 'id'>
export interface listCommentsRes{comments: Comment[] }



//likes apis 
export type createLikeReq = Pick<Like, 'userId' | 'postId'>
export interface createLikeRes { }

export type getLikesReq = Pick<Like, 'postId'>
export interface getLikesRes { likes: number }


export type deleteLikeReq = Like
export interface deleteLikeRes { }
