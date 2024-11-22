import { response } from "express";
import { Post, createLikeReq, createLikeRes, deleteLikeReq, deleteLikeRes, listPostsRequest, listPostsResponse } from '@blogaton/shared';
import { ENDPOINT_CONFIGS, Endpoints } from '@blogaton/shared';
import axios from "axios";


export const HOST = process.env.NODE_ENV == 'development' ? 'http://localhost:4000' : '';


// Dynamic resolution of endpoint configuration
function getEndpointConfig(endpointName: string) {
  const endpoint = Endpoints[endpointName as keyof typeof Endpoints];
  if (endpoint) {
    return ENDPOINT_CONFIGS[endpoint];
  } else {
    throw new Error(`Endpoint '${endpointName}' not found`);
  }
}





export const likePost = async (req: createLikeReq): Promise<createLikeRes> => {

  const likeConfig = getEndpointConfig(Endpoints.createLike)
  return await axios({
    method: `${likeConfig.method}`,
    url: `${likeConfig.url}`,
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imdvam9zYXRvcnUiLCJ1c2VySWQiOiIxMmZkMGY3Yi00ZDA0LTRiNzUtODU3YS04MzM5NGQ5NmQ4ZGQiLCJpYXQiOjE3MDkzMTQ0MDUsImV4cCI6MTcwOTQ4NzIwNX0.uwnXEIGheo-7UF_y-8nkCOOGE2PFo1uUXyCrbrQVQD0`
    },
    data: {
      "userId": "309d76d0-a2b1-4a57-8eda-5ab78731d4e9",
      "postId": "3913f2de-2d96-467e-ab55-8ad1bd59474b"
    }
  });

}




export const dislikePost = async (req: deleteLikeReq): Promise<deleteLikeRes> => {

  const likeConfig = getEndpointConfig(Endpoints.deleteLike)
  return await axios({
    method: `${likeConfig.method}`,
    url: `${likeConfig.url}`,
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imdvam9zYXRvcnUiLCJ1c2VySWQiOiIxMmZkMGY3Yi00ZDA0LTRiNzUtODU3YS04MzM5NGQ5NmQ4ZGQiLCJpYXQiOjE3MDkzMTQ0MDUsImV4cCI6MTcwOTQ4NzIwNX0.uwnXEIGheo-7UF_y-8nkCOOGE2PFo1uUXyCrbrQVQD0`
    },
    data: {
      "userId": "309d76d0-a2b1-4a57-8eda-5ab78731d4e9",
      "postId": "3913f2de-2d96-467e-ab55-8ad1bd59474b"
    }
  });

}

export const listPosts = async (req: listPostsRequest): Promise<listPostsResponse> => {
  const res = await fetch(`http://localhost:4000/posts`, {
    'method': 'GET',
    headers: {
      'Content-Type': 'application/json',

      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imdvam9zYXRvcnUiLCJ1c2VySWQiOiIxMmZkMGY3Yi00ZDA0LTRiNzUtODU3YS04MzM5NGQ5NmQ4ZGQiLCJpYXQiOjE3MDkzMTQ0MDUsImV4cCI6MTcwOTQ4NzIwNX0.uwnXEIGheo-7UF_y-8nkCOOGE2PFo1uUXyCrbrQVQD0',
    }
  });
  if (!res.ok) {
    console.log('erorr fetching posts')
    return res.json();



  }


  return res.json();
}
