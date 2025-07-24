import { Outlet } from "react-router-dom"
import Docnavbar from "../Doctor/DocNavbar"
import DocSidebar from "../Doctor/DocSidebar"

const DoctorLayout = () => {
  return (
      <div>
          <Docnavbar />
          <div className='flex'>
              <DocSidebar />
              <Outlet/>
          </div>
    </div>
  )
}

export default DoctorLayout