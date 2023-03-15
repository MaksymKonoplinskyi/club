import React from 'react';
import styles from './PostCreationInfo.module.scss';

export const PostCreationInfo = ({ avatarUrl, fullName, createdAt }) => {
const creationDate = createdAt.slice(0,10).split('-').join('.')
const creationTime = createdAt.slice(11,19)
const avaUrl = avatarUrl ? `${process.env.REACT_APP_API_URL}${avatarUrl}` : '/noavatar.png'
  return (
    <div className={styles.postPostCreationInfo}>
      <img className={styles.avatar} src={avaUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.date}>{creationDate + ' ' + creationTime}</span>
      </div>
    </div>
  );
};
