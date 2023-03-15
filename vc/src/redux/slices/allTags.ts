import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "../../axios"
import {ITag} from '../../types/data'

export const fetchTags = createAsyncThunk<ITag[], TagSort, {}>(
  "posts/fetchTags",
  async tagSort => {
    const { data } = await axios.get(`/tags/${tagSort}`)
    return data
  }
)
// type Tag = {
//   id: string
//   name: string
// }

type TagSort = 'new' | 'pop'

type TagsState = {
  items: ITag[]
  sort: TagSort
  isLoading: boolean
  error: string | null
}

const initialState: TagsState = {
  items: [],
  sort: 'new',
  isLoading: false,
  error: null,
}

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Получение тегов
    builder
      .addCase(fetchTags.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchTags.rejected, (state) => {
        state.items = []
        state.isLoading = false
        state.error = "error"
      })
    // [fetchTags.pending]: state => {
    //   state.items = []
    //     state.loading = true
    //     state.error = null
    // },
    // [fetchTags.fulfilled]: (state, action: PayloadAction<Tag[]>) => {
    //   state.items = action.payload
    //   state.status = "loaded"
    // },
    // [fetchTags.rejected]: state => {
    //   state.items = []
    //   state.status = "error"
    // },
  },
})

export const tagsReducer = tagsSlice.reducer

