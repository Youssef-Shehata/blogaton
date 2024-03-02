import { Post } from '@blogaton/shared'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listPosts, likePost, dislikePost } from "./client";
import { clsx } from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import rfdc from 'rfdc'
import { useState } from 'react';

export const App = () => {
  const [flipper, setFlipper] = useState(true)
  const queryClient = useQueryClient()
  const { data, error, isLoading } = useQuery({ queryKey: ['listposts'], queryFn: listPosts });

  const { mutateAsync: likeMutation } = useMutation({
    mutationFn: (post: Post) => likePost({
      postId: post.id,
      userId: "309d76d0-a2b1-4a57-8eda-5ab78731d4e9"
    })
    , onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listposts'] })
    },
  })



  const { mutateAsync: dislikeMutation } = useMutation({
    mutationFn: (post: Post) => dislikePost({
      postId: post.id,
      userId: "309d76d0-a2b1-4a57-8eda-5ab78731d4e9"
    })
    , onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listposts'] })
    },
  })

  if (isLoading) return <>loading....</>
  if (error || data == undefined) return <>there was an error fetching posts ,try again later. </>


  const likeHandler = async (post: Post) => {
    if (flipper == false) {
      try {
        await likeMutation(post)
        setFlipper(true)
      } catch (e: any) {
        console.log(e.message)

      }
    } else {
      try {
        await dislikeMutation(post)
        setFlipper(false)
      } catch (e: any) {
        console.log(e.message)

      }
    }


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
          return <div key={post.id} className="Post">
            <div>{post.title}</div>
            <button className={buttonClasses(!!post.liked)} onClick={async () => await likeHandler(post)}><FontAwesomeIcon icon={faHeart} /> </button>
            <button >comments</button>
            <div >likes: {post.likes}</div>





          </div>




        })
      }


    </div>)


}
