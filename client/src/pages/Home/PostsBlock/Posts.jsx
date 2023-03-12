import { Grid } from '@mui/material';
import React from 'react';
import { Post } from '../Post/Post';

export const Posts = ({
    items,
    curentUserId,
}) => {

    return (
        <><Grid container spacing={1} columnSpacing={{ md: 2 }}>
           
        {items.map((obj, index) =>
             <Grid xs={12} sm={12} md={12} lg={6}  item>
            <Post
                key={index}
                postItem={obj}
                commentsCount={3}
                isEditable={curentUserId === obj.user._id}
            />
            </Grid>
        )}
        </Grid>
        </>

    )
}

