import { PlusCircle, TrashIcon, X } from 'lucide-react'
import React from 'react'
import Input from '../../Input'

const AddComplaintModal = ({ onClose,complaint }) => {
    const listType = ['AIDS', 'BOILS'];
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                ><X size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Add a New Disease - { complaint}</h1>
                <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form className='sm:w-1/2 w-full space-y-5'>
                        <div className='flex flex-col gap-2'>
                            <h1>Add Disease Name</h1>
                            <Input icon={PlusCircle} type='text' required placeholder='Enter a disease name' />
                        </div>
                        <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                    </form>
                    <div className='sm:w-1/2 w-full'>
                    <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>

                    <div className='flex flex-col h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                        {listType.map((investigation, index) => (
                            <>
                                <div className='flex items-center justify-between px-10'>
                                    <h1 onClick={() => setpresentComplaintInput(investigation)} className='text-xl cursor-pointer p-1' key={index}>{investigation}</h1>
                                    <TrashIcon/>
                                </div>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>
                        ))}
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AddComplaintModal