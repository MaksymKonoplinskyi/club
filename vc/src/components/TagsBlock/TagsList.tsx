import React from "react"
// import clsx from 'clsx'
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import TagIcon from "@mui/icons-material/Tag"
import ListItemText from "@mui/material/ListItemText"
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchPostsWithTag } from "../../redux/slices/posts"

// import styles from './Tags.module.scss'
// import {ITag} from '../../types/data'
import { ISortParams } from "../../types/data"

interface TagsListProps {
  tagsItems: string[]
}

export const TagsList: React.FC<TagsListProps> = props => {
  const { tagsItems } = props
  const dispatch = useAppDispatch()

  const { postSort, postSortByTag} = useAppSelector(state => state.posts)

  const handleTagClick = (tagName:string) => {
    const sortParams: ISortParams = { tagName: tagName, sort: postSort }
    dispatch(fetchPostsWithTag(sortParams))
  };

  return (
    // <div>
    //   {tagsItems.map((item: string, i: number) => (
    //     <p key={i}>{item}</p>
    //   ))}
    // </div>

    <List>
      {tagsItems.map((item:string, i: number) => (
        <ListItem key={i} value={item} disablePadding>
          <ListItemButton
            selected={postSortByTag === item}
            onClick={() => handleTagClick(item)}
          >
    <ListItemIcon >
      <TagIcon />
    </ListItemIcon>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
