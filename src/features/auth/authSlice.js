import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLogin: false,
    name: "",
    id: 0,
    avatar: "",
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
            stateClone.name = action.payload.name;
            stateClone.id = action.payload.id;
            stateClone.avatar = action.payload.avatar;
            stateClone.token = action.payload.token;

            return stateClone;
        },
        logoutAction(state) {
            const stateClone = {
                ...state,
            };

            stateClone.isLogin = false;
            stateClone.name = "";
            stateClone.id = 0;
            stateClone.avatar = "";
            stateClone.token = null;

            return stateClone;
        },

        updateName(state, action) {
            const stateClone = {
                ...state,
            };

            stateClone.name = action.payload.name;

            return stateClone;
        },

        updateAvatar(state, action) {
            const stateClone = {
                ...state,
            };

            stateClone.avatar = action.payload.avatar;

            return stateClone;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutAction, updateName, updateAvatar } =
    authSlice.actions;

export default authSlice.reducer;
