import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import ReactMarkdown from "react-markdown"

import styles from './FullPostInfo.module.scss';
import { fetchRemovePost } from '../../../redux/slices/posts';
import { PostCreationInfo } from '../../../components/PostInfo/PostCreationInfo';
import { CountWithIcon } from '../../../components/PostInfo/CountWithIcon';
import { PostsTags } from '../../Home/Post/PostsTags';

export const FullPostInfo = ({
  curentPostData,
  isEditable,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const onClickRemove = async () => {
    if (window.confirm('Вы действитльно хотите удалить статью?')) {
      await dispatch(fetchRemovePost(curentPostData._id))
      navigate('/')
    }
  };

  const { viewsCount, commentsCount } = curentPostData
  const countsData = {
    viewsCount,
    commentsCount
  }

  return (
    <div className={styles.fullPostCard}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${curentPostData._id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>

        </div>
      )}
      {curentPostData.imageUrl && (
        <img
          className={styles.image}
          src={`${process.env.REACT_APP_API_URL}${curentPostData.imageUrl}`}
          alt={curentPostData.title}
        />
      )}
      <div className={styles.wrapp}>
        <PostCreationInfo {...curentPostData.user} createdAt={curentPostData.createdAt} />


        <h2 className={styles.title}>
          {curentPostData.title}
        </h2>
        <PostsTags tags={curentPostData.tags} />
        <ReactMarkdown children={curentPostData.text} />
        <CountWithIcon countsData={countsData} />

      </div>
    </div>
  );
};
