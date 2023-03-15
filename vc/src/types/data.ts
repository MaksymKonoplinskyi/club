export interface ITag {
  id: number
  name: string
}
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
  tags: ITag[]
}

export interface IPost {
  _id: string
  title: string
  // text: string
  viewsCount: number
  commentsCount: number
  user: string
  isLoading: boolean
  imageUrl: string
  tags: ITag[]
}

export interface IUser {
  _id: string
  email: string
  fullName: string
  passwordHash: string
  avatarUrl?: string
}
