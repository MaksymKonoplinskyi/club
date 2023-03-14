import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchCreateComment = createAsyncThunk('posts/fetchCreateComment', async () => {
    const { data } = await axios.post('/comment')
    return data;
})

export const fetchAllComments = createAsyncThunk('posts/fetchAllComments', async (postId) => {
    const { data } = await axios.get(`/comments/:${postId}`)
    return data;
})

export const fetchOneComment = createAsyncThunk('posts/fetchOneComments', async (id) => {
    const { data } = await axios.get(`/comment/:${id}`)
    return data;
})

export const fetchPatchComment = createAsyncThunk('posts/fetchPatchComments', async (id) => {
    const { data } = await axios.patch(`/comment/:${id}`)
    return data;
})

export const fetchRemoveComment = createAsyncThunk('posts/fetchRemoveComment', async (id) =>
    await axios.delete(`/comment/:${id}`)
)

const initialState = {
    post: {
        items: [],
        status: 'loading'
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {

        // Получение статей в порядке популярности
        [fetchCreateComment.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchCreateComment.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },
        [fetchCreateComment.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },

        // // Получение новых статей
        // [fetchPostsNew.pending]: (state) => {
        //     state.items = [];
        //     state.status = 'loading';
        // },
        // [fetchPostsNew.fulfilled]: (state, action) => {
        //     state.items = action.payload;
        //     state.status = 'loaded';
        // },
        // [fetchPostsNew.rejected]: (state) => {
        //     state.items = [];
        //     state.status = 'error';
        // },


        // // Удаление статьи
        // [fetchRemovePost.pending]: (state, action) => {
        //     state.items = state.items.filter(obj => obj._id !== action.meta.arg);
        // },

        // [fetchRemovePost.rejected]: (state) => {
        //     state.posts.items = [];
        //     state.posts.status = 'error';
        // },
    }
})

export const commentsReducer = commentsSlice.reducer;