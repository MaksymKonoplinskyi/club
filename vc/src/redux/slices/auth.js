import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data;
})

export const fetchPatchProfile = createAsyncThunk('auth/fetchPatchProfile', async (params) => {
    const { data } = await axios.patch('/patchProfile', params)
    return data;
})

const initialState = {
    curentUserData: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.curentUserData = null
        },
    },
    extraReducers: {
            [fetchAuth.pending]: (state) => {
                state.status = 'loading';
                state.curentUserData = null;
            },
            [fetchAuth.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.curentUserData = action.payload;
            },
            [fetchAuth.rejected]: (state) => {
                state.status = 'error';
                state.curentUserData = null;
            },

            [fetchAuthMe.pending]: (state) => {
                state.status = 'loading';
                state.curentUserData = null;
            },
            [fetchAuthMe.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.curentUserData = action.payload;
            },
            [fetchAuthMe.rejected]: (state) => {
                state.status = 'error';
                state.curentUserData = null;
            },

            [fetchRegister.pending]: (state) => {
                state.status = 'loading';
                state.curentUserData = null;
            },
            [fetchRegister.fulfilled]: (state, action) => {
                state.status = 'loaded';
                state.curentUserData = action.payload;
            },
            [fetchRegister.rejected]: (state) => {
                state.status = 'error';
                state.curentUserData = null;
            },

            [fetchPatchProfile.fulfilled]: (state, action) => {
              state.curentUserData = {
                ...state.curentUserData,
                ...action.payload,
              };
            },
            [fetchPatchProfile.rejected]: (state) => {
                state.status = 'error';
                state.curentUserData = null;
            },

        }
    })

export const selectIsAuth = state => Boolean(state.auth.curentUserData)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions