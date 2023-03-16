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
import { useNavigate, useParams } from "react-router-dom"

// import styles from './Tags.module.scss'
// import {ITag} from '../../types/data'
import { ISortParams } from "../../types/data"

interface TagsListProps {
  tagsItems: string[]
}

export const TagsList: React.FC<TagsListProps> = props => {
  const { tagsItems } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // console.log(tagsItems)

  const { postSort, postSortByTag} = useAppSelector(state => state.posts)
  // const sort = currentSort || 'pop'

  const handleTagClick = (tagName:string) => {
    const sortParams: ISortParams = { tagName: tagName, sort: postSort }
    dispatch(fetchPostsWithTag(sortParams))
    // navigate(`/tag/${name}/${sort}`)
  };

  return (
    <div>
      {tagsItems.map((item: string, i: number) => (
        <p key={i}>{item}</p>
      ))}
    </div>

    // <List>
    //   {tagsItems.map((item:ITag) => (
    //     <ListItem key={item.id} value={item.name} disablePadding>
    //       <ListItemButton
    //         // selected={tagName === item.name}
    //         // onClick={() => handleTagClick(item.name)}
    //       >
    // <ListItemIcon >
    //   <TagIcon />
    // </ListItemIcon>
    //         <ListItemText primary={item.name} />
    //       </ListItemButton>
    //     </ListItem>
    //   ))}
    // </List>
  )
}
