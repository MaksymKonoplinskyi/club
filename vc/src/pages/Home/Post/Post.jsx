import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import styles from './Post.module.scss'
import { fetchRemovePost } from '../../../redux/slices/posts'
import { PostCreationInfo } from '../../../components/PostInfo/PostCreationInfo'
import { CountWithIcon } from '../../../components/PostInfo/CountWithIcon'
import { PostsTags } from './PostsTags'


export const Post = ({
  postItem,
  isEditable,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickRemove = () => {
    if (window.confirm('Вы действитльно хотите удалить статью?')) {
      dispatch(fetchRemovePost(postItem._id))
    }
  };
  const onClickPost = () => navigate(`/fullPost/${postItem._id}`)


  const { viewsCount, commentsCount } = postItem
  const countsData = {
    viewsCount,
    commentsCount
  }

  return (
    <div className={styles.root}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${postItem._id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <PostCreationInfo {...postItem.user} createdAt={postItem.createdAt} />
      </div>

      {postItem.imageUrl && (
        <img
          onClick={onClickPost}
          className={styles.image}
          src={`${process.env.REACT_APP_API_URL}${postItem?.imageUrl}`}
          alt={postItem.title}
        />
      )}

      <div className={styles.wrapper}>
        <h2 onClick={onClickPost} className={styles.title}>
          {postItem.title}
        </h2>

        <PostsTags  tags={postItem.tags} />
        <div className={styles.countWithIcon} onClick={onClickPost}>
          <CountWithIcon onClick={onClickPost} countsData={countsData} />
        </div>
      </div>
    </div>
  );
};
