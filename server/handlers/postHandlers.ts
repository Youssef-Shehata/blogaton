import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
import crypto from 'crypto'
import { createPostReq, createPostRes, listPostsRequest, listPostsResponse } from "../api";



export const listPostsHandler: ExpressHandler<listPostsRequest, listPostsResponse> = (req, res, next) => {

  db.listPosts().then(posts => {
    res.status(200).send({ posts: posts })
  })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}




export const createPostHandler: ExpressHandler<createPostReq, createPostRes> = async (req, res, next) => {

  const userId = res.locals.userId

  if (!req.body.title || !req.body.url) return res.sendStatus(400);

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: userId,
  }

  await db.createPost(post);
  res.sendStatus(200)

} 