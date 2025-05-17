import { Lock, User, X } from 'lucide-react'
import React, { useState } from 'react'
import Input from '../Input';
import { FaCopy } from 'react-icons/fa6';

const PatientDetailModal = ({ username, password, onClose }) => {
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[50vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Patient Details</h1>
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-5 items-center'>
                        <p>Username</p>
                        <Input icon={User}  defaultValue={username} disabled />
                        <div title='Copy' onClick={()=>copyToClipboard(username)} className='bg-blue-500 p-2 rounded-md text-white cursor-pointer'><FaCopy /></div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <p>Password</p>
                        <Input icon={Lock} defaultValue={password} disabled />
                        <div title='Copy' onClick={()=>copyToClipboard(password)} className='bg-blue-500 p-2 rounded-md text-white cursor-pointer'><FaCopy /></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PatientDetailModal