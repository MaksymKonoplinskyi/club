import React from "react"
// import clsx from 'clsx'
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"
import { useDispatch } from "react-redux"
import { fetchPostsWithTag } from "../../redux/slices/posts"
import { useNavigate, useParams } from "react-router-dom"
// import styles from './Tags.module.scss'

export const Tags = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { curentSort, tagName} = useParams()
  const sort = curentSort || 'popular'

  const handleTagClick = (name) => {
    const params = { tagName: name, sort: sort }
    dispatch(fetchPostsWithTag(params))
    navigate(`/tag/${name}/${sort}`)
  };

  return (

    <List>
      {props.tagsItems.map((name, i) => (
        <ListItem key={i} value={name} disablePadding>
          <ListItemButton
            selected={tagName === name}
            onClick={() => handleTagClick(name)}
          >
            <ListItemIcon >
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>

  );
};
