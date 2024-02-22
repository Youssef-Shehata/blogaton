import { number } from "prop-types";
import { SignInReq, SignInRes, SignUpReq, SignUpRes } from "../api";
import { jwtSign } from "../auth";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto'

export const SignUpHandler: ExpressHandler<SignUpReq, SignUpRes> = async (req, res) => {

  const {
    firstName,
    lastName,
    userName,
    email,
    password } = req.body
  if (!firstName || !lastName || !userName || !email || !password) {
    return res.status(400).send({ error: 'Please Fill All Fields!' })

  }


  const exists = await db.getUserByEmail(email) || await db.getUserByUsername(userName)

  if (exists) { return res.status(403).send({ error: "user already exists" }) }

  const user: User = {
    id: crypto.randomUUID(),
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: hashPass(password)
  }
  const token = jwtSign({ userId: user.id, userName: user.userName })


  db.createUser(user)
  res.status(200).send({ token: token })

}


export const SignInHandler: ExpressHandler<SignInReq, SignInRes> = async (req, res, next) => {
  const { login, password } = req.body
  if (!login || !password) {
    return res.status(403).send({ error: 'Please provide the required fields' })
  }
  const existing = await db.getUserByEmail(login) || await db.getUserByUsername(login)

  if (!existing || hashPass(password) != existing.password) return res.status(404).send({ error: "Email or Passwored wrong!" })

  const token = jwtSign({
    userName: existing.userName,
    userId: existing.id,

  })
  return res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      userName: existing.userName,
      id: existing.id
    }
    ,
    token: token


  })






}


const hashPass: (pass: string) => string = (pass) => {

  return crypto.pbkdf2Sync(pass, process.env.PASSWORD_SALT!, Number(process.env.SALT_ITER)!, Number(process.env.SALT_LEN)!, 'sha512').toString('hex')

}