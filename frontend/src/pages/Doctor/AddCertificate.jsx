import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { Calendar, Calendar1Icon, RefreshCcw, User } from 'lucide-react'
import { CiMedicalClipboard } from 'react-icons/ci'
import Select from "react-select";
import Input from '../../components/Input'
import { recStore } from '../../store/RecStore'
import { DOC_API_URL } from '../../store/DocStore'
import axios from 'axios'
import { generateFitnessCertificate, generateMedicalCertificate, generateTravellingCertificate, generateUnfitCertificate } from '../../store/generateCertificatePdf'
import { useAuthStore } from '../../store/authStore'
import DetailsAddedModal from '../../components/Doctor/DetailsAddedModal'
import SearchSelect from '../../components/SearchSelect'

const AddCertificate = () => {
    const { user } = useAuthStore();
    const { patients, getPatientDetails } = recStore();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [detailsAddedModal, setDetailsAddedModal] = useState(false);
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails]);
    const [formValues, setFormValues] = useState({
        selectedPatient: '',
        diagnoseOne: '',
        diagnoseTwo: '',
        diagnoseThree: '',
        date: '',
        restFrom: '',
        restTill: '',
        resumeDate: '',
        duration: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const patientArray = patients.map((patient) => ({
        value: patient?._id,
        label: `${patient?.fullname} / ${patient?.casePaperNo ? patient?.casePaperNo : '-'} / ${patient?.phone} (M)`,
    }));
    const patient = patients.filter((patient) => patient?._id === certificateDetails?.selectedPatient);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            formValues.selectedPatient = selectedPatient;
            let response = await axios.post(`${DOC_API_URL}/postCertificate`, formValues);
            
            if (response.data.message === 'certificate added') {
                setDetailsAddedModal(true);
                setFormSubmitted(true);
            }
            else {
                alert("Details not added");
            }
            setCertificateDetails(formValues);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Docnavbar />
            <div className='flex '>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Certificates</h1>
                        <div className='flex items-center justify-between mt-10'>
                            <p className='text-red-500  font-semibold '>Note: Fill the Details before generating any Certificate</p>
                            <button onClick={() => {setFormValues({selectedPatient: '',diagnoseOne: '',diagnoseTwo: '',diagnoseThree: '',date: '',restFrom: '',restTill: '',resumeDate: '',duration: ''}); setCertificateDetails(null);setFormSubmitted(false);}} className='p-2 text-lg cursor-pointer bg-green-500 flex items-center gap-2 text-white rounded-md'>New certificate <RefreshCcw /></button>
                        </div>
                        <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                            <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateMedicalCertificate(certificateDetails, patient[0], user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>MEDICAL CERTIFICATE</button>
                            <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateFitnessCertificate(certificateDetails, patient[0], user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>FITNESS CERTIFICATE</button>
                            <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateUnfitCertificate(certificateDetails, patient[0], user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>UNFIT CERTIFICATE</button>
                            <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateTravellingCertificate(certificateDetails, patient[0], user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>TRAVELLING CERTIFICATE</button>
                        </div>
                        <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8 rounded-xl text-zinc-800 text-sm flex flex-col gap-5' >
                            <div className='flex flex-col gap-2'>
                                <h1>Patient Case Paper Number : </h1>
                                <SearchSelect options={patientArray} setSelectedPatient={setSelectedPatient} />
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
            </div>
            {detailsAddedModal && <DetailsAddedModal onClose={() => setDetailsAddedModal(false)} />}
        </div>
    )
}

export default AddCertificate