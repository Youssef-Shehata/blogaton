import express, { RequestHandler } from 'express'
import { createPostHandler, listPostsHandler } from './handlers/postHandlers'
import { errorHandler } from './handlers/errorHandler'
const app = express()
app.use(express.json())

app.listen(3000)

app.get('/posts', listPostsHandler)

app.post('/posts', createPostHandler)


app.use(errorHandler)