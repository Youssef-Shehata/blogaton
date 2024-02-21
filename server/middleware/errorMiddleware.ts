import { ErrorRequestHandler, RequestHandler } from "express"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('exception : ', err)
  res.status(500).send("oops")
}