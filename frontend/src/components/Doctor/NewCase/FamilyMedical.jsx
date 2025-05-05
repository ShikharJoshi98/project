import { PlusCircle, Trash, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import MultiSelectDropdown from '../MultiSelectInput';
import Input from '../../Input';
import { MdAssignmentAdd } from 'react-icons/md';
import AddComplaintModal from './AddComplaintModal';
import { DOC_API_URL, docStore } from '../../../store/DocStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FamilyMedical = ({ complaint }) => {
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);
    const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);
    const { getCaseData, list, getFamilyMedicalData, FamilyMedicalData } = docStore();
    const listArray = list.map((data) => data?.name);
    const { id } = useParams();
    const [submit, setSubmit] = useState(false);
    const [formValues, setFormValues] = useState({
        patient: id,
        relation: "",
        anyOther: "",
        lifeStatus: "",
        age: "",
    })

    useEffect(() => { getCaseData(complaint); getFamilyMedicalData(id) },
        [getCaseData, getFamilyMedicalData,submit]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${DOC_API_URL}/add-family-history-patient/${id}`, { ...formValues, diseases: selectedInvestigationOptions });
            setFormValues({
                patient: "",
                relation: "",
                anyOther: "",
                lifeStatus: "",
                age: ""
            });
            setSelectedInvestigationOptions([]);
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const deleteFamilyMedical = async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/deleteFamilyMedical/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold'>Add {complaint}</h1>
                    <button type='button' onClick={()=>{setFormValues({patient: "",relation: "",anyOther: "",lifeStatus: "",age: ""}); setSelectedInvestigationOptions([]);}} className="bg-gray-700 block place-self-end transition-all duration-300 cursor-pointer hover:bg-black px-5 py-2 rounded-lg text-white">Clear Form</button>
                    <div className='flex flex-col gap-2'>
                        <h1>Relation*</h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <Users className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="relation" value={formValues.relation} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select the Relation</option>
                                <option value="Paternal Grand Father">Paternal Grand Father</option>
                                <option value="Paternal Grand Mother">Paternal Grand Mother</option>
                                <option value="Maternal Grand Father">Maternal Grand Father</option>
                                <option value="Maternal Grand Mother">Maternal Grand Mother</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Sister">Sister</option>
                                <option value="Brother">Brother</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1 >List of disease*</h1>
                        <MultiSelectDropdown Options={listArray} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Any Other</h1>
                        <Input icon={PlusCircle} onChange={handleInputChange} name="anyOther" value={formValues.anyOther} type="text" placeholder="Enter if any other" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Dead alive* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <User className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="lifeStatus" value={formValues.lifeStatus} anyOther className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select</option>
                                <option value="Alive">Alive</option>
                                <option value="Dead">Dead</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Age*</h1>
                        <Input icon={User} onChange={handleInputChange} name="age" value={formValues.age} type="text" placeholder="Enter Age" required />
                    </div>
                    <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </form>
                <div className='sm:w-1/2 w-full'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                        <MdAssignmentAdd onClick={() => setComplaintModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                    </div>
                    <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                        {list.map((investigation, index) => (
                            <>
                                <h1 className='text-xl p-1' key={index}>{investigation?.name}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto mt-10 rounded-lg">
                <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                    <thead className="bg-[#337ab7]  text-white">
                        <tr >
                            <th className="px-1 py-4 ">Relation</th>
                            <th className="px-2 py-4 ">Age</th>
                            <th className="px-2 py-4 ">Diseases</th>
                            <th className="px-4 py-4 ">Any Other</th>
                            <th className="px-2 py-4 ">Dead/Alive</th>
                            <th className="py-4 ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            FamilyMedicalData.map((data, index) => (
                                <tr key={index} className="bg-blue-200 text-lg">
                                    <td className='py-2 px-1 text-center'>{data?.relation}</td>
                                    <td className='py-2 px-2 text-center'>{data?.age}</td>
                                    <td className='py-2 px-2 text-center'>{data?.diseases.join(',')}</td>
                                    <td className='py-2 px-2 text-center'>{data?.anyOther}</td>
                                    <td className='py-2 px-2 text-center'>{data?.lifeStatus}</td>
                                    <td onClick={() => deleteFamilyMedical(data?._id)} className='py-2 px-1 place-items-center'><Trash /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}
        </div>
    )
}

export default FamilyMedical