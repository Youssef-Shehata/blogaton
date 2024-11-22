import { User } from "../../sharedResources/src/types";


export interface UserDao {
    createUser(user: User): Promise<void>;
    updateCurrentUser(user: Partial<User>): Promise<void>;
    getUserById(id: string): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserByUsername(userName: string): Promise<User | undefined>;
    followUser(followerId: string, followingId: string): Promise<void>;
    unfollowUser(followerId: string, followingId: string): Promise<void>;
    getFollowers(userId: string): Promise<User[]>;
    getFollowing(userId: string): Promise<User[]>;
}
