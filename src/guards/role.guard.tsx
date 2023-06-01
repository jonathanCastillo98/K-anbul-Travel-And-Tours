import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { UserInfo } from "../models";

interface Props {
    role: string;
}

const toLogin = location.pathname && `/login`

export const RoleGuard = ({ role }: Props) => {
    const userState: UserInfo = useSelector((store: AppStore) => store.user);
    return userState.role === role ? <Outlet /> : <Navigate to={toLogin} />
}

export default RoleGuard;