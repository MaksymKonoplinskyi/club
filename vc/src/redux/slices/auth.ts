import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { IUser } from "../../types/data"

export const fetchAuth = createAsyncThunk<IUser>('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk<IUser>('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchRegister = createAsyncThunk<IUser>('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data;
})

export const fetchPatchProfile = createAsyncThunk<IUser>('auth/fetchPatchProfile', async (params) => {
    const { data } = await axios.patch('/patchProfile', params)
    return data;
})

type UserState = {
    currentUserData: IUser | null
    isLoading: boolean
    error: string | null
  }

const initialState:UserState = {
    currentUserData: null,
    isLoading: true,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUserData = null
        },
    },
    extraReducers: builder => {
        builder 
        .addCase(fetchAuth.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchAuth.fulfilled, (state, action) => {
            state.currentUserData = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchAuth.rejected, (state) => {
            state.currentUserData = null
            state.isLoading = false
            state.error = "error"
          })
          .addCase(fetchAuthMe.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.currentUserData = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchAuthMe.rejected, (state) => {
            state.currentUserData = null
            state.isLoading = false
            state.error = "error"
          })
          .addCase(fetchRegister.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchRegister.fulfilled, (state, action) => {
            state.currentUserData = action.payload
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchRegister.rejected, (state) => {
            state.currentUserData = null
            state.isLoading = false
            state.error = "error"
          })
          .addCase(fetchPatchProfile.pending, state => {
            state.isLoading = true
            state.error = null
          })
          .addCase(fetchPatchProfile.fulfilled, (state, action) => {
            state.currentUserData = {
                ...state.currentUserData,
                ...action.payload,
              };
            state.isLoading = false
            state.error = null
          })
          .addCase(fetchPatchProfile.rejected, (state) => {
            state.currentUserData = null
            state.isLoading = false
            state.error = "error"
          })

    }
}) 

export const selectIsAuth = (state: UserState)=> Boolean(state.currentUserData)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions