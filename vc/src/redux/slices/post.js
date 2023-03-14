import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

// Full Post start
export const fetchGetFullPost = createAsyncThunk('post/fetchGetFullPost', async (id) => {
    const { data } = await axios.get(`/posts/${id}`)
    return data;
})

export const fetchCriateNewPost = createAsyncThunk('post/fetchCriateNewPost', async (params) => {
    const { data } = await axios.post('/posts', params)
    return data;
})

export const fetchEditPost = createAsyncThunk('post/fetchEditPost', async (patchData) => {
    const { id, fields } = patchData;
    const { data } = await axios.patch(`/posts/${id}`, fields)
    return data;
})
// Full Post end
// Comments for curent full post start
export const fetchCreateComment = createAsyncThunk('posts/fetchCreateComment', async (params) => {
    const { data } = await axios.post('/comment', params)
    return data;
})

export const fetchAllComments = createAsyncThunk('posts/fetchAllComments', async (postId) => {
    const { data } = await axios.get(`/comments/${postId}`)
    return data;
})

export const fetchOneComment = createAsyncThunk('posts/fetchOneComments', async (id) => {
    const { data } = await axios.get(`/comment/${id}`)
    return data;
})

export const fetchPatchComment = createAsyncThunk('posts/fetchPatchComments', async (pathCommentData) => {
    const { commentId, text } = pathCommentData;
    const { data } = await axios.patch(`/comment/${commentId}`, {text})
    return data;
})

export const fetchRemoveComment = createAsyncThunk('posts/fetchRemoveComment', async (id) => {
    const { data } = await axios.delete(`/comment/${id}`)
    return data;
})

// Comments for curent full post end



const initialState = {
    curentPostData: null,
    status: 'loading',
    comments: {
        items: [],
        status: 'loading',
        editCommentIndex: null,
    }

}

const fullPostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

        editComentIndex: (state, index) => {
            state.comments.editCommentIndex = index.payload
        },
    },
    extraReducers: {

        // Full Post start
        [fetchGetFullPost.pending]: (state) => {
            state.status = 'loading';
            state.curentPostData = null;
        },
        [fetchGetFullPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.curentPostData = action.payload;
        },
        [fetchGetFullPost.rejected]: (state) => {
            state.status = 'error';
            state.curentPostData = null;
        },

        [fetchCriateNewPost.pending]: (state) => {
            state.status = 'loading';
            state.curentPostData = null;
        },
        [fetchCriateNewPost.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.curentPostData = action.payload;
        },
        [fetchCriateNewPost.rejected]: (state) => {
            state.status = 'Ошибка при создании статьи';
            state.curentPostData = null;
        },

        [fetchEditPost.rejected]: (state) => {
            state.status = 'Ошибка при редактировании статьи';
            state.curentPostData = null;
        },
        // Full Post end
        // Comments for curent full post start
        [fetchAllComments.pending]: (state) => {
            state.comments.status = 'loading';
            state.comments.items = [];
        },
        [fetchAllComments.fulfilled]: (state, action) => {
            state.comments.status = 'loaded';
            state.comments.items = action.payload;
            state.curentPostData = {
                ...state.curentPostData,
                commentsCount: action.payload.length
            }

        },
        [fetchAllComments.rejected]: (state) => {
            state.comments.status = 'error';
            state.comments.items = [];
        },

        [fetchCreateComment.rejected]: (state) => {
            state.comments.status = 'error';
        },

        [fetchRemoveComment.rejected]: (state) => {
            state.comments.status = 'error';
        },

        [fetchPatchComment.pending]: (state, action) => {
            state.comments.status = 'loaded';
            state.comments.editCommentIndex = null;
        },
        [fetchPatchComment.rejected]: (state) => {
            state.comments.status = 'error';
        },

        // Comments for curent full post end
    }
})

// export const { postout } = postSlice.actions

export const fullPostReducer = fullPostSlice.reducer

export const { editComentIndex } = fullPostSlice.actions