import { SignInReq, SignInRes, SignUpReq, SignUpRes } from "../api";
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
    return res.status(400).send('Please Fill All Fields!')

  }


  const exists = await db.getUserByEmail(email) || await db.getUserByUsername(userName)

  if (exists) { return res.status(403).send("user already exists") }


  const user: User = {
    id: crypto.randomUUID(),
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password
  }
  console.log(user)

  db.createUser(user)
  res.sendStatus(200)

}
export const SignInHandler: ExpressHandler<SignInReq, SignInRes> = async (req, res, next) => {
  const { login, password } = req.body
  let crntUser: User | undefined;
  if (!login || !password) {
    return res.status(403).send("Please Fill The Required Fields")
  }

  if (login.includes('@')) {
    crntUser = await db.getUserByEmail(login)
  } else {
    crntUser = await db.getUserByUsername(login)
  }


  if (!crntUser || password != crntUser.password) return res.status(404).send("Wrong Email or Password! ")

  return res.status(200).json(crntUser)






}