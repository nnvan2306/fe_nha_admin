import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../features/auth/authSlice";
import { handleLogoutService } from "../../../service/authService";
import { useEffect } from "react";
import { RouterDTO } from "../../../utils/routes.dto";

// eslint-disable-next-line react/prop-types
export default function CheckDeviceSingle({ children }) {
    const isLogin = useSelector((state) => state.authSlice.isLogin);
    // const token = useSelector((state) => state.authSlice.token);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDispatchLogoutAndLogoutService = async () => {
        dispatch(logoutAction());
        await handleLogoutService();
    };

    useEffect(() => {
        console.log(isLogin);

        if (!isLogin) {
            handleDispatchLogoutAndLogoutService();
            navigate(RouterDTO.auth.login);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return <>{children}</>;
}
