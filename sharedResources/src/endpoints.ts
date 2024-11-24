
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export type EndpointConfig = {
  url: string;
  method: HttpMethod;
  auth?: boolean;
  sensitive?: boolean;
};

export enum Endpoints {
  // Health Check
  HealthCheck = 'healthCheck',

  // Authentication
  SignUp = 'signUp',
  SignIn = 'signIn',

  // Posts
  ListPosts = 'listPosts',
  GetPost = 'getPost',
  CreatePost = 'createPost',
  DeletePost = 'deletePost',
  UpdatePost = 'updatePost',

  // Comments
  ListComments = 'listComments',
  CreateComment = 'createComment',
  DeleteComment = 'deleteComment',
  UpdateComment = 'updateComment',

  // Likes
  CreateLike = 'createLike',
  ListLikes = 'listLikes',
  DeleteLike = 'deleteLike',

  // Social
  Follow = 'follow',
  Unfollow = 'unfollow',
  GetFollowers = 'getFollowers',
  GetFollowing = 'getFollowing',

  // Feed
  GetUserFeed = 'getUserFeed'
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/';

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  // Health Check
  [Endpoints.HealthCheck]: {
    url: `${API_BASE_URL}/health`,
    method: 'get'
  },

  // Authentication
  [Endpoints.SignUp]: {
    url: `${API_BASE_URL}/auth/signup`,
    method: 'post',
    sensitive: true
  },
  [Endpoints.SignIn]: {
    url: `${API_BASE_URL}/auth/signin`,
    method: 'post',
    sensitive: true
  },

  // Posts
  [Endpoints.ListPosts]: {
    url: `${API_BASE_URL}/posts`,
    method: 'get'
  },
  [Endpoints.GetPost]: {
    url: `${API_BASE_URL}/posts/:id`,
    method: 'get'
  },
  [Endpoints.CreatePost]: {
    url: `${API_BASE_URL}/posts`,
    method: 'post',
    auth: true
  },
  [Endpoints.UpdatePost]: {
    url: `${API_BASE_URL}/posts/:id`,
    method: 'put',
    auth: true
  },
  [Endpoints.DeletePost]: {
    url: `${API_BASE_URL}/posts/:id`,
    method: 'delete',
    auth: true
  },

  // Comments
  [Endpoints.ListComments]: {
    url: `${API_BASE_URL}/posts/:postId/comments`,
    method: 'get'
  },
  [Endpoints.CreateComment]: {
    url: `${API_BASE_URL}/posts/:postId/comments`,
    method: 'post',
    auth: true
  },
  [Endpoints.UpdateComment]: {
    url: `${API_BASE_URL}/comments/:id`,
    method: 'put',
    auth: true
  },
  [Endpoints.DeleteComment]: {
    url: `${API_BASE_URL}/comments/:id`,
    method: 'delete',
    auth: true
  },

  // Likes
  [Endpoints.ListLikes]: {
    url: `${API_BASE_URL}/posts/:postId/likes`,
    method: 'get'
  },
  [Endpoints.CreateLike]: {
    url: `${API_BASE_URL}/posts/:postId/likes`,
    method: 'post',
    auth: true
  },
  [Endpoints.DeleteLike]: {
    url: `${API_BASE_URL}/posts/:postId/likes`,
    method: 'delete',
    auth: true
  },

  // Social
  [Endpoints.Follow]: {
    url: `${API_BASE_URL}/users/:userId/follow`,
    method: 'post',
    auth: true
  },
  [Endpoints.Unfollow]: {
    url: `${API_BASE_URL}/users/:userId/unfollow`,
    method: 'post',
    auth: true
  },
  [Endpoints.GetFollowers]: {
    url: `${API_BASE_URL}/users/:userId/followers`,
    method: 'get'
  },
  [Endpoints.GetFollowing]: {
    url: `${API_BASE_URL}/users/:userId/following`,
    method: 'get'
  },

  // Feed
  [Endpoints.GetUserFeed]: {
    url: `${API_BASE_URL}/feed`,
    method: 'get',
    auth: true
  }
};

// TODO::Utility function to replace URL parameters


// Type guard for checking if an endpoint requires authentication
export const requiresAuth = (endpoint: Endpoints): boolean => {
  return !!ENDPOINT_CONFIGS[endpoint].auth;
};

// Type guard for checking if an endpoint contains sensitive data
export const isSensitive = (endpoint: Endpoints): boolean => {
  return !!ENDPOINT_CONFIGS[endpoint].sensitive;
};
