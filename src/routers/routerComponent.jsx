import { Route, Routes } from "react-router-dom";
import { RouterDTO } from "../utils/routes.dto";
import Auth from "../systems/auth/Auth";

export default function RouterComponent() {
    return (
        <>
            <Routes>
                <Route
                    path={RouterDTO.auth.manageAuth}
                    element={<Auth />}
                ></Route>
            </Routes>
        </>
    );
}
