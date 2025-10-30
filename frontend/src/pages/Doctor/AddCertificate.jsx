import { useEffect, useState } from 'react'
import { CiMedicalClipboard } from 'react-icons/ci'
import Input from '../../components/Input'
import { recStore } from '../../store/RecStore'
import { DOC_API_URL, docStore } from '../../store/DocStore'
import axios from 'axios'
import { generateFitnessCertificate, generateMedicalCertificate, generateTravellingCertificate, generateUnfitCertificate } from '../../store/generateCertificatePdf'
import { useAuthStore } from '../../store/authStore'
import DetailsAddedModal from '../../components/Doctor/DetailsAddedModal'
import SearchSelect from '../../components/SearchSelect'
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa'
import { IoIosRefresh } from 'react-icons/io'
import { useStore } from '../../store/UpdateStore'

const AddCertificate = () => {
    const { user } = useAuthStore();
    const { getAllPatients, allPatients, allBranchPatients, getDoctor, doctor } = recStore();
    const { getDetails, employees } = useStore();
    const { getLetterHead, letterHead } = docStore();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [detailsAddedModal, setDetailsAddedModal] = useState(false);
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [durationUnit, setDurationUnit] = useState('Days');
    const [loading, setLoading] = useState(false);
    const [isDoctor, setDoctor] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                if (user?.role === 'doctor') {
                    await getAllPatients();
                } else {
                    await getAllPatients(user?.branch);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [user?.role, user?.branch]);

    useEffect(() => {
        getLetterHead(user?._id)
    }, []);

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        if (user?.role === 'doctor') {
            setDoctor(user)
        }
    }, [user]);

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
    let patient;
    if (user?.role === 'doctor') {
        patient = allPatients.filter((patient) => patient?._id === certificateDetails?.selectedPatient);

    }
    else {
        patient = allBranchPatients.filter((patient) => patient?._id === certificateDetails?.selectedPatient);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalDuration = `${formValues.duration} ${durationUnit}`.trim();
            const payload = {
                ...formValues,
                doctor: isDoctor,
                selectedPatient,
                duration: finalDuration,
            };
            let response = await axios.post(`${DOC_API_URL}/postCertificate`, payload);
            await getDoctor(isDoctor);
            if (response.data.message === 'certificate added') {
                setDetailsAddedModal(true);
                setFormSubmitted(true);
            }
            else {
                alert("Details not added");
            }
            setCertificateDetails(payload);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen  w-full p-8'>
            <div className='bg-[#e9ecef] w-auto p-5 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Certificates</h1>
                <div className='flex items-center justify-between mt-10'>
                    <p className='text-red-500 font-semibold '>Note: Fill the Details before generating any Certificate</p>
                    <button onClick={() => { setFormValues({ selectedPatient: '', diagnoseOne: '', diagnoseTwo: '', diagnoseThree: '', date: '', restFrom: '', restTill: '', resumeDate: '', duration: '' }); setCertificateDetails(null); setFormSubmitted(false); }} className='p-2 cursor-pointer bg-green-500 flex items-center gap-2 text-white rounded-md'>New certificate <IoIosRefresh /></button>
                </div>
                <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                    <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateMedicalCertificate(letterHead?.letterHeadImage, certificateDetails, patient[0], doctor ?? user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>MEDICAL CERTIFICATE</button>
                    <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateFitnessCertificate(letterHead?.letterHeadImage, certificateDetails, patient[0], doctor ?? user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>FITNESS CERTIFICATE</button>
                    <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateUnfitCertificate(letterHead?.letterHeadImage, certificateDetails, patient[0], doctor ?? user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>UNFIT CERTIFICATE</button>
                    <button onClick={() => { if (isFormSubmitted === false) { alert('Fill in the details to generate any certificate.') } else { generateTravellingCertificate(letterHead?.letterHeadImage, certificateDetails, patient[0], doctor ?? user); } }} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>TRAVELLING CERTIFICATE</button>
                </div>
                <form onSubmit={handleSubmit} className='relative my-4 mx-auto text-sm w-full md:w-[60vw] h-auto p-8 rounded-xl text-zinc-800 flex flex-col gap-5' >
                    <div className='flex flex-col gap-2'>
                        <h1>Patient Case Paper Number : </h1>
                        {
                            user?.role === 'doctor' ?
                                <SearchSelect options={allPatients} loading={loading} setSelectedPatient={setSelectedPatient} /> :
                                <SearchSelect options={allBranchPatients} loading={loading} setSelectedPatient={setSelectedPatient} />
                        }
                    </div>
                    {user?.role !== 'doctor' &&
                        <div className='flex flex-col gap-2'>
                            <h1>Select Doctor </h1>
                            <select onChange={(e) => setDoctor(e.target.value)} value={isDoctor} className='py-2 pl-2 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300'>
                                <option value="" disabled>Select Doctor</option>
                                {
                                    employees?.filter((employee, _) => employee?.role === 'doctor')?.map((employee, index) => (
                                        <option value={employee?._id} key={index}>{employee?.fullname}</option>
                                    ))
                                }
                            </select>
                        </div>}
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
                        <Input icon={FaCalendar} onChange={handleInputChange} value={formValues.date} name="date" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Rest From</h1>
                        <Input icon={FaCalendar} onChange={handleInputChange} value={formValues.restFrom} name="restFrom" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Rest Till</h1>
                        <Input icon={FaCalendar} onChange={handleInputChange} value={formValues.restTill} name="restTill" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Resume Date</h1>
                        <Input icon={FaCalendar} onChange={handleInputChange} value={formValues.resumeDate} name="resumeDate" type='Date' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration : </h1>
                        <div className='flex items-center gap-4'>
                            <Input icon={FaCalendarAlt} onChange={handleInputChange} value={formValues.duration} name="duration" type='text' placeholder='Enter duration' />
                            <select onChange={(e) => setDurationUnit(e.target.value)} className='bg-white pr-3 py-2 h-10 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500'>
                                <option value="Days">Days</option>
                                <option value="Weeks">Weeks</option>
                                <option value="Months">Months</option>
                                <option value="Years">Year</option>
                            </select>
                        </div>
                    </div>
                    <button className='py-2 px-6 mt-5 rounded-lg bg-green-500 text-white text-base font-semibold block mx-auto cursor-pointer'>Submit</button>
                </form>
            </div>
            {detailsAddedModal && <DetailsAddedModal onClose={() => setDetailsAddedModal(false)} />}
        </div>
    )
}

export default AddCertificate