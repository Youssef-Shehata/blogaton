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



    app.options('*', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.sendStatus(200); // Respond with HTTP OK status
    });




    app.get('/healthZ', (req, res) => {
      res.status(200).send({ status: 'OK' })
    })
    app.post('/signup', SignUpHandler)
    app.post('/signIn', SignInHandler)



    app.use(authMiddleware)
    app.get('/posts', listPostsHandler)
    app.post('/posts', createPostHandler)




    app.use(errorHandler)


    let port = process.env.PORT || 3000
    app.listen(port)
    console.log(`connecting on port ${port}`)
  }
  catch (e) {
    console.log(e)
  }
})()