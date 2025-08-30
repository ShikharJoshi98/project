import { Outlet } from "react-router-dom"
import AppointmentSidebar from "../Doctor/AppointmentSidebar"
import Docnavbar from "../Doctor/DocNavbar"

const AppointmentLayout = () => {
    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <Outlet/>
            </div>
        </div>
    )
}

export default AppointmentLayout