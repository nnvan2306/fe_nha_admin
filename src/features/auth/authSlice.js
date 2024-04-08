import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLogin: false,
    token: null,
};

export const authSlice = createSlice({
    initialState: initState,
    name: "authSlice",
    reducers: {
        loginSuccess(state, action) {
            const stateClone = {
                ...state,
            };

            stateClone.isLogin = true;
            stateClone.token = action.payload.token;

            return stateClone;
        },
        logoutAction(state) {
            const stateClone = {
                ...state,
            };

            stateClone.isLogin = false;
            stateClone.token = null;

            return stateClone;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutAction } = authSlice.actions;

export default authSlice.reducer;
