import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (sort) => {
    const { data } = await axios.get(`/posts/sort/${sort}`)
    return data;
})

export const fetchPostsWithTag = createAsyncThunk('posts/fetchPostsWithTag', async (params) => {
    const { tagName, sort } = params
    const { data } = await axios.get(`/posts/withTag/${tagName}/${sort}`)
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data;
})

const initialState = {
    items: [],
    status: 'loading',
    // currentPostSortingCriteria: 'popular',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {

        // Получение всех статей в порядке указанном в значении sort ('new' или 'popular')
        [fetchPosts.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // Получение статей по тегу
        [fetchPostsWithTag.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPostsWithTag.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchPostsWithTag.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // Удаление статьи
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.items = state.items.filter(obj => obj._id !== action.meta.arg);
        },

        // [fetchRemovePost.rejected]: (state) => {
        //     state.posts.items = [];
        //     state.posts.status = 'error';
        // },
    }
})

export const postsReducer = postsSlice.reducer;