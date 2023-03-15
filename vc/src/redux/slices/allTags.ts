import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchTags = createAsyncThunk<Tag[], void, {}>(
  "posts/fetchTags",
  async tagSort => {
    const { data } = await axios.get(`/tags/${tagSort}`)
    return data
  }
)
type Tag = {
  id: string
  name: string
}

type TagsState = {
  items: Tag[]
  loading: boolean
  error: string | null
}

const initialState: TagsState = {
  items: [],
  loading: false,
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
        state.loading = true
        state.error = null
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchTags.rejected, (state) => {
        state.items = []
        state.loading = false
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
