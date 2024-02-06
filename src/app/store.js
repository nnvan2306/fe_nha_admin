import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "../features/auth/authSlice";

const persistConfigAuth = {
    key: "auth",
    storage,
};

const persistedReducerAuth = persistReducer(persistConfigAuth, authSlice);

export const store = configureStore({
    reducer: {
        authSlice: persistedReducerAuth,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
