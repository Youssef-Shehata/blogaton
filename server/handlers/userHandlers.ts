import { followUserReq, followUserRes, unFollowUserRes, unFollowUserReq, getFollowersRes, getFollowersReq, getFollowingReq, getFollowingRes } from "../../sharedResources";
import { ExpressHandler } from "../types";
import { db } from "../datastore";

export const followUserHandler: ExpressHandler<followUserReq, followUserRes> = async (req, res) => {

    const { id :userId} = req.body;//userid
    if (!userId) {
        return res.status(400).send({ error: 'Followee useruserId required!' })
    }


    console.log("following user ", userId)
    db.followUser(res.locals.useruserId, userId).catch((e: Error) => {

        console.log("error in handler ", e);
        return res.sendStatus(500);
    })
    res.status(200)

}




export const unfollowUserHandler: ExpressHandler<unFollowUserReq, unFollowUserRes> = async (req, res) => {

    const { id:userId } = req.body;//userid
    if (!userId) {
        return res.status(400).send({ error: 'Followee useruserId required!' })
    }


    console.log("following user ", userId)
    db.unfollowUser(res.locals.useruserId, userId).catch((e: Error) => {


        console.log("error in handler ", e);
        return res.sendStatus(500);
    })
    res.status(200)

}

export const getFollowersHandler: ExpressHandler<getFollowersReq, getFollowersRes> = async (req, res) => {

    const { id : followeeId} = req.body;//userid
    if (!followeeId) {
        return res.status(400).send({ error: 'Followee userfolloweeId required!' })
    }


    console.log("following user ", followeeId)
    db.getFollowers(followeeId).then(users => res.status(200).send({ followers: users })).catch((e: Error) => {

        console.log("error in handler ", e);
        return res.sendStatus(500);
    })

}




export const getFollowingHandler: ExpressHandler<getFollowingReq, getFollowingRes> = async (req, res) => {

    const { id:followerId } = req.body;//userid
    if (!followerId) {
        return res.status(400).send({ error: 'Followee userfollowerId required!' })
    }


    console.log("following user ", followerId)
    db.getFollowing(followerId).then(users => res.status(200).send({ following: users })).catch((e: Error) => {

        console.log("error in handler ", e);
        return res.sendStatus(500);
    })

}




