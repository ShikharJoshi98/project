import { Outlet } from "react-router-dom"
import RecNavbar from "../Receptionist/RecNavbar"
import RecSidebar from "../Receptionist/RecSidebar"

const ReceptionistLayout = () => {
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <Outlet/>
            </div>
        </div>
    )
}

export default ReceptionistLayout