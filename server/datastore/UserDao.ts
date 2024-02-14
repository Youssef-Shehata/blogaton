import { User } from "../types";

export interface UserDao {
  createUser(user: User): void;
  getUserByUserName(userName: string): User | undefined;
  getUserById(Id: string): User | undefined;



}