import { RequestHandler } from "express";
import { db } from "../datastore";
import { Next } from "react-bootstrap/esm/PageItem";
import { ExpressHandler, Post } from "../types";
import crypto from 'crypto'



export const listPostsHandler: ExpressHandler<{}, {}> = (req, res, next) => {
  try {
    res.status(200).send({ posts: db.listPosts() })

  } catch (e) {
    next()
  }
}




type createPostReq = Pick<Post, 'title' | 'url' | 'userId'>
type createPostRes = {}


export const createPostHandler: ExpressHandler<createPostReq, createPostRes> = (req, res, next) => {



  if (!req.body.title || !req.body.userId || !req.body.url) return res.sendStatus(400);

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  }
  db.creatPost(post);
  res.sendStatus(200)

} 