import { Post } from "../../sharedResources/src/types";

export interface PostDao {
    listPosts(userId?: string): Promise<Post[]>;
    createPost(post: Post): Promise<void>;
    getPost(id: string, userId?: string): Promise<Post | undefined>;
    getPostByUrl(url: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
    getUserFeed(userId: string): Promise<Post[]>;
}
