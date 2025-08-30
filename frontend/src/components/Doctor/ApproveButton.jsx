import { FaPlus } from "react-icons/fa"

const ApproveButton = ({ onClick, title, icon, branch, bgColor }) => {

    return (
        <div style={{ backgroundColor: `${bgColor}` }} className='text-white p-3 sm:p-5 w-48  sm:w-60 h-36 rounded-xl'>
            <h1 className='text-lg font-semibold'>{title}</h1>
            <hr className='h-0.5 my-3 border-none bg-white' />
            <div className='flex items-center justify-between gap-2'>
                <div className="flex items-center gap-2">
                    {icon}
                    <h1 className='text-lg'>{branch}</h1>
                </div>
                <h1 onClick={onClick} className='sm:text-lg w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-blue-500'><FaPlus /></h1>
            </div>
        </div>
    )
}

export default ApproveButton