import express from 'express'
import { createPostHandler, getFeedHandler, listPostsHandler } from './handlers/postHandlers'
import { errorHandler } from './middleware/errorMiddleware'
import { initDb } from './datastore'
import { SignInHandler, SignUpHandler } from './handlers/AuthHandler'
import dotenv from 'dotenv'
import { authMiddleware } from './middleware/authMiddleware'
import { requestLoggerMiddleware } from './middleware/loggerMiddleware'
import { createLikeHandler, getLikesHandler, deleteLikeHandler } from './handlers/likeHandlers'
import { createCommentHandler, listCommentsHandler } from './handlers/commentHandlers'
import { followUserHandler, getFollowersHandler, getFollowingHandler, unfollowUserHandler } from './handlers/userHandlers'


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

        app.use(requestLoggerMiddleware)

        app.options('*', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.sendStatus(200); // Respond with HTTP OK status
        });


        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

        app.get('/healthZ', (req, res) => {
            res.status(200).send({ status: 'OK' })
        })
        app.post('/signup', SignUpHandler)
        app.post('/signIn', SignInHandler)

        app.get('/posts', listPostsHandler)
        app.get('/comments', listCommentsHandler);

        //AUTHED 
        app.use(authMiddleware)
        app.post('/posts', createPostHandler)

        app.post('/addlike', createLikeHandler)
        app.get('/likes', getLikesHandler)
        app.post('/deletelike', deleteLikeHandler)


        app.post('/comments', createCommentHandler)

        app.post('/follow', followUserHandler);
        app.post('/unfollow', unfollowUserHandler);

        app.get('/followers', getFollowersHandler);
        app.get('/following', getFollowingHandler);

        app.get('/feed', getFeedHandler);


        app.use(errorHandler)


        let port = process.env.PORT || 3000
        app.listen(port)
        console.log(`connecting on port ${port}`)
    }
    catch (e) {
        console.log(e)
    }
})()
