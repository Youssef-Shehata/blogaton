import { db } from "../datastore";
import { Post } from "../../sharedResources/src/types";
import { ExpressHandler } from '../types'

import crypto from 'crypto'
import { createPostReq, createPostRes, getFeedReq, getFeedRes, listPostsRequest, listPostsResponse } from "../../sharedResources/src/api";



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
        likes: 0,
        comments: 0,
    }

    await db.createPost(post).catch(e => {
        console.log(e.message)
        return res.sendStatus(500).json({ error: e.message })
    }
    );
    res.sendStatus(200)

}



export const getFeedHandler: ExpressHandler<getFeedReq, getFeedRes> = async (req, res, next) => {


    const { id: userId } = req.body;

    if (!userId) {
        return res.status(400).send({ error: "please provuserIde a user id " });

    }

    db.getUserFeed(userId).then(posts => {
        res.status(200).send({ posts: posts })
    }).catch(error => {
        console.error('Error fetching posts:', error);
    });





}
