import { Calendar, ClipboardPlus, Pen, X } from 'lucide-react';
import ReactDOM from "react-dom";
import Input from '../Input';
import { BiCalendar } from 'react-icons/bi';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DOC_API_URL } from '../../store/DocStore';

const DiagnosisModal = ({ onClose,setsubmit }) => {
    const [formValues, setFormValues] = useState({
        complaintName: "",
        duration:"",
        durationSuffix: "",
        remark:""
    })
    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${DOC_API_URL}/add-present-complaints-patient/${id}`, formValues);
            setsubmit(prev => !prev);
            setFormValues({
        complaintName: "",
        duration:"",
        durationSuffix: "",
        remark:""
    })
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
    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[50vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl  text-center font-semibold">Present Complaints</h1>
                <form className='mx-auto mt-5 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 w-full '>
                        <p>Complaint *</p>
                        <Input icon={ClipboardPlus}  onChange={handleInputChange} name="complaintName"  value={formValues.complaintName} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <p>Duration *</p>
                        <Input icon={Calendar}  onChange={handleInputChange} name="duration"  value={formValues.duration} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration Suffix* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BiCalendar className="size-4 text-blue-500" />
                            </div>
                            <select  onChange={handleInputChange} name="durationSuffix"  value={formValues.durationSuffix} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select Days / Weeks / Months / Years</option>
                                <option value="Days">Days</option>
                                <option value="Weeks">Weeks</option>
                                <option value="Months">Months</option>
                                <option value="Year">Year</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <p>Remark *</p>
                        <Input icon={Pen}  onChange={handleInputChange} name="remark"  value={formValues.remark} />
                    </div>
                    <button className='p-2 bg-blue-500 text-white rounded-lg mt-3'>Add</button>
                </form>
            </div>
        </div>
        ,
        document.getElementById("modal-root")
    );
}

export default DiagnosisModal