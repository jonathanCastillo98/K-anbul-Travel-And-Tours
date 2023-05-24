import "../../../../../../styles/css/sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes } from "../../../../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";

const Sidebar = () => {

    // To navigate other parte of the app
    const location = useLocation();
    const navigate = useNavigate();

    // Routes
    const toHomeAdmin = location.pathname && AdminRoutes.HOMEADMIN;
    const toUsers = location.pathname && `/private/admin/${AdminRoutes.USERS}`;
    const toHotels = location.pathname && `/private/admin/${AdminRoutes.HOTELS}`;
    const toRooms = location.pathname && `/private/admin/${AdminRoutes.ROOMS}`;

    const userState = useSelector((store: AppStore) => store.user);

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
                    <p className="title">MAIN</p>
                    <li onClick={() => {
                        navigate(toHomeAdmin, { replace: true });
                    }}>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <p className="title">LISTS</p>
                    <li onClick={() => {
                        navigate(toUsers, { replace: true });
                    }}>
                        <PersonOutlineIcon className="icon" />
                        <span>Users</span>
                    </li>
                    <li onClick={() => {
                        navigate(toHotels, { replace: true });
                    }}>
                        <StoreIcon className="icon" />
                        <span>Hotels</span>
                    </li>
                    <li onClick={() => {
                        navigate(toRooms, { replace: true });
                    }}>
                        <CreditCardIcon className="icon" />
                        <span>Rooms</span>
                    </li>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
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