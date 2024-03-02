import { createLikeReq, createLikeRes, getLikesReq, getLikesRes } from "../../sharedResources"
import { ExpressHandler } from "../types"
import { db } from "../datastore";
import { Like } from "../../sharedResources";
export const createLikeHandler: ExpressHandler<createLikeReq, createLikeRes> = async (req, res) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) {
    return res.status(400).send({ error: 'both postId and userId required!' })
  }
  const like: Like = {
    userId: userId,
    postId: postId,

  }
  console.log("sending like to db", like)
  db.createLike(like).catch(e => {
    console.log("error in handler ", e);
    return res.sendStatus(500);
  })

  res.sendStatus(200)

}




export const deleteLikeHandler: ExpressHandler<createLikeReq, createLikeRes> = async (req, res) => {
  const { userId, postId } = req.body;
  if (!userId || !postId) {
    return res.status(400).send({ error: 'both postId and userId required!' })
  }


  const like: Like = {
    userId: userId,
    postId: postId,

  }
  console.log("sending -like to db", like)
  db.deleteLike(like).catch(e => {
    console.log("error in handler ", e);
    return res.sendStatus(500);
  })

  res.sendStatus(200)

}


export const getLikesHandler: ExpressHandler<getLikesReq, getLikesRes> = async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).send({ error: 'postId required!' });
  }

  const likes = await db.getLikes(postId);
  if (likes == -1) return res.status(404).send({ error: "post not found" })

  res.status(200).send({ likes })
}