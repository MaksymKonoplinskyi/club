export interface ITag {
  id: number
  name: string
}
export interface IComment {
    _id: string
    text: string
    user:string
    post:string
  }

export interface IComments {
  items: IComment[]
  isLoading: boolean
  editCommentIndex: null
}

export interface IPostItem {
    post: IPost
    isLoading: boolean
}

export interface IPost {
    _id: null
    title:string
    text:string
    viewsCount:number
    commentsCount:number
    user:string
    isLoading: boolean
    imageUrl:string
    // comments: IComments
    tags: ITag[]
  }