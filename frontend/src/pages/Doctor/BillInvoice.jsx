import { useEffect, useState } from 'react'
import { CiCalendar, CiMedicalClipboard, CiMoneyBill } from "react-icons/ci";
import { AiFillMedicineBox } from 'react-icons/ai';
import Input from '../../components/Input';
import Select from "react-select";
import { recStore } from '../../store/RecStore';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import axios from 'axios';
import { generateBillInvoicePdf } from '../../store/generateCertificatePdf';
import { updateDate } from '../../store/todayDate';
import SearchSelect from '../../components/SearchSelect';

const BillInvoice = () => {
    const { getAllPatients, allPatients } = recStore();
    const { getPrescriptions, prescriptionsArray } = docStore();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDiagnosis, setSelecetedDiagnosis] = useState(null);
    const [billStatus, setBillStatus] = useState('first');
    const [formValues, setFormValues] = useState({
        patient: '',
        selectedDiagnosis: '',
        medicineName: '',
        startDate: '',
        endDate: '',
        consultingFee: '',
        medicineFee: ''
    });
    const todayDate = updateDate();

    useEffect(() => {
        getAllPatients();
        getPrescriptions();
    }, [getAllPatients]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const diagnosisArray = prescriptionsArray.flatMap(prescription =>
        prescription?.diagnosis?.map(diagnosisItem => ({
            label: `${prescription?.patient?.fullname} / ${diagnosisItem} / ${prescription?.prescription_date}`,
            value: prescription?._id
        }))
    );

    const nextSection = () => {
        if (
            selectedPatient &&
            selectedDiagnosis?.value
        ) {
            setBillStatus('second');
        } else {
            alert("Fill the details to go next.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formValues.patient = selectedPatient;
        formValues.selectedDiagnosis = selectedDiagnosis.label;
        await axios.post(`${DOC_API_URL}/addBillInvoice`, formValues);
        const patient = allPatients.filter((patient) => patient?._id === formValues.patient);

        generateBillInvoicePdf(patient[0], todayDate, formValues);
        setFormValues({
            patient: '',
            selectedDiagnosis: '',
            medicineName: '',
            startDate: '',
            endDate: '',
            consultingFee: '',
            medicineFee: ''
        })
        setBillStatus('first');
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
            <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Bill Invoice</h1>
                <p className='text-red-500 mt-10 font-semibold '>Add Diagnoses and Medicines for Patient's For whom Invoice is to be generated.</p>
                <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8  rounded-xl text-zinc-600   text-sm flex flex-col gap-5' >
                    {billStatus === 'first' && <div><div className='flex flex-col gap-2'>
                        <h1>Patient Case Paper Number : </h1>
                        <div className='relative w-full'>
                            <SearchSelect options={allPatients} setSelectedPatient={setSelectedPatient} />
                        </div>
                    </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Diagnose : </h1>
                            <div className='relative w-full '>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <CiMedicalClipboard className="size-4 text-blue-500" />
                                </div>
                                <Select options={diagnosisArray} placeholder="Search" value={selectedDiagnosis} onChange={setSelecetedDiagnosis} className="font-normal rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 transition duration-200" required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Medicine Name : </h1>
                            <Input icon={AiFillMedicineBox} onChange={handleInputChange} value={formValues.medicineName} name="medicineName" type='text' placeholder='Please Mention Name of the Medicine if any' />
                        </div>
                        <div className='flex flex-col mt-10 items-center'>
                            <p className='text-green-500 font-semibold '>Click on Next, after Completing the Submission of above details</p>
                            <button type='button' onClick={() => nextSection()} className='py-2 px-4 mt-5 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto cursor-pointer'>Next</button>
                        </div>
                    </div>}
                    {billStatus === 'second' && <div><div className='flex flex-col gap-2'>
                        <h1>From (Medicine Start Date)</h1>
                        <Input icon={CiCalendar} onChange={handleInputChange} value={formValues.startDate} name="startDate" type='Date' required />
                    </div>
                        <div className='flex flex-col gap-2'>
                            <h1>To (Medicine End Date)</h1>
                            <Input icon={CiCalendar} onChange={handleInputChange} value={formValues.endDate} name="endDate" type='Date' required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Consulting Fees : </h1>
                            <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} value={formValues.consultingFee} name="consultingFee" required placeholder='Rs' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Medicine Fees : </h1>
                            <Input icon={CiMoneyBill} onChange={handleInputChange} value={formValues.medicineFee} name="medicineFee" type='text' required placeholder='Rs' />
                        </div>
                        <button type='submit' className='py-2 px-6 mt-10 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto cursor-pointer'>Generate Bill</button>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default BillInvoice