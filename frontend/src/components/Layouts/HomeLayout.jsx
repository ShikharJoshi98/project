import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Navbar from "../Navbar"

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout