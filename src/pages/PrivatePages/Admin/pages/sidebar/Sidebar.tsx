import "../../../../../../styles/css/sidebar.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes, UserInfo } from "../../../../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Sidebar = () => {

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toHomeAdmin = location.pathname && AdminRoutes.HOMEADMIN;
    const toUsers = location.pathname && `/private/admin/${AdminRoutes.USERS}`;
    const toHotels = location.pathname && `/private/admin/${AdminRoutes.HOTELS}`;
    const toRooms = location.pathname && `/private/admin/${AdminRoutes.ROOMS}`;

    const userState: UserInfo = useSelector((store: AppStore) => store.user);

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">{`Welcome ${userState.username}`}</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">PRINCIPAL</p>
                    <li onClick={() => {
                        navigate(toHomeAdmin, { replace: true });
                    }}>
                        <DashboardIcon className="icon" />
                        <span>Panel</span>
                    </li>
                    <p className="title">LISTAS</p>
                    <li onClick={() => {
                        navigate(toUsers, { replace: true });
                    }}>
                        <PersonOutlineIcon className="icon" />
                        <span>Usuarios</span>
                    </li>
                    <li onClick={() => {
                        navigate(toHotels, { replace: true });
                    }}>
                        <StoreIcon className="icon" />
                        <span>Hoteles</span>
                    </li>
                    <li onClick={() => {
                        navigate(toRooms, { replace: true });
                    }}>
                        <CreditCardIcon className="icon" />
                        <span>Cuartos</span>
                    </li>
                    <p className="title">ÚTIL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Estadisticas</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notificaciones</span>
                    </li>
                    <p className="title">SERVICIO</p>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Configuraciones</span>
                    </li>
                    <p className="title">Usuario</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Perfil</span>
                    </li>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                //   onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className="colorOption"
                //   onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;