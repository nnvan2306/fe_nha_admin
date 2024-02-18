import { Route, Routes } from "react-router-dom";
import { RouterDTO } from "../utils/routes.dto";
import Auth from "../systems/auth/Auth";
import Home from "../systems/components/home/Home";
import View from "../systems/pages/test-uploadFile/View";
import GetImage from "../systems/pages/getImage/GetImage";

export default function RouterComponent() {
    return (
        <>
            <Routes>
                <Route
                    path={RouterDTO.auth.manageAuth}
                    element={<Auth />}
                ></Route>
                <Route path={RouterDTO.home} element={<Home />}></Route>
                <Route path="/image" element={<View />}></Route>
                <Route path="get-image" element={<GetImage />}></Route>
            </Routes>
        </>
    );
}
