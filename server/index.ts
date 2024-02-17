import express, { RequestHandler } from 'express'
import { createPostHandler, listPostsHandler } from './handlers/postHandlers'
import { errorHandler } from './handlers/errorHandler'
import { initDb } from './datastore'
import { SignInHandler, SignUpHandler } from './handlers/UserHandler'

(async () => {
  const
    dbPath = '/home/joe/Practice/Nodejs/Pragma/blogaton/server/datastore/sql/migrations/blogaton.sqlite';
  if (!dbPath) {
    console.log('DB_PATH not found')
  }
  try {
    await initDb(dbPath);
    const app = express()

    app.use(express.json())


    app.get('/posts', listPostsHandler)

    app.post('/posts', createPostHandler)

    app.post('/signup', SignUpHandler)
    app.post('/signIn', SignInHandler)



    app.use(errorHandler)



    app.listen(3000)
    console.log('hello')
  }
  catch (e) {
    console.log(e)
  }
})()