import { Grid } from '@mui/material';
import React from 'react';
import { Post } from '../Post/Post';
import {IPost} from '../../../types/data'

interface IPosts {
    items: IPost[]
    currentUserId?: string | null
}

export const Posts: React.FC<IPosts> = ({
    items,
    currentUserId,
}) => {

    return (
        <><Grid container spacing={1} columnSpacing={{ md: 2 }}>
           
        {items.map((obj, index) =>
             <Grid key={index} xs={12} sm={12} md={12} lg={6}  item>
            <Post
                key={obj._id}
                postItem={obj}
                // commentsCount={3}
                isEditable={currentUserId === obj.user._id}
            />
            </Grid>
        )}
        </Grid>
        </>

    )
}

