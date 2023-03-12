import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { fullPostReducer } from "./slices/post";
import { tagsReducer } from "./slices/allTags";


const store = configureStore({
    reducer: {
        fullPost: fullPostReducer,
        posts: postsReducer,
        auth: authReducer,
        tags: tagsReducer,
    },
})

export default store;