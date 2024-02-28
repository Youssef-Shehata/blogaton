import { db } from "../datastore";
import { Post } from "../../shared/src/types";
import { ExpressHandler } from '../types'

import crypto from 'crypto'
import { createPostReq, createPostRes, listPostsRequest, listPostsResponse } from "../../shared/src/api";



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