import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLogin: false,
    name: "",
    id: 0,
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
            stateClone.token = action.payload.token;

            return stateClone;
        },
        logoutAction(state) {
            const stateClone = {
                ...state,
            };

            stateClone.isLogin = false;
            stateClone.name = "";
            (stateClone.id = 0), (stateClone.token = null);

            return stateClone;
        },

        updateUser(state, action) {
            const stateClone = {
                ...state,
            };

            stateClone.name = action.payload.name;

            return stateClone;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutAction, updateUser } = authSlice.actions;

export default authSlice.reducer;
