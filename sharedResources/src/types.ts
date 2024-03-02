
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  // rank : string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
  liked?: boolean;
  likes: number;
  comments: number;
  // score :number;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
  liked?: boolean;
}
