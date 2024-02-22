import { jwtVerify } from "../auth";
import { db } from "../datastore";
import { ExpressHandler } from "../types";

export const authMiddleware: ExpressHandler<{}, {}> = async (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).send({ error: 'Unauthorised access' })
  }

  try {
    const { userId } = jwtVerify(token)
    const user = await db.getUserById(userId)
    if (!user) {
      throw ('user not found')


    }



    res.locals.userId = user.id

    next()

  } catch (e) {
    console.error(e)
    return res.status(401).send({ error: 'bad token' })
  }



}