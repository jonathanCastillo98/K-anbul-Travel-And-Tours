import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models";

interface Props {
    privateValidation: boolean;
}


export const AuthGuard = ({ privateValidation }: Props) => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.token ?
        privateValidation ? (
            <Outlet />
        ) : (
            <Navigate replace to={PrivateRoutes.PRIVATE} />
        ) : (
            <Navigate replace to={PublicRoutes.LOGIN} />
        );
}

export default AuthGuard;