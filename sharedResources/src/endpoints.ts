export type EndpointConfig = { url: string; method: 'get' | 'post'; auth?: boolean; sens?: boolean }


export enum Endpoints {
  healthZ = 'healthZ',

  signup = 'signup',
  signin = 'signin',

  listPosts = 'listPosts',
  getPost = 'getPost',
  creatPost = 'creatPost',
  deletePost = 'deletePost',

  listComments = 'listComments',
  createComment = 'createComment',
  deleteComment = 'deleteComment',

  createLike = 'createLike',
  listLikes = 'listLikes',
  deleteLike = 'deleteLike'

}


export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.healthZ]: { url: 'http://localhost/3000/healthZ ', method: 'get' },
  [Endpoints.signin]: { url: 'http://localhost/3000/signin', method: 'post' },
  [Endpoints.signup]: { url: 'http://localhost/3000/signup', method: 'post' },

  [Endpoints.listPosts]: { url: 'http://localhost/3000/posts', method: 'get' },
  [Endpoints.creatPost]: { url: 'http://localhost/3000/posts', method: 'post' },
  [Endpoints.getPost]: { url: 'http://localhost/3000/:id', method: 'get', auth: true },
  [Endpoints.deletePost]: { url: 'http://localhost/:id', method: 'post', auth: true },

  [Endpoints.listLikes]: { url: 'http://localhost/3000/likes', method: 'get' },
  [Endpoints.createLike]: { url: 'http://localhost:4000/addlike', method: 'post' },//add auth
  [Endpoints.deleteLike]: { url: 'http://localhost:4000/deletelike', method: 'post', auth: true },


  [Endpoints.listComments]: { url: 'http://localhost/3000/comments', method: 'get' },
  [Endpoints.createComment]: { url: 'http://localhost/4000/comment', method: 'post', },//add auth
  [Endpoints.deleteComment]: { url: 'http://localhost/3000/:id', method: 'post', auth: true },


}