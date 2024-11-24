import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import * as path from 'path'; // Import the 'path' module
import { Datastore } from '..'
import { User, Post, Comment, Like } from '../../../sharedResources/src/types'

export class sqlDataStore implements Datastore {



    private db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb(dbPath: string) {
        // open the database
        this.db = await open({
            filename: path.join(__dirname, 'blogaton.sqlite'),
            driver: sqlite3.Database,
            mode: sqlite3.OPEN_READWRITE,
        });


        this.db.run('PRAGMA foreign_keys = ON;')

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });



        return this;
    }




    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (  id,  firstName,  lastName,  userName,  email,  password) VALUES (? ,? ,? ,? ,? ,?)',
            user.id,
            user.firstName,
            user.lastName,
            user.userName,
            user.email,
            user.password


        )


    }



 async updateCurrentUser(user: Partial<User>): Promise<void> {
        const fields: string[] = [];
        const values: any[] = [];

        if (user.firstName) {
            fields.push('firstName = ?');
            values.push(user.firstName);
        }
        if (user.lastName) {
            fields.push('lastName = ?');
            values.push(user.lastName);
        }
        if (user.userName) {
            fields.push('userName = ?');
            values.push(user.userName);
        }
        if (user.email) {
            fields.push('email = ?');
            values.push(user.email);
        }
        if (user.password) {
            fields.push('password = ?');
            values.push(user.password);
        }

        if (fields.length > 0) {
            const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
            values.push(user.id);
            await this.db.run(sql, ...values);
        }
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
    }

    async getUserByUsername(userName: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE userName = ?`, userName);
    }







    async listPosts(userId?: string | undefined): Promise<Post[]> {
        // const query = 'SELECT * FROM posts'

        const posts = this.db.get(`SELECT * FROM posts WHERE userId = ?`,userId)
        if (posts === undefined ){
            return []
            }
            return posts
    }
    async createPost(post: Post): Promise<void> {
        try {
            await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId , likes , comments) VALUES (?,?,?,?,?,?,?) ',
                post.id,
                post.title,
                post.url,
                post.postedAt,
                post.userId,
                post.likes,
                post.comments)
        } catch (e: any) {
            console.log("error creating post", e?.message)
        }

    }



     async getPost(id: string, userId?: string): Promise<Post | undefined> {
        return this.db.get<Post>(`SELECT * FROM posts WHERE id = ? AND userId = ?`, id, userId);
    }

    async getPostByUrl(url: string): Promise<Post | undefined> {
        return this.db.get<Post>(`SELECT * FROM posts WHERE url = ?`, url);
    }

    async deletePost(id: string): Promise<void> {
        await this.db.run(`DELETE FROM posts WHERE id = ?`, id);
    }



    async createComment(comment: Comment): Promise<void> {
        try {
            await this.db.run('INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES (?,?,?,?,?) ',
                comment.id,
                comment.userId,
                comment.postId,
                comment.comment,
                comment.postedAt,
            )
        } catch (e: any) {
            console.log("error creating post", e?.message)
        }
    }

    async listComments(postId: string): Promise<Comment[]> {
        return await this.db.all('SELECT * FROM comments WHERE postId = ?', postId)
    }
    async deleteComment(id: string): Promise<void> {
        await this.db.run('DELETE * FROM comments WHERE commentId = ?', id)
    }


    async createLike(like: Like): Promise<void> {
        try {
            await this.db.run('INSERT INTO likes ( userId , postId) VALUES (?,?) ',
                like.userId,
                like.postId
            )

        } catch (err: any) {


            console.log(err)

            return;
        };
        try {
            const row = await this.db.get('SELECT likes FROM posts WHERE id = ?', [like.postId]);

            // Check if a row was returned
            if (row) {
                // Initial value of the "likes" column for the specified post ID
                const initialLikesValue = row.likes;
                console.log('Initial likes value:', initialLikesValue);
                const newLikes = initialLikesValue + 1;
                await this.db.run('UPDATE posts SET likes= ? WHERE id = ?', newLikes, like.postId);
            } else {
                console.log('No record found for the specified post ID:', like.postId);
            }
        } catch (err: any) {
            console.error('Error getting likes:', err?.message);
        }


    }
    async deleteLike(like: Like): Promise<void> {

        try {
            let res = await this.db.run('DELETE FROM likes WHERE userId = ? AND postId = ?', [like.userId, like.postId])
            console.log(res.changes)
            if (res.changes == 0) return

        } catch (err: any) {
            console.log(err.message)
            return;
        };


        try {
            const row = await this.db.get('SELECT likes FROM posts WHERE id = ?', [like.postId]);

            // Check if a row was returned
            if (row) {
                // Initial value of the "likes" column for the specified post ID
                const initialLikesValue = row.likes;
                const newLikes = initialLikesValue - 1;
                await this.db.run('UPDATE posts SET likes= ? WHERE id = ?', newLikes, like.postId);
            } else {
                console.log('No record found for the specified post ID:', like.postId);
            }
        } catch (err: any) {
            console.error('Error getting likes:', err?.message);
        }

    }

    
    async getLikes(postId: string): Promise<number> {
        const likes = await this.db.get('SELECT likes FROM posts WHERE id = ?', postId);
        if (!likes) return -1
        return likes;

    }


    exists(): Promise<boolean> {
      throw new Error('Method not implemented.');
    }




    async followUser(followerId: string, followingId: string): Promise<void> {
        await this.db.run('INSERT INTO followers (followerId, followingId) VALUES (?, ?)', followerId, followingId);
    }
    async unfollowUser(followerId: string, followingId: string): Promise<void> {

        await this.db.run('DELETE FROM followers WHERE followerId = ? AND followingId = ?', followerId, followingId);
    }
    async getFollowers(userId: string): Promise<User[]> {
        return await this.db.all<User[]>(
            `SELECT u.* FROM users u JOIN followers f ON u.id = f.followerId WHERE f.followingId = ?`,
            userId
        );
    }

    async getFollowing(userId: string): Promise<User[]> {
        return await this.db.all<User[]>(
            `SELECT u.* FROM users u JOIN followers f ON u.id = f.followingId WHERE f.followerId = ?`,
            userId
        );
    }

    // Get user feed
    async getUserFeed(userId: string): Promise<Post[]> {
        return await this.db.all<Post[]>(
            `SELECT p.* FROM posts p
       JOIN followers f ON p.userId = f.followingId
       WHERE f.followerId = ?
       ORDER BY p.postedAt DESC`,
            userId
        );
    }
}
