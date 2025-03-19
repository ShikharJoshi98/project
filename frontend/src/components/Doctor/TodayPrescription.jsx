import React, { useEffect, useState } from 'react'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pen, Trash } from 'lucide-react';

const TodayPrescriptions = () => {
    const location = useParams();
    const { prescriptionSubmit, fetchPrescription, prescription } = docStore();
    const [deleteFlag, setDeleteFlag] = useState(false);

    useEffect(() => {
        fetchPrescription(location.id);
    }, [prescriptionSubmit,deleteFlag]);

    const addDays = (dateStr, days)=>{
        days = parseInt(days, 10);
        let [day, month, year] = dateStr.split("/").map(Number);
        
        let date = new Date(year, month - 1, day);
        
        date.setDate(date.getDate() + days);
        
        let newDay = String(date.getDate()).padStart(2, '0');
        let newMonth = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let newYear = date.getFullYear();
    
        return `${newDay}/${newMonth}/${newYear}`;
    }

    const handleDelete = async (id) => {
        
        const submitDelete = confirm("Are you sure you want to delete prescription ? ");

        if(submitDelete){
            const response = await axios.delete(`${DOC_API_URL}/delete-today-prescription/${id}`)
            setDeleteFlag(prev => !prev);            
        }
    };
    
    return (
        <div>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                TODAY'S PRESCRIPTION
            </h1>
            <div className="overflow-x-auto p-4 mt-3">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className=" bg-blue-500 text-white whitespace-nowrap">
                            <th className="py-2 px-1 border">Today's Date</th>
                            <th className="py-2 px-1 border">Diagnosis</th>
                            <th className="py-2 px-1 border">Medicine</th>
                            <th className="py-2 px-1 border">Potency</th>
                            <th className="py-2 px-1 border">Start Date</th>
                            <th className="py-2 px-1 border">Dose</th>
                            <th className="py-2 px-1 border">Note</th>
                            <th className="py-2 px-1 border">Duration</th>
                            <th className="py-2 px-1 border">Next Visit</th>
                            <th className="py-2 px-1 border">Update</th>
                            <th className="py-2 px-1 border">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescription?.map((value, index) => (
                            <tr className='bg-gray-200 whitespace-nowrap'>
                                {index === 0 ? (
                                    <td rowSpan={prescription.length} className="py-2 px-1 border">
                                        {value.prescription_date}
                                    </td>
                                ) : null}
                                <td className="py-2 px-2 border whitespace-normal">{value.diagnosis.join(", ")}</td>
                                <td className="py-4 px-2 border text-center">{value.medicine}</td>
                                <td className="py-4 px-2 border text-center">{value.potency}</td>
                                <td className="py-4 px-2 border text-center">{value.start_date}</td>
                                <td className="py-4 px-2 border text-center">{value.dose}</td>
                                <td className="py-2 px-2 border  whitespace-normal">{value.note||'No Note'}</td>
                                <td className="py-4 px-2 border text-center">{value.duration}</td>
                                <td className="py-4 px-2 border text-center">{addDays(value.prescription_date, value.duration)}</td>
                                <td className="py-4 px-2 border text-center ">{<Pen className='border p-1 size-7 rounded-md cursor-pointer'/>}</td>
                                <td className="py-4 px-2 border text-center " onClick={() => handleDelete(value._id)}>{<Trash className='border p-1 size-7 text-red-500 rounded-md cursor-pointer'/>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodayPrescriptions