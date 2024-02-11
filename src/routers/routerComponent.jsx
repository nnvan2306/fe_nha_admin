import { Route, Routes } from "react-router-dom";
import { RouterDTO } from "../utils/routes.dto";
import Auth from "../systems/auth/Auth";
import Home from "../systems/components/home/Home";

export default function RouterComponent() {
    return (
        <>
            <Routes>
                <Route
                    path={RouterDTO.auth.manageAuth}
                    element={<Auth />}
                ></Route>
                <Route path={RouterDTO.home} element={<Home />}></Route>
            </Routes>
        </>
    );
}
