import { useDebugValue, useEffect, useState } from "react";
import { Post } from '../../shared'
import { useQuery } from "@tanstack/react-query";
import { listPosts } from "./client";
import { clsx } from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import rfdc from 'rfdc'

export const App = () => {

  const clone = rfdc()
  const { data, error, isLoading } = useQuery({ queryKey: ['listposts'], queryFn: listPosts });
  const [posts, setPosts] = useState<Post[]>([])
  if (isLoading) return <>loading....</>
  if (error || data == undefined) return <>there was an error fetching posts ,try again later. </>



  const likeHandler = (post: Post) => {
    // console.log(posts)
    let newPosts = clone(data.posts);
    let targetIdx = newPosts?.findIndex((target) => target.id == post.id) || 100
    // console.log(targetIdx)
    if (!newPosts || targetIdx == -1) return
    console.log(newPosts[targetIdx].liked);
    data.posts = newPosts
    // console.log(data.posts)
  }


  const buttonClasses: (liked: boolean) => string = (liked) => {
    return clsx(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      {
        'opacity-50': !liked,
        'bg-red-500': !liked,

      }
    );
  }


  return (
    <div className="App">
      posts:
      {
        !!data?.posts && data.posts.map((post) => {
          return <div className="Post">
            <div>{post.title}</div>
            <button className={buttonClasses(!!post.liked)} onClick={() => likeHandler(post)}><FontAwesomeIcon icon={faHeart} /> </button>
            <button >comments</button>





          </div>




        })
      }


    </div>)


}
