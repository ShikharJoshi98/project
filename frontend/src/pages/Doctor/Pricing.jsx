import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { CiMoneyBill } from 'react-icons/ci'
import Input from '../../components/Input'
import { Box } from 'lucide-react'

const Pricing = () => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Doctor's Fees</h1>
                        <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8  rounded-xl text-zinc-800   text-sm flex flex-col gap-5' >
                            <div className='flex flex-col gap-2'>
                                <h1>New Case* : </h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Seven Days* : </h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Fifteen Days* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>TwentyOne Days* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Thirty Days* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Fortyfive Days* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Two Months* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Three Months* :</h1>
                                <Input icon={CiMoneyBill} type='text' required placeholder='Rs' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Courier :</h1>
                                <Input icon={Box} type='text' required placeholder='Rs' />
                            </div>
                            <button className='py-2 px-4 mt-5 rounded-lg text-lg bg-blue-500 text-white font-semibold block mx-auto cursor-pointer'>Update Prices</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing