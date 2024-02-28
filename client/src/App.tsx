import { useDebugValue, useEffect, useState } from "react";
import { Post } from '../../shared'
import { useQuery } from "@tanstack/react-query";
import { listPosts } from "./client";
export const App = () => {
  const [posts, setPosts] = useState([])

  const { data, error, isLoading } = useQuery({ queryKey: ['listposts'], queryFn: listPosts });




  if (isLoading) return <>loading....</>

  if (error) return <>there was an error fetching posts ,try again later. </>

  return (
    <div className="App">
      posts:
      {
        !!data?.posts && data.posts.map((post) => {
          return <div>{post.title}</div>
        })
      }


    </div>)


}
