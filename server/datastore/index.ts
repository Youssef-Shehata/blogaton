import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";
// import { inMemoryDatastore } from "./memorydb";
import { sqlDataStore } from "./sql";



export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao { };

export let db: Datastore;

export async function initDb(dbPath: string) {
  // db = new inMemoryDatastore();
  db = await new sqlDataStore().openDb(dbPath);
}
