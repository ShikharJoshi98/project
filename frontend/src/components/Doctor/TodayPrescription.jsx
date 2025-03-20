import React, { useEffect, useState } from 'react';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pen, Trash, Check, X } from 'lucide-react';

const TodayPrescriptions = () => {
    const location = useParams();
    const { prescriptionSubmit, fetchPrescription, prescription } = docStore();
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        fetchPrescription(location.id);
    }, [prescriptionSubmit, deleteFlag,updateFlag]);

    const addDays = (dateStr, days) => {
        days = parseInt(days, 10);
        let [day, month, year] = dateStr.split("/").map(Number);
        let date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + days);
        let newDay = String(date.getDate()).padStart(2, '0');
        let newMonth = String(date.getMonth() + 1).padStart(2, '0'); 
        let newYear = date.getFullYear();
        return `${newDay}/${newMonth}/${newYear}`;
    };

    const handleEdit = (index, value) => {
        setEditingRow(index);
        setEditedData(value); 
    };

    const handleChange = (e, field) => {
        setEditedData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleDelete = async (id) => {
        const submitDelete = confirm("Are you sure you want to delete prescription?");
        if (submitDelete) {
            await axios.delete(`${DOC_API_URL}/delete-today-prescription/${id}`);
            setDeleteFlag(prev => !prev);
        }
    };

    const handleUpdate = async (id) => {
        const submitUpdate = confirm("Are you sure you want to update prescription?");
        if (submitUpdate) {
            const response = await axios.patch(`${DOC_API_URL}/update-prescription/${id}`,{
                editedData
            });
            setUpdateFlag(prev => !prev);            
        }
    }

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
                            <tr key={value._id} className='bg-gray-200 whitespace-nowrap'>
                                {index === 0 ? (
                                    <td rowSpan={prescription.length} className="py-2 px-1 border">
                                        {value.prescription_date}
                                    </td>
                                ) : null}
                                <td className="py-2 px-2 border whitespace-normal">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.diagnosis}
                                            onChange={(e) => handleChange(e, "diagnosis")}
                                            className="border p-1 w-full bg-white" />
                                    ) : (
                                        value.diagnosis.join(", ")
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.medicine}
                                            onChange={(e) => handleChange(e, "medicine")}
                                            className="border p-1 w-full bg-white" />
                                    ) : (
                                        value.medicine
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.potency}
                                            onChange={(e) => handleChange(e, "potency")}
                                            className="border p-1 w-full bg-white" />
                                    ) : (
                                        value.potency
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">{editingRow === index ? (
                                    <input
                                        type="text"
                                        value={editedData.start_date}
                                        onChange={(e) => handleChange(e, "dose")}
                                        className="border p-1 w-full bg-white" />
                                ) : (
                                    value.start_date
                                )}</td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.dose}
                                            onChange={(e) => handleChange(e, "dose")}
                                            className="border p-1 w-full bg-white" />
                                    ) : (
                                        value.dose
                                    )}
                                </td>
                                <td className="py-2 px-2 border whitespace-normal">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.note}
                                            onChange={(e) => handleChange(e, "note")}
                                            className="border p-1 w-full bg-white" />
                                    ) : (
                                        value.note || "-"
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <input
                                            type="text"
                                            value={editedData.duration}
                                            onChange={(e) => handleChange(e, "duration")}
                                            className="border p-1 w-full bg-white"
                                        />
                                    ) : (
                                        value.duration
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {addDays(value.prescription_date, value.duration)}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <div className="flex justify-center gap-2">
                                            <Check
                                                onClick={() => {
                                                    handleUpdate(value._id)
                                                    setEditingRow(false)
                                                }}
                                                className="border p-1 size-7 text-green-500 rounded-md cursor-pointer"
                                            />
                                            <X
                                                onClick={() => setEditingRow(null)}
                                                className="border p-1 size-7 text-red-500 rounded-md cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        <Pen
                                            onClick={() => handleEdit(index, value)}
                                            className="border p-1 size-7 rounded-md cursor-pointer"
                                        />
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    <Trash
                                        onClick={() => handleDelete(value._id)}
                                        className="border p-1 size-7 text-red-500 rounded-md cursor-pointer"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodayPrescriptions;
