import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../features/auth/authSlice";
import {
    handleCheckRoleService,
    handleLogoutService,
} from "../../../service/authService";
import { handleApi } from "../../../service/handleApi";

// eslint-disable-next-line react/prop-types
export default function PrivateRouter({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDispatchLogoutAndLogOutService = async () => {
        dispatch(logoutAction());
        await handleLogoutService();
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await handleApi(handleCheckRoleService);
                if (res.data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    await handleDispatchLogoutAndLogOutService();
                    navigate("/");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetch();
    }, [navigate]);

    return <div>{isAdmin ? children : <></>}</div>;
}
