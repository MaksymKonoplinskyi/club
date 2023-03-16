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


export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUserData = useAppSelector(state => state.auth.currentUserData)
  const posts = useAppSelector(state => state.posts)
  // const hasSideBar = useMediaQuery((theme) => theme.breakpoints.up('sm'));


  const isPostsLoading = useAppSelector(state => state.posts.isLoading)
   const postSortByTag = useAppSelector(state => state.posts.postSortByTag)
  const { postSort } = useAppSelector(state => state.posts)

// handleChangeCurrentSort = function(event: React.MouseEvent<HTMLElement>, value: any) => void
type ToggleButtonGroupProps = {
  onChange: (e: React.MouseEvent<HTMLElement>, newSort: string) => void
}

  const handleChangeCurrentSort: ToggleButtonGroupProps['onChange'] = (e, newSort) => {
    dispatch(changeCurrentSort(newSort))
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
            color="primary"
            value={postSort}
            exclusive
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
      
      {/* Home */}
    </>
  );
};
