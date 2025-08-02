import { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useParams } from 'react-router-dom';
import SearchMedicine from './SearchMedicine';
import { recStore } from '../../store/RecStore';
import DiagnosisModal from './DiagnosisModal';
import OtherPrescriptionModal from './OtherPrescriptionModal';
import MultiSelectInput from './MultiSelectInput';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { CiClock1, CiPill, CiPillsBottle1 } from 'react-icons/ci';
import { LuTestTube } from 'react-icons/lu';
import { updateDate } from '../../store/todayDate';

const potencyArray = ['Q', '3X', '6X', '6', '30', '200', '1M', '10M', '0/1', '0/2', '0/3'];
const dateArray = ['Today', '2nd Day', '3rd Day', '4th Day', '5th Day', '6th Day', '7th Day', '10th Day', '15th Day', '20th Day', '25th Day', '30th Day', '45th Day', '60th Day', '75th Day', '3rd Month', '4th Month', '5th Month'];
const doseArray = ['Single Dose', '3 Dose Half-Hour Interval', '2 Dose Half-Hour Interval', '3 Dose 1 Hour Interval', '2 Dose 1 Hour Interval', 'Morning-Afternoon-Evening -- Per 1 Dose', 'Morning-Afternoon-Evening -- Per 2 Dose', 'Morning-Afternoon-Evening -- Per 3 Dose'];

const PrescribeMedicine = () => {
    const [isDiagnosisOpen, setDiagnosisOpen] = useState(false);
    const [selectedDiagnosisOptions, setSelectedDiagnosisOptions] = useState([]);
    const location = useParams();
    const [submit, setsubmit] = useState(false);
    const [searchMedicine, setSearchMedicine] = useState("");
    const { getCaseData, list, getPastPrescription, allPrescriptions, getPresentComplaintData, togglePrescriptionSubmit, PresentComplaintData } = docStore();
    const { patients } = recStore();
    const patient = patients.filter((cand => (cand._id) === location.id));
    const searchMedicineRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOtherPrescriptionModal, setOtherPrescriptionModal] = useState(false);
    const currentDate = updateDate();

    useEffect(() => {
        getPastPrescription(location.id);
        getPresentComplaintData(location.id);
        getCaseData('Present Complaints');
    }, [getPresentComplaintData, getPastPrescription, getCaseData, submit]);

    const PresentComplaintDataArray = list.map(item => item?.name);
    const [formData, setFormData] = useState({
        medicine: '',
        potency: '',
        startDate: 'Today',
        dose: '',
        duration: '',
        note: ''
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchMedicineRef.current && !searchMedicineRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${DOC_API_URL}/add-new-prescription/${location.id}`,
                {
                    formData,
                    currentDate
                }
            );
            togglePrescriptionSubmit();
            setFormData({
                medicine: '',
                potency: '',
                startDate: 'Today',
                dose: '',
                duration: '',
                note: ''
            });

            setSelectedDiagnosisOptions([]);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredPrescription = allPrescriptions.filter((pres) => pres.medicine.toLowerCase().includes(searchMedicine.toLowerCase()));
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value, selectedDiagnosisOptions }));
    }

    return (
        <div className='relative'>
            <h1 className='text-xl sm:text-4xl text-center font-semibold my-10 text-[#337ab7]'>PRESCRIBE MEDICINE</h1>
            <button onClick={() => setOtherPrescriptionModal(true)} className='bg-blue-500 p-1 cursor-pointer h-10 w-10 text-white rounded-md text-2xl right-5 top-2 absolute'>+</button>
            <form onSubmit={handleSubmit}>
                <div className='sm:grid flex flex-col pl-10 gap-y-5 gap-x-2 grid-cols-2'>
                    <div>
                        <div className='flex sm:flex-row flex-col  items-center justify-between mb-2 pr-5'>
                            <h1 className='text-black font-semibold '>Diagnosis:</h1>
                            <div className='relative'>
                                <button onClick={() => setDiagnosisOpen(true)} type='button' className='bg-blue-500 flex items-center gap-2 cursor-pointer  hover:bg-blue-600 rounded-md text-white p-1 '>Diagnosis <FaPlus /></button>
                            </div>
                        </div>
                        <MultiSelectInput Options={PresentComplaintDataArray} setSelectedOptions={setSelectedDiagnosisOptions} selectedOptions={selectedDiagnosisOptions} />
                    </div>
                    <div ref={searchMedicineRef} className='relative'>
                        <h1 className='text-black font-semibold mb-4'>Medicine:</h1>
                        <Input icon={CiPill} placeholder='Enter Medicine Name' name='medicine' value={formData.medicine} onChange={(e) => { setSearchMedicine(e.target.value); handleChange(e); setIsOpen(true); }} />
                        {searchMedicine && isOpen && <div className='bg-gray-300 shadow-2xl p-2 flex flex-col gap-2 w-full absolute top-20.5 z-10 border-l border-b border-r border-blue-400 rounded-md'>
                            {
                                filteredPrescription.map((pres, index) => (
                                    <SearchMedicine pres={pres} index={index} patientName={patient[0].fullname} />
                                ))
                            }
                        </div>}
                    </div>
                    <div>
                        <h1 className='text-black font-semibold mb-2'>Potency:</h1>
                        <div className='relative mt-2   w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <LuTestTube className="size-4 text-blue-500" />
                            </div>
                            <select name="potency" required className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full' value={formData.potency} onChange={handleChange}>
                                <option value="">Select Potency</option>
                                {potencyArray.map((potency, index) => <option key={index} value={potency}>{potency}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-black font-semibold mb-2'>Start Date:</h1>
                        <div className='relative mt-2 w-full'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <FaCalendarAlt className="size-4 text-blue-500" />
                            </div>
                            <select name="startDate" required className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full' value={formData.startDate} onChange={handleChange}>
                                {dateArray.map((date, index) => <option key={index} value={date}>{date}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-black font-semibold mb-2'>Dose:</h1>
                        <div className='relative mt-2 w-full'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <CiPillsBottle1 className="size-4 text-blue-500" />
                            </div>
                            <select name="dose" required className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full' value={formData.dose} onChange={handleChange}>
                                <option value="">Select Dose</option>
                                {doseArray.map((dose, index) => <option key={index} value={dose}>{dose}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-black font-semibold mb-2'>Duration:</h1>
                        <div className='relative mt-2 w-full'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <CiClock1 className="size-4 text-blue-500" />
                            </div>
                            <select name="duration" required className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full' value={formData.duration} onChange={handleChange}>
                                <option value="">Select Duration</option>
                                <option value="7 Days">7 Days</option>
                                <option value="15 Days">15 Days</option>
                                <option value="21 Days">21 Days</option>
                                <option value="30 Days">30 Days</option>
                                <option value="45 Days">45 Days</option>
                                <option value="60 Days">2 Months</option>
                                <option value="90 Days">3 Months</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <h1 className='text-black font-semibold mb-2'>Note:</h1>
                        <textarea name="note" placeholder='Mention if any' className='py-2 pl-3 min-h-20 bg-white rounded-lg border border-gray-400 w-full' value={formData.note} onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className='flex justify-center mt-5'>
                    <button className='bg-blue-500 text-lg hover:bg-blue-600 rounded-md text-white p-2'>Submit</button>
                </div>
            </form>
            {isDiagnosisOpen && <DiagnosisModal setsubmit={setsubmit} onClose={() => setDiagnosisOpen(false)} />}
            {isOtherPrescriptionModal && <OtherPrescriptionModal onClose={() => setOtherPrescriptionModal(false)} />}
        </div>
    );
};

export default PrescribeMedicine;
