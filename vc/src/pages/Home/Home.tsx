import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Grid from '@mui/material/Grid';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';

// import { fetchPosts, fetchPostsWithTag } from '../../redux/slices/posts';
import { useNavigate, useParams } from 'react-router-dom';
// import { PostsBlock } from './PostsBlock/PostsBlock';

// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import useMediaQuery from '@mui/material/useMediaQuery'


export const Home: React.FC  = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const curentUserData = useSelector(state => state.auth.curentUserData)
  // const posts = useSelector(state => state.posts)
  // const hasSideBar = useMediaQuery((theme) => theme.breakpoints.up('sm'));


  // const isPostsLoading = posts.status === 'loading'
  // const { curentSort, tagName } = useParams()

  // const handleChangeCurentSort = (e, newSort) => {
  //   (newSort === 'new') ? (
  //     navigate(tagName ? `/tag/${tagName}/new` : '/new')
  //   ) : (
  //     navigate(tagName ? `/tag/${tagName}/popular` : '/popular')
  //   )
  // }

  // React.useEffect(() => {
  //   const params = { tagName: tagName, sort: curentSort || 'popular' }
  //   tagName ? (
  //     dispatch(fetchPostsWithTag(params))
  //   ) : (
  //     dispatch(fetchPosts(curentSort || 'popular'))
  //   )
  // }, [dispatch, curentSort, tagName]);


  return (
    <>
      Home
      {/* <Grid container spacing={8} columnSpacing={{ sm: 2, md: 3 }}>
        <Grid xs={12} sm={8} md={9} columnSpacing={{ xs: 1, sm: 2 }} item>
          <ToggleButtonGroup
            color="primary"
            value={curentSort}
            exclusive
            fullWidth
            onChange={handleChangeCurentSort}
          >
            <ToggleButton value="new">Новые</ToggleButton>
            <ToggleButton value="popular">Популярные</ToggleButton>
          </ToggleButtonGroup>


            <PostsBlock
              isPostsLoading={isPostsLoading}
              items={posts.items}
              curentUserId={curentUserData?._id}
            />

        </Grid>
        {hasSideBar && <Grid sm={4} md={3} item>
          <TagsBlock tagSort = {'new'} />
          <TagsBlock tagSort={'popular'} />
        </Grid>}
      </Grid> */}
      <TagsBlock />
    </>
  );
};
