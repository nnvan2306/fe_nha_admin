import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store.js";
import { BrowserRouter } from "react-router-dom";
import App from "./systems/App.jsx";
import "./globalStyle/preview_markdown.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    // </React.StrictMode>,
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>{" "}
    </BrowserRouter>
);
