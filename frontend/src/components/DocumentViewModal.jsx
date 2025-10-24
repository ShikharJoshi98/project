import React, { useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useStore } from '../store/UpdateStore'
import { useState } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

const DocumentViewModal = ({ onClose, emp }) => {
    const { getDocuments, panCard, aadharCard } = useStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                setLoading(true);
                await getDocuments(emp);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocs();
    }, [emp, getDocuments]);

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className='text-3xl text-blue-400 font-semibold mb-5 text-center'>Employee Documents</h1>
                <h1 className='text-xl font-semibold my-4'>Pan Card</h1>
                {loading ? <LuLoaderCircle className='mt-10 animate-spin mx-auto' size={24} /> : (panCard ? <img src={panCard} className='object-contain w-[90%]' /> : 'No Record found')}
                <h1 className='font-semibold my-4 text-xl'>Aadhar Card</h1>
                {loading ? <LuLoaderCircle className='mt-10 animate-spin mx-auto' size={24} /> : (aadharCard ? <img src={aadharCard} className='object-contain w-[90%]' /> : 'No Record found')}
            </div>
        </div>
    )
}

export default DocumentViewModal