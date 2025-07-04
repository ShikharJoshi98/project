import { Calendar, Calendar1Icon, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { recStore } from '../../store/RecStore';
import { useAuthStore } from '../../store/authStore';
import Input from '../Input';
import { CiMedicalClipboard } from 'react-icons/ci';
import { generateFitnessCertificate, generateMedicalCertificate, generateTravellingCertificate, generateUnfitCertificate } from '../../store/generateCertificatePdf';
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';

const RegenerateCertificateModal = ({setSubmit, onClose, certificate }) => {

    const { user } = useAuthStore();
    const { patients, getPatientDetails } = recStore();
    const [certificateDetails, setCertificateDetails] = useState(null);
    
    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails]);
    const [formValues, setFormValues] = useState({
        diagnoseOne: '',
        diagnoseTwo: '',
        diagnoseThree: '',
        date: '',
        restFrom: '',
        restTill: '',
        resumeDate: '',
        duration: ''
    })
    
    const convertToInputDate = (ddmmyyyy) => {
    if (!ddmmyyyy) return '';
    const [day, month, year] = ddmmyyyy.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

useEffect(() => {
    setFormValues({
        diagnoseOne: certificate?.diagnoseOne || '',
        diagnoseTwo: certificate?.diagnoseTwo || '',
        diagnoseThree: certificate?.diagnoseThree || '',
        date: convertToInputDate(certificate?.date),
        restFrom: convertToInputDate(certificate?.restFrom),
        restTill: convertToInputDate(certificate?.restTill),
        resumeDate: convertToInputDate(certificate?.resumeDate),
        duration: certificate?.duration || ''
    });
}, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const patient = patients.filter((patient) => patient?._id === certificate?.patient?._id);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            let response = await axios.patch(`${DOC_API_URL}/updateCertificate/${certificate?._id}`, formValues);
            alert('Updated Details');
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[99vh] max-w-[99vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl  text-center font-semibold">
                    Regenerate Certificate
                </h1>
                <p className='text-red-500 mt-10 font-semibold '>Note: You can edit the Details before generating any Certificate</p>
                <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                    <button onClick={() => { generateMedicalCertificate(formValues, patient[0], user); } } className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>MEDICAL CERTIFICATE</button>
                    <button onClick={() => {  generateFitnessCertificate(formValues, patient[0], user); } } className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>FITNESS CERTIFICATE</button>
                    <button onClick={() => { generateUnfitCertificate(formValues, patient[0], user); } } className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>UNFIT CERTIFICATE</button>
                    <button onClick={() => {  generateTravellingCertificate(formValues, patient[0], user); } } className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>TRAVELLING CERTIFICATE</button>
                </div>
                <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8 rounded-xl text-zinc-800 text-sm flex flex-col gap-5' >
                    <div className='flex flex-col gap-2'>
                        <h1>Patient Case Paper Number : </h1>
                        <Input icon={User} onChange={handleInputChange} readOnly value={certificate?.patient?.casePaperNo} name="selectedPatien" type='text' placeholder='Diagnose' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Diagnose (1) : </h1>
                        <Input icon={CiMedicalClipboard} onChange={handleInputChange} value={formValues.diagnoseOne} name="diagnoseOne" type='text' placeholder='Diagnose' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Diagnose (2) : </h1>
                        <Input icon={CiMedicalClipboard} onChange={handleInputChange} value={formValues.diagnoseTwo} name="diagnoseTwo" type='text' placeholder='Diagnose' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Diagnose (3) : </h1>
                        <Input icon={CiMedicalClipboard} onChange={handleInputChange} value={formValues.diagnoseThree} name="diagnoseThree" type='text' placeholder='Diagnose' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Date</h1>
                        <Input icon={Calendar} onChange={handleInputChange} value={formValues.date} name="date" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Rest From</h1>
                        <Input icon={Calendar} onChange={handleInputChange} value={formValues.restFrom} name="restFrom" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Rest Till</h1>
                        <Input icon={Calendar} onChange={handleInputChange} value={formValues.restTill} name="restTill" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Resume Date</h1>
                        <Input icon={Calendar} onChange={handleInputChange} value={formValues.resumeDate} name="resumeDate" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration : </h1>
                        <Input icon={Calendar1Icon} onChange={handleInputChange} value={formValues.duration} name="duration" type='text' placeholder='Number of Months' />
                    </div>
                    <button className='py-2 px-6 mt-5 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto cursor-pointer'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegenerateCertificateModal