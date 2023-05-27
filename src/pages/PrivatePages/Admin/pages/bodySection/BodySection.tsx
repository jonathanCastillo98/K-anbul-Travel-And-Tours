import '../../../../../../styles/css/bodySection.css'
import { Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../../../../utilities"
import NavbarAdmin from "../../components/navbarAdmin/NavbarAdmin"
import { AdminRoutes } from "../../../../../models"
import HomeAdmin from "./homeAdmin/HomeAdmin"
import { hotelColumns, roomColumns, userColumns } from "../../../../../datatableSource"
import Single from "./single/Single"
import List from "./list/List"
import { userInputs } from "../../../../../formSource"
import New from "./new/New"
import NewHotel from "./newHotel/NewHotel"
import NewRoom from "./newRoom/NewRoom"

const BodySection = () => {
    return (
        <div className="mainContent">
            <NavbarAdmin />
            <div className="bottom">
                <RoutesWithNotFound>
                    <Route path='/' element={<Navigate to={AdminRoutes.HOMEADMIN} />} />
                    <Route path={AdminRoutes.HOMEADMIN} element={<HomeAdmin />} />
                    <Route path={AdminRoutes.USERS}>
                        <Route index element={<List columns={userColumns} />} />
                        <Route path=":id" element={<Single />} />
                        <Route path="new" element={<New inputs={userInputs} title="Add new user" />} />
                    </Route>
                    <Route path={AdminRoutes.HOTELS}>
                        <Route index element={<List columns={hotelColumns} />} />
                        <Route path=":id" element={<Single />} />
                        <Route path="new" element={<NewHotel />} />
                    </Route>
                    <Route path={AdminRoutes.ROOMS}>
                        <Route index element={<List columns={roomColumns} />} />
                        <Route path=":id" element={<Single />} />
                        <Route path="new" element={<NewRoom />} />
                    </Route>

                </RoutesWithNotFound>
            </div>

        </div>
    )
}
export default BodySection