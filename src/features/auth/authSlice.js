import { createSlice } from "@reduxjs/toolkit";

const initState = {};

export const authSlice = createSlice({
    initialState: initState,
    name: "authSlice",
    reducers: {
        // loginSuccess(state, action) {},
        // logoutAction(state) {},
    },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutAction } = authSlice.actions;

export default authSlice.reducer;
