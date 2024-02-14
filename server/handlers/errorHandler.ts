import { RequestHandler } from "express"

export const errorHandler: RequestHandler = (req, res) => {
  res.status(500).send("oops")
}