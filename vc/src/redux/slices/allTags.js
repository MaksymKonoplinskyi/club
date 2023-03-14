import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchTags = createAsyncThunk('posts/fetchTags', async (tagSort) => {
    const { data } = await axios.get(`/tags/${tagSort}`)
    return data;
})


const initialState = {
    

        items: [],
        status: 'loading'

}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: {



        // Получение тегов
        [fetchTags.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },
 
    }
})

export const tagsReducer = tagsSlice.reducer;