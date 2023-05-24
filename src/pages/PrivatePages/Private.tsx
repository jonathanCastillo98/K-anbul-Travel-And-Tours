import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes, Roles } from "../../models"
import { RoutesWithNotFound } from "../../utilities"
import { Admin } from "./Admin"
import { RoleGuard } from "../../guards"

const Private = () => {
    return (
        <div className="private">
            <RoutesWithNotFound>
                <Route path="/" element={<div>PRIVATE</div>} />
                {/* <Route path="/" element={<Navigate to={PublicRoutes.HOME} />} /> */}
                <Route element={<RoleGuard role={Roles.ADMIN} />}>
                    <Route path={`${PrivateRoutes.ADMIN}/*`} element={<Admin />} />
                </Route>
            </RoutesWithNotFound>
        </div>
    )
}
export default Private