import { Outlet } from "react-router-dom"
import Footer from "../Footer"
import Navbar from "../Navbar"
import UpperNavbar from "../UpperNavbar"
import LowerNavbar from "../LowerNavbar"

const HomeLayout = () => {
    return (
        <div>
            <UpperNavbar />
            <Navbar />
            <LowerNavbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout