import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import * as path from 'path'; // Import the 'path' module
import { Datastore } from '..'
import { User, Post, Comment, Like } from '../../types'

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
    throw new Error('Method not implemented.');
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
    await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?) ',
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId)


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
  createLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteLike(like: Like): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getLikes(postId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  exists(like: Like): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}