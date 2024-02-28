import { response } from "express";
import { listPostsRequest, listPostsResponse } from "../../shared";

export const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : '';

export const listPosts = async (req: listPostsRequest): Promise<listPostsResponse> => {
  const res = await fetch(`http://localhost:4000/posts`, {
    'method': 'GET',
    headers: {
      'Content-Type': 'application/json',

      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imdvam9zYXRvcnUiLCJ1c2VySWQiOiIxMmZkMGY3Yi00ZDA0LTRiNzUtODU3YS04MzM5NGQ5NmQ4ZGQiLCJpYXQiOjE3MDkwNDIyNjEsImV4cCI6MTcwOTIxNTA2MX0.BsgNrFRcFbfa_Pe1wC5ocFF3bEi6tphZMaeFl5imNUk',
    }
  });
  if (!res.ok) {
    console.log('erorr fetching posts')
    return res.json();



  }


  return res.json();
}