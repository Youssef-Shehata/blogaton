import express, { RequestHandler } from 'express'
import { createPostHandler, listPostsHandler } from './handlers/postHandlers'
import { errorHandler } from './middleware/errorMiddleware'
import { initDb } from './datastore'
import { SignInHandler, SignUpHandler } from './handlers/AuthHandler'
import dotenv from 'dotenv'
import { authMiddleware } from './middleware/authMiddleware'



(async () => {
  const
    dbPath = '/home/joe/Practice/Nodejs/Pragma/blogaton/server/datastore/sql/migrations/blogaton.sqlite';
  if (!dbPath) {
    console.log('DB_PATH not found')
  }
  try {
    await initDb(dbPath);
    const app = express()

    dotenv.config()
    app.use(express.json())

    app.post('/signup', SignUpHandler)
    app.post('/signIn', SignInHandler)



    app.use(authMiddleware)
    app.get('/posts', listPostsHandler)
    app.post('/posts', createPostHandler)




    app.use(errorHandler)



    app.listen(3000)
    console.log('connecting on port 3000')
  }
  catch (e) {
    console.log(e)
  }
})()