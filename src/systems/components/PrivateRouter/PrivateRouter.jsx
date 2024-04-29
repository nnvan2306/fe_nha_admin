import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../features/auth/authSlice";
import {
    handleCheckRoleService,
    handleLogoutService,
} from "../../../service/authService";
import { handleApi } from "../../../service/handleApi";
import { RouterDTO } from "../../../utils/routes.dto";

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
                if (res.errorCode === 0) {
                    setIsAdmin(true);
                } else {
                    await handleDispatchLogoutAndLogOutService();
                    navigate(RouterDTO.season.allSeason);
                }
            } catch (err) {
                console.log(err);
                await handleDispatchLogoutAndLogOutService();
            }
            // await handleDispatchLogoutAndLogOutService();
        };

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return <div>{isAdmin ? children : <></>}</div>;
}
