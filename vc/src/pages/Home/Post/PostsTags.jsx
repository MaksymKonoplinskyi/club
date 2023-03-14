import React from 'react'

import { useDispatch } from 'react-redux'

import styles from './Post.module.scss'
import { fetchPostsWithTag, } from '../../../redux/slices/posts'
import { useNavigate, useParams} from 'react-router-dom';


export const PostsTags = ({
    tags,
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { curentSort} = useParams()
    const sort = curentSort || 'popular'


    const handleTagClick = (name) => {
        navigate(`/tag/${name}/${sort}`)
        const params = {tagName : name, sort: sort} 
        dispatch(fetchPostsWithTag(params))
    };

    return (
        <div className={styles.root}>

            <ul className={styles.tags}>
                {tags.map((name, i) => (
                    <li key={name} >
                        <div
                            onClick={() => handleTagClick(name)}
                            key={name} >#{name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
