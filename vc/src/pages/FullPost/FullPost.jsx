import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import { fetchGetFullPost } from "../../redux/slices/post";
import { FullPostInfo } from "./FullPostInfo/FullPostInfo";
import { fetchAllComments } from "../../redux/slices/post";


import { CommentsBlockSkeleton } from "./CommentsBlock/CommentsBlockSkeleton";
import { CommentsBlock } from "./CommentsBlock/CommentsBlock";
import { PostSkeleton } from '../Home/Post/PostSkeleton'



export const FullPost = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const curentPostData = useSelector(state => state.fullPost.curentPostData)
  const curentPostStatus = useSelector(state => state.fullPost.status)
  const isCurentPostsLoading = curentPostStatus === 'loading'
  const curentUserData = useSelector(state => state.auth.curentUserData)
  const commentsItems = useSelector(state => state.fullPost.comments.items)
  const curentCommentsStatus = useSelector(state => state.fullPost.comments.status)
  const isCommentsLoading = curentCommentsStatus === 'loading'

  React.useEffect(() => {
    dispatch(fetchGetFullPost(id))
    dispatch(fetchAllComments(id))
  }, [dispatch, id])

  return (
    <>
      {isCurentPostsLoading ? <PostSkeleton /> : (
        <FullPostInfo
          curentPostData={curentPostData}
          isEditable={curentUserData?._id === curentPostData.user._id}
        />
      )
      }
      {isCommentsLoading ? <CommentsBlockSkeleton /> : (
        <CommentsBlock
          items={commentsItems} curentUserId={curentUserData?._id}
        />

      )}
    </>

  );
};
