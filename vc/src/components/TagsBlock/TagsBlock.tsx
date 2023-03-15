import React from "react"

import { useAppDispatch, useAppSelector } from "../../hook"
import { fetchTags } from "../../redux/slices/allTags"
// import { TagsSkeleton } from "./TagsSkeleton"
import { TagsList } from "./TagsList"
// import { SideBlock } from "../SideBlock/SideBlock"

// interface TagsBlockProps = {
//   tagSort
// }

export const TagsBlock: React.FC = () => {
  const dispatch = useAppDispatch()
  const tags = useAppSelector(state => state.tags)
  // const tagsItems = tags.items
  React.useEffect(() => {
    dispatch(fetchTags(tags.sort))
  }, [dispatch, tags.sort])

  return (
    <>
      <div>TegList</div>
      {/* // <SideBlock
    //   title={(tags.sort === 'new') ? 'Недавние тэги' : 'Популярные тэги'}>
    //   {tags.isLoading ? (
    //     // <TagsSkeleton />
    //   ) : (
    //     <TagsList tagsItems={tags.items} />
    //   )}
    // </SideBlock> */}
      {tags.items ? (
        <TagsList tagsItems={tags.items} />
      ) : <div>TegList</div>}

      
    </>
  )
}
