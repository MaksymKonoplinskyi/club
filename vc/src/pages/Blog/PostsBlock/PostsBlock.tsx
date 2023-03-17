import React from "react"
import { Posts } from "./Posts"

import { PostsBlockSkeleton } from "./PostsBlockSkeleton"
import {IPost} from '../../../types/data'

interface IPostsBlock {
    items: IPost[] | null
    isPostsLoading: boolean
    currentUserId?: string | null
}

export const PostsBlock: React.FC<IPostsBlock> = ({ isPostsLoading, items, currentUserId }) => {
  
  return (
    <>
      {isPostsLoading ? (
        // <div />
        <PostsBlockSkeleton />
      ) : (
        items && <Posts items={items} currentUserId={currentUserId} />
      )}
    </>
  )
}
