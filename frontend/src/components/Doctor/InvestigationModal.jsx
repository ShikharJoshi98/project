import { Plus, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Input from '../Input'
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../store/DocStore';

const InvestigationModal = ({type,submit ,setSubmit, onClose }) => {

    const [inputData, setInputData] = useState("");
    const { getInvestigationAdvised, investigationAdvised } = docStore();
    useEffect(() => {
        getInvestigationAdvised(type);
    }, [getInvestigationAdvised,submit]);    
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post(`${DOC_API_URL}/addInvestigationAdvised`,{
            inputData,
            type
        });
        setSubmit(prev => !prev);
        setInputData("");
    }
    const deleteInvestigation = async (id) =>{
        await axios.delete(`${DOC_API_URL}/deleteInvestigationAdvised/${id}/${type}`);
        setSubmit(prev => !prev);
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1">
                    <X size={24}/>
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Add {type}</h1>
                <div className='flex  w-full gap-10 mt-10 mb-2 pr-5'>
                    <form onSubmit={handleSubmit} className='w-1/2 ' >
                        <h1 className="text-black mb-2 text-lg font-semibold">Mention Here :</h1>
                        <div className='flex flex-col items-center'>
                            <Input onChange={(e) => setInputData(e.target.value)} value={inputData} icon={Plus} placeholder={`Add ${type}`} />
                            <button className="bg-blue-500 transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                        </div>
                    </form>
                    <div className='flex flex-col w-1/2 h-[300px] overflow-y-auto gap-1 bg-gray-100 rounded-2xl pt-3 '>
                        {investigationAdvised.map((investigation, index) => (
                            <>
                                <div className='flex items-center justify-between px-10'>
                                    <h1 className='text-xl p-1' key={index}>{investigation?.inputData}</h1>
                                    <Trash onClick={()=>deleteInvestigation(investigation?._id)} className='text-red-500 cursor-pointer'/>
                                </div>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvestigationModal