// export interface ITag {
//   id: number
//   name: string
// }
export interface IComment {
  _id: string
  text: string
  user: string
  post: string
}

export interface IComments {
  items: IComment[]
  isLoading: boolean
  editCommentIndex: null
}

export interface IFullPostItem {
  post: IFullPost
  isLoading: boolean
}

export interface IFullPost {
  _id: string
  title: string
  text: string
  viewsCount: number
  commentsCount: number
  user: string
  isLoading: boolean
  imageUrl: string
  // comments: IComments
  tags: string[]
}

export interface IPost {
  _id: string
  title: string
  text: string
  viewsCount: number
  commentsCount: number
  user: IUser
  // isLoading: boolean
  imageUrl: string
  tags: string[]
}

export interface IUser {
  _id: string
  email: string
  fullName: string
  passwordHash: string
  avatarUrl?: string
}

export type PostSort = "new" | "pop"

export interface ISortParams {
  tagName: string,
  sort: PostSort
}
