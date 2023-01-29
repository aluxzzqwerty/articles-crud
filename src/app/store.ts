import { configureStore } from "@reduxjs/toolkit";
import articlesApiSlice from "../feautures/articles-api-slice";
import authSlice from "../feautures/auth-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        articlesApi: articlesApiSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;  