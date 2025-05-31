import React, { useEffect, useState } from 'react';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Pen, Trash, Check, X } from 'lucide-react';
import MultiSelectInput from './MultiSelectInput';

const potencyArray = ['Q', '3X', '6X', '6', '30', '200', '1M', '10M', '0/1', '0/2', '0/3'];
const doseArray = ['Single Dose', '3 Dose Half-Hour Interval', '2 Dose Half-Hour Interval'];
const dateArray = ['Today', '2nd Day', '3rd Day', '4th Day', '5th Day', '6th Day', '7th Day', '10th Day', '15th Day', '20th Day', '25th Day', '30th Day', '45th Day', '60th Day', '75th Day', '3rd Month', '4th Month', '5th Month'];

const TodayPrescriptions = () => {
    const location = useParams();
    const { prescriptionSubmit, fetchPrescription, prescription, togglePrescriptionSubmit, getPresentComplaintData, PresentComplaintData } = docStore();
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [editNote, setEditNote] = useState(false);
    useEffect(() => {
        fetchPrescription(location.id);
        getPresentComplaintData(location.id);
    }, [prescriptionSubmit, deleteFlag, updateFlag, getPresentComplaintData]);
    const PresentComplaintDataArray = PresentComplaintData.map(complaint => complaint?.complaintName);
    console.log(prescription);
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
            togglePrescriptionSubmit();

        }
    };

    const handleUpdate = async (id) => {
        
            const response = await axios.patch(`${DOC_API_URL}/update-prescription/${id}`, {
                editedData
            });
            setUpdateFlag(prev => !prev);
            togglePrescriptionSubmit();
        }
    

    return (
        <div>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                TODAY'S PRESCRIPTION
            </h1>

            <div className="overflow-x-auto mt-3">
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
                            <tr key={value._id} className={`${value?.medicine_issued_flag ? 'bg-yellow-200' : 'bg-green-200'}  whitespace-nowrap`}>
                                {index === 0 ? (
                                    <td rowSpan={prescription.length} className="py-2 px-1 border">
                                        {value.prescription_date}
                                    </td>
                                ) : null}
                                <td className="py-2 w-1/8 border whitespace-normal">
                                    {editingRow === index ? (
                                        <MultiSelectInput Options={PresentComplaintDataArray} selectedOptions={editedData.diagnosis || []}
                                            setSelectedOptions={(newDiagnosis) =>
                                                setEditedData(prev => ({ ...prev, diagnosis: newDiagnosis }))
                                            } />
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
                                        <select name="potency" value={editedData.potency} className='w-14'
                                            onChange={(e) => handleChange(e, "potency")} id="">
                                            <option value="">Select Potency</option>
                                            {potencyArray.map((potency, index) => <option key={index} value={potency}>{potency}</option>)}
                                        </select>
                                    ) : (
                                        value.potency
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">{editingRow === index ? (
                                    <select value={editedData.start_date}
                                        onChange={(e) => handleChange(e, "start_date")} name="start_date" id="">
                                        {dateArray.map((date, index) => <option key={index} value={date}>{date}</option>)}
                                    </select>
                                ) : (
                                    value.start_date
                                )}</td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <select name="dose" value={editedData.dose} className='w-30'
                                            onChange={(e) => handleChange(e, "dose")} id="">
                                            {doseArray.map((dose, index) => <option key={index} value={dose}>{dose}</option>)}

                                        </select>
                                    ) : (
                                        value.dose
                                    )}
                                </td>
                                <td className="py-2 relative px-0.5 border whitespace-normal">
                                    {editingRow === index ? (
                                        <div className=''>
                                            <button onClick={() => setEditNote(true)} className='p-2 rounded-md text-white bg-blue-500 cursor-pointer'>Edit Note</button>
                                           {editNote && <div onClick={() => setEditNote(false)} className='absolute right-0 top-9'><X/></div>}
                                            {editNote && <div className='w-72 h-20 right-0  rounded-lg  bottom-10 bg-white '>
                                                <textarea 
                                                    type="text"
                                                    value={editedData.note}
                                                    onChange={(e) => handleChange(e, "note")}
                                                    className="border w-full bg-white" ></textarea>
                                            </div>}
                                        </div>
                                    ) : (
                                        value.note || "-"
                                    )}
                                </td>
                                <td className="py-4 px-2 border text-center">
                                    {editingRow === index ? (
                                        <select name="duration" value={editedData.duration}
                                            onChange={(e) => handleChange(e, "duration")} id="">
                                            <option value="7 Days">7 Days</option>
                                            <option value="15 Days">15 Days</option>
                                            <option value="21 Days">21 Days</option>
                                            <option value="30 Days">30 Days</option>
                                            <option value="45 Days">45 Days</option>
                                            <option value="60 Days">2 Months</option>
                                            <option value="90 Days">3 Months</option>
                                        </select>
                                    ) : (
                                        value.duration === '60 Days' ? '2 Months' : value.duration === '90 Days' ? '3 months' : value.duration
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
            <div className="flex mt-10 flex-col gap-5">
                    <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-green-200"></div><span>Medicine not issued yet</span></div>
                    <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-yellow-200"></div><span>Medicine Issued</span></div>
                </div>
        </div>
    );
};

export default TodayPrescriptions;
