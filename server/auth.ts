import jwt from 'jsonwebtoken'
import { jwtToken } from './types'



export const jwtSign: (obj: jwtToken) => string = (obj) => {


  return jwt.sign(obj, getJwtSecret(), { expiresIn: '2d' })
}


export const jwtVerify: (token: string) => jwtToken = (token) => {
  return jwt.verify(token, getJwtSecret()) as jwtToken
}


const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    console.log('Secret Key Missing !!!')
    process.exit(1)
  }

  return secret
}
