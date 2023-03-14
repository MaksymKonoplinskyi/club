import React from 'react';
import { Posts } from './Posts';

import { PostsBlockSkeleton } from './PostsBlockSkeleton';




export const PostsBlock = ({
    isPostsLoading,
    items,
    curentUserId,
}) => {
    return (
        <>{(
            isPostsLoading ? <PostsBlockSkeleton /> : (<Posts
                items={items}
                curentUserId={curentUserId} />
                )
        )}
        </>

    )
}