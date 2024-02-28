import { RequestHandler } from "express"

export type jwtToken = {
  userId: string,
  userName: string,

}


export type withError<T> = T & { error: string }

export type ExpressHandler<req, res> = RequestHandler<string, Partial<withError<res>>, Partial<req>, any>
