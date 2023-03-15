import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"
import { IPost } from "../../types/data"

export const fetchPosts = createAsyncThunk<IPost[], PostSort>(
  "posts/fetchPosts",
  async sort => {
    const { data } = await axios.get(`/posts/sort/${sort}`)
    return data
  }
)

export const fetchPostsWithTag = createAsyncThunk<
  IPost[],
  { tagName: string; sort: PostSort }
>("posts/fetchPostsWithTag", async params => {
  const { tagName, sort } = params
  const { data } = await axios.get(`/posts/withTag/${tagName}/${sort}`)
  return data
})

export const fetchRemovePost = createAsyncThunk<IPost[], string>(
  "posts/fetchRemovePost",
  async id => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data
  }
)

type PostSort = "new" | "pop"
type PostsState = {
  items: IPost[] | null
  isLoading: boolean
  error: string | null
  postSort: PostSort
}
const initialState: PostsState = {
  items: [],
  isLoading: true,
  error: null,
  postSort: "new",
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchPosts.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchPosts.rejected, (state) => {
            state.items = null
            state.isLoading = false
            state.error = "error"
          })
          .addCase(fetchPostsWithTag.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchPostsWithTag.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchPostsWithTag.rejected, (state) => {
            state.items = null
            state.isLoading = false
            state.error = "error"
          })
          .addCase(fetchRemovePost.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchRemovePost.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchRemovePost.rejected, (state) => {
            state.items = null
            state.isLoading = false
            state.error = "error"
          })
              
    // Получение всех статей в порядке указанном в значении sort ('new' или 'popular')

  },
})

export const postsReducer = postsSlice.reducer
