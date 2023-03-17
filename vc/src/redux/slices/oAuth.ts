import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { IUser } from "../../types/data"
import { googleLogout } from "@react-oauth/google"

// export const fetchAuth = createAsyncThunk<IUser>('auth/fetchAuth', async (params) => {
//     const { data } = await axios.post('/auth/login', params)
//     return data;
// })

// export const fetchAuthMe = createAsyncThunk<IUser>('auth/fetchAuthMe', async () => {
//     const { data } = await axios.get('/auth/me')
//     return data;
// })

// export const fetchRegister = createAsyncThunk<IUser>('auth/fetchRegister', async (params) => {
//     const { data } = await axios.post('/auth/register', params)
//     return data;
// })

// export const fetchPatchProfile = createAsyncThunk<IUser>('auth/fetchPatchProfile', async (params) => {
//     const { data } = await axios.patch('/patchProfile', params)
//     return data;
// })

type OAuthState = {
    currentUserData: any
    isAuth: boolean
    error: string | null
  }

const initialState:OAuthState = {
    currentUserData: null,
    isAuth: false,
    error: null,
}

const oAuthSlice = createSlice({
    name: 'oAuth',
    initialState,
  reducers: {
    login: (state, action) => {
      state.currentUserData = action.payload
      state.isAuth =true
      },
      logout: (state) => {
        state.currentUserData =null
        state.isAuth = false
        googleLogout()
        },
    },
    extraReducers: builder => {
        

    }
}) 

export const selectIsAuth = (state: OAuthState)=> Boolean(state.isAuth)

export const oAuthReducer = oAuthSlice.reducer

export const {login, logout } = oAuthSlice.actions