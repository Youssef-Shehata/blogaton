import React from 'react'
import { Post } from '@blogaton/shared'

const PostComponent = ({ post }: { post: Post }) => {
  return (<>
    <div className='title'>{post.title}</div>
    <div className='title'>{post.postedAt}</div>
    <div className='comments'>comments</div>
    <div className='likes'>{post.likes}</div>

    <div className='liked'>{post.liked}</div>
  </>
  )
}

export default PostComponent