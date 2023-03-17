import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { oAuthReducer } from "./slices/oAuth";
import { fullPostReducer } from "./slices/post";
import { tagsReducer } from "./slices/allTags";


const store = configureStore({
    reducer: {
        fullPost: fullPostReducer,
        posts: postsReducer,
        auth: authReducer,
        oAuth: oAuthReducer,
        tags: tagsReducer,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch