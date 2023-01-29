import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    isSignedIn: null | boolean;
    userId: string | undefined;
    username: string;
}

const initialState: authState = {
    isSignedIn: null,
    userId: undefined,
    username: ''
};

interface signInPayloadType {
    userId: string | undefined;
    username: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<signInPayloadType>) {
            state.isSignedIn = true
            state.userId = action.payload.userId
            state.username = action.payload.username
        },
        signOut(state) {
            state.isSignedIn = false
            state.userId = undefined
            state.username =''
        }
    }
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;