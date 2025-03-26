import { Plus } from 'lucide-react'
import React from 'react'

const ApproveButton = ({ title, icon, branch, bgColor }) => {
    console.log(bgColor);
    return (
        <div style={{backgroundColor:`${bgColor}`}} className='text-white p-3 sm:p-5 w-48  sm:w-60 h-36 rounded-xl'>
            <h1 className='sm:text-xl text-lg font-semibold'>{title}</h1>
            <hr className='h-0.5 my-3 border-none bg-white' />
            <div className='flex items-center justify-center gap-3'>
                {icon}
                <h1 className='text-lg sm:text-xl'>{branch}</h1>
                <h1 className='sm:text-lg w-8 h-8 flex items-center justify-center rounded-full bg-blue-500'><Plus size={30} /></h1>
            </div>
        </div>
    )
}

export default ApproveButton