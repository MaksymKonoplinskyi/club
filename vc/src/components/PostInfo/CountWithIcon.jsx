import React from 'react';
// import clsx from 'clsx';
import styles from './CountWithIcon.module.scss'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export const CountWithIcon = ({countsData}) => {

    return (
        // <div className={clsx(styles.root, { [styles.rootFull]: true })}>
        //     </div>  
            <ul className={styles.CountWithIcon}>
                <li>
                    <EyeIcon />
                    <span>{countsData.viewsCount}</span>
                </li>
                <li>
                    <CommentIcon />
                    <span>{countsData.commentsCount}</span>
                </li>
            </ul>
      
    )
}