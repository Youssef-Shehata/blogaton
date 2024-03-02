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
  updateCurrentUser(user: Partial<User>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE id = ?`, id)
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE email = ?`, email)
  }
  getUserByUsername(userName: string): Promise<User | undefined> {
    return this.db.get(`SELECT * FROM users WHERE userName = ? `, userName)

  }

  async listPosts(userId?: string | undefined): Promise<Post[]> {
    // const query = 'SELECT * FROM posts'
    const query = 'SELECT * FROM posts';

    return this.db.all<Post[]>(query)




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
  getPost(id: string, userId?: string | undefined): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  getPostByUrl(url: string): Promise<Post | undefined> {
    throw new Error('Method not implemented.');
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  countComments(postId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
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
  exists(like: Like): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}