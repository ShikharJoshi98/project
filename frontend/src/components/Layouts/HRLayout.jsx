import { Outlet } from 'react-router-dom'
import HRnavbar from '../HR/HRnavbar'
import HRSidebar from '../HR/HRSidebar'

const HRLayout = () => {
    return (
        <div>
            <HRnavbar />
            <div className='flex '>
                <HRSidebar />
                <Outlet/>
            </div>
        </div>
    )
}

export default HRLayout