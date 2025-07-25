import { useEffect, useState } from 'react'
import { CiMoneyBill } from 'react-icons/ci'
import Input from '../../components/Input'
import { DOC_API_URL, docStore } from '../../store/DocStore'
import axios from 'axios'
import { FaBox } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'

const Pricing = () => {
    const { payment, getPayment } = docStore();
    const [submit, setSubmit] = useState(false);
    const [formValues, setFormValues] = useState({
        newCase: '',
        sevenDays: '',
        fifteenDays: '',
        twentyOneDays: '',
        thirtyDays: '',
        fortyFiveDays: '',
        twoMonths: '',
        threeMonths: '',
        Courier: ''
    });

    useEffect(() => {
        getPayment();
    }, [getPayment, submit]);

    useEffect(() => {
        setFormValues({
            newCase: payment[0]?.newCase || '',
            sevenDays: payment[0]?.sevenDays || '',
            fifteenDays: payment[0]?.fifteenDays || '',
            twentyOneDays: payment[0]?.twentyOneDays || '',
            thirtyDays: payment[0]?.thirtyDays || '',
            fortyFiveDays: payment[0]?.fortyFiveDays || '',
            twoMonths: payment[0]?.twoMonths || '',
            threeMonths: payment[0]?.threeMonths || '',
            Courier: payment[0]?.Courier || ''
        })
    }, [payment])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.patch(`${DOC_API_URL}/updatePayment/${payment[0]?._id}`, formValues);
         window.scrollTo(0, 0);
        toast('Updated');
        setSubmit(prev => !prev);
    }

    return (
        <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full p-8'>
            <ToastContainer/>
            <div className='bg-[#e9ecef] w-auto p-5 rounded-lg'>
                <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Doctor's Fees</h1>
                <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8  rounded-xl text-zinc-800   text-sm flex flex-col gap-5' >
                    <div className='flex flex-col gap-2'>
                        <h1>New Case* : </h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="newCase" value={formValues.newCase} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Seven Days* : </h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="sevenDays" value={formValues.sevenDays} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Fifteen Days* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="fifteenDays" value={formValues.fifteenDays} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>TwentyOne Days* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="twentyOneDays" value={formValues.twentyOneDays} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Thirty Days* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="thirtyDays" value={formValues.thirtyDays} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Fortyfive Days* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="fortyFiveDays" value={formValues.fortyFiveDays} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Two Months* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="twoMonths" value={formValues.twoMonths} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Three Months* :</h1>
                        <Input icon={CiMoneyBill} type='text' onChange={handleInputChange} name="threeMonths" value={formValues.threeMonths} placeholder='Rs' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Online :</h1>
                        <Input icon={FaBox} type='text' onChange={handleInputChange} name="Courier" value={formValues.Courier} placeholder='Rs' />
                    </div>
                    <button className='py-2 px-4 mt-5 rounded-lg text-base bg-blue-500 text-white font-semibold block mx-auto cursor-pointer'>Update Prices</button>
                </form>
            </div>
        </div>
    )
}

export default Pricing