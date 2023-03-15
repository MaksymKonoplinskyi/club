import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"
import { IFullPost, IComment } from "../../types/data"

// Full Post start
export const fetchGetFullPost = createAsyncThunk<IFullPost, string>(
  "post/fetchGetFullPost",
  async id => {
    const { data } = await axios.get(`/posts/${id}`)
    return data
  }
)

export const fetchCreateNewPost = createAsyncThunk<IFullPost, IFullPost>(
  "post/fetchCriateNewPost",
  async params => {
    const { data } = await axios.post("/posts", params)
    return data
  }
)

export const fetchEditPost = createAsyncThunk<IFullPost, IFullPost>(
  "post/fetchEditPost",
  async (patchData: IFullPost) => {
    const { _id } = patchData
    const { data } = await axios.patch(`/posts/${_id}`, patchData)
    return data
  }
)
// Full Post end
// Comments for curent full post start
export const fetchCreateComment = createAsyncThunk<IComment, IComment>(
  "posts/fetchCreateComment",
  async params => {
    const { data } = await axios.post("/comment", params)
    return data
  }
)

export const fetchAllComments = createAsyncThunk<IComment[], string>(
  "posts/fetchAllComments",
  async postId => {
    const { data } = await axios.get(`/comments/${postId}`)
    return data
  }
)

export const fetchOneComment = createAsyncThunk<IComment, string>(
  "posts/fetchOneComments",
  async id => {
    const { data } = await axios.get(`/comment/${id}`)
    return data
  }
)

export const fetchPatchComment = createAsyncThunk<IComment, IComment>(
  "posts/fetchPatchComments",
  async pathCommentData => {
    const { _id, text } = pathCommentData
    const { data } = await axios.patch(`/comment/${_id}`, { text })
    return data
  }
)

export const fetchRemoveComment = createAsyncThunk<IComment, string>(
  "posts/fetchRemoveComment",
  async id => {
    const { data } = await axios.delete(`/comment/${id}`)
    return data
  }
)

// Comments for curent full post end
type PostState = {
    currentPostData: IFullPost | null
  isLoading: boolean
  error: string | null
  comments: {
    items: IComment[] 
    isLoading: boolean
    error: string | null
    editCommentIndex: number | null
  }
}

const initialState: PostState = {
    currentPostData: null,
  isLoading: true,
  error: null,
  comments: {
    items: [],
    isLoading: false,
    error: null,
    editCommentIndex: null,
  },
}

const fullPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    editCommentIndex: (state, index) => {
      state.comments.editCommentIndex = index.payload
    },
  },
    extraReducers: builder => {
        builder
          // Full Post start
      .addCase(fetchGetFullPost.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGetFullPost.fulfilled, (state, action) => {
        state.currentPostData = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchGetFullPost.rejected, (state) => {
        state.currentPostData = null
        state.isLoading = false
        state.error = "error"
      })
      .addCase(fetchCreateNewPost.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCreateNewPost.fulfilled, (state, action) => {
        state.currentPostData = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchCreateNewPost.rejected, (state) => {
        state.currentPostData = null
        state.isLoading = false
        state.error = "error"
      }) 
      .addCase(fetchEditPost.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEditPost.fulfilled, (state, action) => {
        state.currentPostData = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchEditPost.rejected, (state) => {
        state.currentPostData = null
        state.isLoading = false
        state.error = "error"
      }) 
    // Full Post end
    // Comments for curent full post start
    .addCase(fetchAllComments.pending, state => {
        state.comments.isLoading = true
        state.comments.error = null
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.comments.items = action.payload
        state.comments.isLoading = false
        state.comments.error = null
      })
      .addCase(fetchAllComments.rejected, (state) => {
        state.comments.isLoading = false
        state.comments.error = "error"
      }) 
    .addCase(fetchCreateComment.pending, state => {
        state.comments.isLoading = true
        state.comments.error = null
      })
      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        state.comments.items.push(action.payload) 
        state.comments.isLoading = false
        state.comments.error = null
      })
      .addCase(fetchCreateComment.rejected, (state) => {
        state.comments.isLoading = false
        state.comments.error = "error"
      }) 
      .addCase(fetchPatchComment.pending, state => {
        state.comments.isLoading = true
        state.comments.error = null
      })
      .addCase(fetchPatchComment.fulfilled, (state, action) => {
        state.comments.items[state.comments.items.findIndex((el) => el._id === action.payload._id)] = action.payload
        state.comments.isLoading = false
        state.comments.error = null
      })
      .addCase(fetchPatchComment.rejected, (state) => {
        state.comments.isLoading = false
        state.comments.error = "error"
      }) 
      .addCase(fetchRemoveComment.pending, state => {
        state.comments.isLoading = true
        state.comments.error = null
      })
     .addCase(fetchRemoveComment.fulfilled, (state, action) => {
          const index = state.comments.items.findIndex((el) => el._id === action.payload._id)
                const commentsItems = state.comments.items.splice(index, 1)
                if (state.currentPostData) {
                    const newCommentsCount = --state.currentPostData.commentsCount
                    state = {
                        ...state,
                        currentPostData: {
                            ...state.currentPostData,
                            commentsCount: newCommentsCount
                        },

                        comments: {
                            ...state.comments,
                            items: commentsItems,
                        }
                    }
                
                    state.comments.isLoading = false
                    state.comments.error = null
                }
        })
      .addCase(fetchRemoveComment.rejected, (state) => {
        state.comments.isLoading = false
        state.comments.error = "error"
      }) 
    } 
}) 

// export const { postout } = postSlice.actions

export const fullPostReducer = fullPostSlice.reducer

export const { editCommentIndex } = fullPostSlice.actions
