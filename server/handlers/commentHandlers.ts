import { createCommentReq, createCommentRes } from "../../sharedResources";
import { ExpressHandler } from "../types";
import { Comment } from "../../sharedResources";
import { db } from "../datastore";



export const createCommentHandler: ExpressHandler<createCommentReq, createCommentRes> = async (req, res) => {
  const { userId, postId, comment } = req.body;
  if (!userId || !postId || !comment) {
    return res.status(400).send({ error: 'comment ,postId and userId required!' })
  }
  const newComment: Comment = {
    id: crypto.randomUUID(),
    userId: userId,
    postId: postId,
    comment: comment.trim().toString(),
    postedAt: Date.now()
  }


  console.log("sending comment to db", newComment)
  db.createComment(newComment).catch(e => {
    console.log("error in handler ", e);
    return res.sendStatus(500);
  })

  res.sendStatus(200)

}


