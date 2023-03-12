import React from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchTags } from "../../redux/slices/allTags"
import { TagsSkeleton } from "./TagsSkeleton"
import { Tags } from "./Tags"
import { SideBlock } from "../SideBlock/SideBlock"



export const TagsBlock = (props) => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const tagsItems = tags.items
  const isLoading = tags.status === 'loading'
  React.useEffect(() => {
    dispatch(fetchTags(props.tagSort))
  }, [dispatch, props.tagSort])

  return (
    <SideBlock 
      title={(props.tagSort === 'new') ? 'Недавние тэги' : 'Популярные тэги'}>
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        <Tags tagSort={props.tagSort} tagsItems={tagsItems} />
      )}
    </SideBlock>
  );
};
