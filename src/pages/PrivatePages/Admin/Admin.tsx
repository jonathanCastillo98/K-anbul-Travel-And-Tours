import '../../../../styles/css/admin.css'
import BodySection from './pages/bodySection/BodySection'
import Sidebar from "./pages/sidebar/Sidebar"

const Admin = () => {
    return (
        <div className="adminContainer">
            <Sidebar />
            <BodySection />
        </div>
    )
}
export default Admin