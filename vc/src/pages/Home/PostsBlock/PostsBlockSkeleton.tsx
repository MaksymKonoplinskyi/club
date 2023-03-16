import React from 'react';
import { PostSkeleton } from '../Post/PostSkeleton';

export const PostsBlockSkeleton = () => {

    return (
        <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </>
    );
}

