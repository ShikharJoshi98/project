import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { Calendar } from 'lucide-react'
import { CiMoneyBill } from 'react-icons/ci'
import Input from '../../components/Input'

const BillInfo = () => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Add Bill Information</h1>
                        <form onSubmit={handleSubmit} className='relative mt-4 mx-auto w-full md:w-[60vw] h-auto p-8  rounded-xl text-zinc-600  text-sm flex flex-col gap-5' >
                            <div className='flex flex-col gap-2'>
                                <h1>From (Medicine Start Date)</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>To (Medicine End Date)</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Consulting Fees : </h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Medicine Fees : </h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <button className='py-2 px-4 mt-5 rounded-lg text-lg bg-blue-500 text-white font-semibold block mx-auto cursor-pointer'>Submit</button>
                        </form>
                        <p className='text-green-500 font-semibold '>Click on Generate Bill, after Completing the Submission of above details</p>
                        <button className='py-2 px-6 mt-10 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto cursor-pointer'>Generate Bill</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BillInfo