import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import Grid from '@mui/material/Grid';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';

import { changeCurrentSort, fetchPosts, fetchPostsWithTag } from '../../redux/slices/posts';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsBlock } from './PostsBlock/PostsBlock';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { PostSort } from "../../types/data"

export const Blog: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUserData = useAppSelector(state => state.auth.currentUserData)
  const posts = useAppSelector(state => state.posts)
  // const hasSideBar = useMediaQuery((theme) => theme.breakpoints.up('sm'));


  const isPostsLoading = useAppSelector(state => state.posts.isLoading)
   


type ToggleButtonGroupProps = {
  onChange: (e: React.MouseEvent<HTMLElement>, newSort: "new" | "pop") => void
}

  const handleChangeCurrentSort: ToggleButtonGroupProps['onChange'] = (e, value) => {
    console.log(e,value);
    dispatch(changeCurrentSort(value))
  }

  React.useEffect(() => {
    posts.postSortByTag ? (
      dispatch(fetchPostsWithTag({ tagName: posts.postSortByTag, sort: posts.postSort }))
    ) : (
      dispatch(fetchPosts(posts.postSort))
    )
  }, [dispatch, posts.postSort, posts.postSortByTag]);


  return (
    <>
      <Grid container spacing={8} columnSpacing={{ sm: 2, md: 3 }}>
        <Grid xs={12} sm={8} md={9} columnSpacing={{ xs: 1, sm: 2 }} item>
          <ToggleButtonGroup
            color="standard"
            value={posts.postSort}
            exclusive={true}
            fullWidth
            onChange={handleChangeCurrentSort}
          >
            <ToggleButton value="new">Новые</ToggleButton>
            <ToggleButton value="pop">Популярные</ToggleButton>
          </ToggleButtonGroup>


            <PostsBlock
              isPostsLoading={isPostsLoading}
              items={posts.items}
              currentUserId={currentUserData?._id}
            />

        </Grid>
        { <Grid sm={4} md={3} item>
          <TagsBlock />
          {/* <TagsBlock tagSort={'pop'} /> */}
        </Grid>}
      </Grid>
    </>
  );
};
